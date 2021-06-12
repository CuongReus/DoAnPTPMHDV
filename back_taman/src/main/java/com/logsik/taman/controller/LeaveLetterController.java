package com.logsik.taman.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.LeaveLetter;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.LeaveLetterDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.SumEmployeeAttendanceDto;
import com.logsik.taman.enums.LeaveLetterStatus;
import com.logsik.taman.enums.TypeOfLeave;
import com.logsik.taman.mail.MailClient;
import com.logsik.taman.repository.EmployeeAttendanceRepository;
import com.logsik.taman.repository.LeaveLetterRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.EmployeeAbsentAttendanceService;
import com.logsik.taman.service.impl.TimeService;

@RestController
@RequestMapping("/api")
@Transactional
public class LeaveLetterController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(LeaveLetterController.class);
	private static final String DUPLICATE_CODE = "Không Thể Lưu Trữ Dữ Liệu ";
	@Autowired
	private LeaveLetterRepository leaveLetterRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmployeeAbsentAttendanceService employeeAbsentAttendanceService;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private MailClient mailClient;
	
	@Autowired
	private TimeService timeService;
	
	@Autowired
	private EmployeeAttendanceRepository employeeAttendanceRepository;

	@RequestMapping("leaveLetter/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(leaveLetterRepository.findById(id));
	}

	@RequestMapping(value = "/leaveLetter/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody LeaveLetterDto leaveLetterDto) {
		try {
			LeaveLetter newLeaveLetter = dtoConverter.convertToLeaveLetter(leaveLetterDto);
			SimpleDateFormat DateFor = new SimpleDateFormat("dd-MM-yyyy");
			
			RestResult resultCheckDayAlreadyExit = checkDayAlreadyExit(leaveLetterDto); 
			
			if(resultCheckDayAlreadyExit == null) {
			
				List<LeaveLetter> ListLeaveLetter = leaveLetterRepository.findByUserIdAndStartLeaveDateBetween(
						leaveLetterDto.getUserId(),
						timeService.getFirstDayOfMonth(leaveLetterDto.getStartLeaveDate()), 
						timeService.getLastDayOfMonth(leaveLetterDto.getStartLeaveDate()) );
				
				for(LeaveLetter LeaveLetter : ListLeaveLetter) {
//					if(leaveLetterDto.getStartLeaveDate().after(LeaveLetter.getStartLeaveDate()) && leaveLetterDto.getStartLeaveDate().before(LeaveLetter.getEndLeaveDate())) {
						if(leaveLetterDto.getStartLeaveDate().compareTo(LeaveLetter.getStartLeaveDate()) >= 0 && leaveLetterDto.getStartLeaveDate().compareTo(LeaveLetter.getEndLeaveDate()) <= 0 ) {
						return new RestResult(true, "Lịch Nghỉ cho ngày : " + DateFor.format(leaveLetterDto.getStartLeaveDate()) + " đã có trên hệ thống. vui lòng chờ 'Duyệt' hoặc chọn ngày khác!");
					}
				}
					 
				List<LeaveLetter> leaveLetterList = leaveLetterRepository.getTotaLeaveLetterThisYear(leaveLetterDto.getUserId(), new Date());
				if (!leaveLetterList.isEmpty()) {
					LeaveLetter leaveLetterBefor = leaveLetterList.get(0);
					newLeaveLetter.setLastTotalAbsentDay(leaveLetterBefor.getLastTotalAbsentDay());
					newLeaveLetter.setLastTotalBonusLeaveDay(leaveLetterBefor.getLastTotalBonusLeaveDay());
					newLeaveLetter.setLastTotalAnnualLeave(leaveLetterBefor.getLastTotalAnnualLeave());
					newLeaveLetter.setLastTotalAnnualLeaveRemaining(leaveLetterBefor.getLastTotalAnnualLeaveRemaining());
				} else {
					newLeaveLetter.setLastTotalAbsentDay(0f);
					newLeaveLetter.setLastTotalBonusLeaveDay(0f);
					newLeaveLetter.setLastTotalAnnualLeave(0f);
					newLeaveLetter.setLastTotalAnnualLeaveRemaining(12f);
				}
				
				
				newLeaveLetter.setCreatedDate( new Date());
				newLeaveLetter = leaveLetterRepository.save(newLeaveLetter);
				
	//			if (newLeaveLetter.getStatus().equals(LeaveLetterStatus.DA_DUYET)) {
					employeeAbsentAttendanceService.addEmployeeAttendanceFromLeaveLetter(newLeaveLetter);
	//			}
				Optional<User> user = userRepository.findById(newLeaveLetter.getUserId());
				Optional<User> approvedBy = userRepository.findById(newLeaveLetter.getApprovedById());
				mailClient.sendValidationLeaveEmail(newLeaveLetter, user.get(), approvedBy.get());
				return new RestResult(newLeaveLetter);
				
			}else {
				return resultCheckDayAlreadyExit;
			}
		} catch (Exception e) {
			LOGGER.error("Error when adding leaveLetter.", e);
			return new RestResult(true, DUPLICATE_CODE);
		}
	}

	@RequestMapping(value = "/leaveLetter/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody LeaveLetterDto leaveLetterDto) {
		try {
			LeaveLetter updatedLeaveLetter = dtoConverter.convertToLeaveLetter(leaveLetterDto);
			if (updatedLeaveLetter.getStatus().equals(LeaveLetterStatus.DA_DUYET)) {
				employeeAbsentAttendanceService.addEmployeeAttendanceFromLeaveLetter(updatedLeaveLetter);
			}
			LeaveLetter leaveLetterBefor = leaveLetterRepository.getTotaLeaveLetterThisYear(leaveLetterDto.getUserId(), new Date()).get(0);
			
			
			if(updatedLeaveLetter.getLeaveType().equals(TypeOfLeave.ANNUAL_HOLIDAY)) {
				updatedLeaveLetter.setLastTotalAbsentDay(leaveLetterBefor.getLastTotalAbsentDay());
				updatedLeaveLetter.setLastTotalBonusLeaveDay(leaveLetterBefor.getLastTotalBonusLeaveDay());
				updatedLeaveLetter.setLastTotalAnnualLeave(leaveLetterBefor.getLastTotalAnnualLeave() - 1f );
				updatedLeaveLetter.setLastTotalAnnualLeaveRemaining(leaveLetterBefor.getLastTotalAnnualLeaveRemaining() -1f);
				
			}
			if(updatedLeaveLetter.getLeaveType().equals(TypeOfLeave.ANNUAL_HOLIDAY_2)) {
				updatedLeaveLetter.setLastTotalAbsentDay(leaveLetterBefor.getLastTotalAbsentDay());
				updatedLeaveLetter.setLastTotalBonusLeaveDay(leaveLetterBefor.getLastTotalBonusLeaveDay());
				updatedLeaveLetter.setLastTotalAnnualLeave(leaveLetterBefor.getLastTotalAnnualLeave() - 0.5f );
				updatedLeaveLetter.setLastTotalAnnualLeaveRemaining(leaveLetterBefor.getLastTotalAnnualLeaveRemaining() - 0.5f);
			}
			updatedLeaveLetter.setCreatedDate( new Date());
			updatedLeaveLetter = leaveLetterRepository.save(updatedLeaveLetter);
			return new RestResult(updatedLeaveLetter);
		} catch (Exception e) {
			LOGGER.error("Error when updating leaveLetter.", e);
			return new RestResult(true, DUPLICATE_CODE);
		}
	}

	// TODO: change to DTO to post token
	@RequestMapping(value = "/leaveLetter/updateStatus", method = RequestMethod.POST)
	public RestResult updateStatus(@RequestBody LeaveLetterDto leaveLetterDto, @RequestParam("token") Long id) {
		try {
			LeaveLetter leaveLetterConvert = dtoConverter.convertToLeaveLetter(leaveLetterDto);
			LeaveLetter leaveLetter = leaveLetterRepository.findById(id).get();
			leaveLetter.setNote(leaveLetterConvert.getNote());
			leaveLetter.setStatus(leaveLetterConvert.getStatus());

			LeaveLetter updatedLeaveLetter = leaveLetterRepository.save(leaveLetter);
			return new RestResult(updatedLeaveLetter);
		} catch (Exception e) {
			LOGGER.error("Error when updating leaveLetter.", e);
			return new RestResult(true, DUPLICATE_CODE);
		}
	}

	@DeleteMapping("/leaveLetter/{id}")
	public RestResult deleteleaveLetter(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete leaveLetter with ID = " + id + "...");

		try {
			LeaveLetter leaveLetter = leaveLetterRepository.findById(id).get();
			if(leaveLetter.getLeaveType() == TypeOfLeave.PN  ||  leaveLetter.getLeaveType() == TypeOfLeave.PN2) {
				employeeAbsentAttendanceService.deleteListEmployeeLeaveAttendance(leaveLetter);
				leaveLetterRepository.deleteById(id);
			}else {
				employeeAbsentAttendanceService.deleteEmployeeLeaveAttendance(leaveLetter);
				leaveLetterRepository.deleteById(id);
			}
			
		
		} catch (Exception e) {
			LOGGER.error("Error when delete leaveLetter.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/leaveLetter/list")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result = null;
		if (search == null) {
			result = leaveLetterRepository.findAll(pageable);
		}
		return new RestResult(result);
	}

	@RequestMapping(value = "/leaveLetter/listLeaveLetterByUserIdAndDateToWorkStart")
	public RestResult listFindByUserId(@RequestParam("userId") Long userId,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd
			, Pageable pageable) {
		return new RestResult(leaveLetterRepository.findByUserIdAndLeaveTypeNotAndStartWorkDateBetween(userId,TypeOfLeave.CHECK_ANNUAL_LEAVE,dateToWorkStart,dateToWorkEnd, pageable));
	}

	@RequestMapping(value = "/leaveLetter/listAll")
	public RestResult listAll() {
		return new RestResult(leaveLetterRepository.findAll());

	}

	@RequestMapping(value = "/leaveLetter/listLeaveDay")
	public RestResult listLeaveDay(@RequestParam("year") String year, Pageable pageable) {
		Object result =null;
			result = leaveLetterRepository.listLeaveLetter(year);
		return new RestResult(result);
	}
	
	
	public RestResult checkDayAlreadyExit(LeaveLetterDto leaveLetterDto) {
		int month = timeService.getMonth(leaveLetterDto.getStartLeaveDate());
		 
		 List<LeaveLetter> listLeaveMonth =  leaveLetterRepository.findByUserIdAndStartLeaveDateBetween(
				 leaveLetterDto.getUserId(),
				 timeService.getFirstDayOfMonth(leaveLetterDto.getStartLeaveDate()),
				timeService.getLastDayOfMonth(leaveLetterDto.getStartLeaveDate()));
		 
		 List<LeaveLetter> listLeaveYear =  leaveLetterRepository.findByUserIdAndStartLeaveDateBetween(
				 leaveLetterDto.getUserId(),
				 timeService.getFirstDayOfYear(timeService.getYear(leaveLetterDto.getStartLeaveDate())),
				 timeService.getLastDayOfYear(timeService.getYear(leaveLetterDto.getStartLeaveDate())));
		 
		 SumEmployeeAttendanceDto sumAtt =  employeeAttendanceRepository.sumEmployeeAttendanceLeaveDayCalc(
				 leaveLetterDto.getUserId(),
				 timeService.getFirstDayOfYear(timeService.getYear(leaveLetterDto.getStartLeaveDate())),
				 timeService.getLastDayOfYear(timeService.getYear(leaveLetterDto.getStartLeaveDate())));
		 
		 double tongNgayDaNghi = 0;
		 
		 double tongPhepThuongTC = (sumAtt.getBonusNormalOvertimeAttendance() != null ? sumAtt.getBonusNormalOvertimeAttendance() : 0)  +
				 (sumAtt.getBonusSunOvertimeAttendance() != null ? sumAtt.getBonusSunOvertimeAttendance() : 0) +
				 (sumAtt.getBonusSatOvertimeAttendance() != null ? sumAtt.getBonusSatOvertimeAttendance() : 0) +
				 (sumAtt.getBonusHolidayOvertimeAttendance() != null ? sumAtt.getBonusHolidayOvertimeAttendance() : 0);
		 
		 for(LeaveLetter leaveLetter :listLeaveMonth ) {
			 if(leaveLetter.getTotalLeaveDays() != null) {
				 tongNgayDaNghi += leaveLetter.getTotalLeaveDays();
			 }
//			 double tongNgayDuocNghi = month + month * 0.3;
//			 if(tongNgayDaNghi > tongNgayDuocNghi) {
//				 return new RestResult(true, "Vượt quá số ngày được nghỉ : " + tongNgayDuocNghi + " / số ngày đã nghỉ : " + tongNgayDaNghi);
//			 }
		 }
		 
			 double tongPhepNamDaNghi = 0;
			 double tongNghiBuDaNghi = 0;
			 for(LeaveLetter leaveLetter :listLeaveYear ) {
				 
				 
				 if(leaveLetter.getLeaveType().equals(TypeOfLeave.PN) || leaveLetterDto.getLeaveType().equals(TypeOfLeave.ANNUAL_HOLIDAY) ) {
					 tongPhepNamDaNghi += 1;
				 }
				 if(leaveLetter.getLeaveType().equals(TypeOfLeave.PN2) || leaveLetterDto.getLeaveType().equals(TypeOfLeave.ANNUAL_HOLIDAY_2) ) {
					 tongPhepNamDaNghi += 0.5;
				 }
				 if(leaveLetter.getLeaveType().equals(TypeOfLeave.NB) ) {
					 tongNghiBuDaNghi += 1;
				 }
				 if(leaveLetter.getLeaveType().equals(TypeOfLeave.NB2) ) {
					 tongNghiBuDaNghi += 0.5;
				 }
			 }
			 
			 
			 if(leaveLetterDto.getLeaveType().equals(TypeOfLeave.NB) || leaveLetterDto.getLeaveType().equals(TypeOfLeave.NB2)){
				 if(tongNghiBuDaNghi + leaveLetterDto.getTotalLeaveDays() > tongPhepThuongTC) {
					 return new RestResult(true, "Đã hết phép thưởng TC. Số ngày phép thưởng TC :" + tongPhepThuongTC
							 + " . số ngày đã nghỉ (phép thưởng TC): " + tongNghiBuDaNghi);
				 }			 
			 }
			return null;
	}
}
