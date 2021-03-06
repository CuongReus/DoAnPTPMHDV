package com.logsik.taman.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.EmployeeAttendance;
import com.logsik.taman.domain.LeaveLetter;
import com.logsik.taman.dtos.EmployeeAttendanceDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.enums.AttendanceStatus;
import com.logsik.taman.enums.AttendanceType;
import com.logsik.taman.enums.TypeOfLeave;
import com.logsik.taman.repository.EmployeeAttendanceRepository;
import com.logsik.taman.repository.LeaveLetterRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.EmployeeAbsentAttendanceService;
import com.logsik.taman.service.impl.TimeService;

@RestController
@RequestMapping("/api")
@Transactional
public class EmployeeAttendanceController extends AbstractController{
	private static final Logger LOGGER = LoggerFactory.getLogger(EmployeeAttendanceController.class);

	@Autowired
	private EmployeeAttendanceRepository employeeAttendanceRepository;
	
	@Autowired
	private LeaveLetterRepository leaveLetterRepository;

	@Autowired
	private DtoConverter dtoConverter;
	
	@Autowired
	private TimeService timeService;
	
	@Autowired
	private EmployeeAbsentAttendanceService employeeAbsentAttendanceService;
	
	
	
	@RequestMapping("employeeAttendance/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(employeeAttendanceRepository.findById(id));
	}

	@RequestMapping(value = "/employeeAttendance/add", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult add(@RequestBody EmployeeAttendanceDto employeeAttendanceDto) {
		try {
			EmployeeAttendance newEmployeeAttendance=  dtoConverter.convertToEmployeeAttendance(employeeAttendanceDto);
//			Check vang mat de tinh ngay phep
			if(newEmployeeAttendance.getStatus() == AttendanceStatus.VANG_MAT) {
				 int month = timeService.getMonth(newEmployeeAttendance.getDateToWork());
				 
				 List<LeaveLetter> listLeaveMonth =  leaveLetterRepository.findByUserIdAndStartLeaveDateBetween(
						 employeeAttendanceDto.getUserId(),
						 timeService.getFirstDayOfMonth(newEmployeeAttendance.getDateToWork()),
						timeService.getLastDayOfMonth(newEmployeeAttendance.getDateToWork()));
				 
				 List<LeaveLetter> listLeaveYear =  leaveLetterRepository.findByUserIdAndStartLeaveDateBetween(
						 employeeAttendanceDto.getUserId(),
						 timeService.getFirstDayOfYear(timeService.getYear(newEmployeeAttendance.getDateToWork())),
						 timeService.getLastDayOfYear(timeService.getYear(newEmployeeAttendance.getDateToWork())));
				
				 
				 double tongNgayDaNghi = 0;
				 
				 
				 for(LeaveLetter leaveLetter :listLeaveMonth ) {
					 if(leaveLetter.getTotalLeaveDays() != null) {
						 tongNgayDaNghi += leaveLetter.getTotalLeaveDays();
					 }
				 }
				 
				 double tongPhepNamDaNghi = 0;
				 double tongNghiBuDaNghi = 0;
				 for(LeaveLetter leaveLetter :listLeaveYear ) {
					 
					 
					 if(leaveLetter.getLeaveType().equals(TypeOfLeave.PN) ) {
						 tongPhepNamDaNghi += 1;
					 }
					 if(leaveLetter.getLeaveType().equals(TypeOfLeave.PN2) ) {
						 tongPhepNamDaNghi += 0.5;
					 }
					 if(leaveLetter.getLeaveType().equals(TypeOfLeave.NB) ) {
						 tongNghiBuDaNghi += 1;
					 }
					 if(leaveLetter.getLeaveType().equals(TypeOfLeave.NB2) ) {
						 tongNghiBuDaNghi += 0.5;
					 }
				 }
				 double soNgayXinNghi = 0;
				 if(employeeAttendanceDto.getAttendanceType().equals(AttendanceType.PN)) {
					 soNgayXinNghi = 1;
				 }
				 if(employeeAttendanceDto.getAttendanceType().equals(AttendanceType.PN2)) {
					 soNgayXinNghi = 0.5;
				 }
				 if(employeeAttendanceDto.getAttendanceType().equals(AttendanceType.NB)) {
					 soNgayXinNghi = 1;
				 }
				 if(employeeAttendanceDto.getAttendanceType().equals(AttendanceType.NB2)) {
					 soNgayXinNghi = 0.5;
				 }
				 
				 newEmployeeAttendance= employeeAttendanceRepository.save(newEmployeeAttendance);
				 
				 employeeAbsentAttendanceService.addLeaveLetterFromEmployeeAttendanceFrom(newEmployeeAttendance);
			}else {
				 newEmployeeAttendance= employeeAttendanceRepository.save(newEmployeeAttendance);
			}

			return new RestResult(newEmployeeAttendance);
		} catch (Exception e) {
			LOGGER.error("L????i khi ch????m c??ng.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/employeeAttendance/update", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult update(@RequestBody EmployeeAttendanceDto employeeAttendanceDto) {
		try {
			EmployeeAttendance updatedEmployeeAttendance = dtoConverter.convertToEmployeeAttendance(employeeAttendanceDto);		
			updatedEmployeeAttendance= employeeAttendanceRepository.save(updatedEmployeeAttendance);
			// LeaveYearCalculate after EmployeeAttendance has been save
			if(updatedEmployeeAttendance.getStatus() == AttendanceStatus.VANG_MAT) {
				employeeAbsentAttendanceService.addLeaveLetterFromEmployeeAttendanceFrom(updatedEmployeeAttendance);
			}
			
			return new RestResult(updatedEmployeeAttendance);
		} catch (Exception e) {
			LOGGER.error("L????i khi c????p nh????t ch????m c??ng.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/employeeAttendance/{id}")
	public RestResult deleteemployeeAttendance(@PathVariable("id") Long id) {
		System.out.println("Xoa?? nga??y c??ng v????i ID = " + id + "...");

		try {
			
			EmployeeAttendance employeeAttendance = employeeAttendanceRepository.findById(id).get();
			
			if(employeeAttendance.getStatus() == AttendanceStatus.VANG_MAT) {
				if(employeeAttendance.getLeaveLetterId() != null) {
					List<EmployeeAttendance> list = employeeAttendanceRepository.findByLeaveLetterId(employeeAttendance.getLeaveLetterId());
					int index = 1 ;
					for(EmployeeAttendance ep : list) {
						employeeAttendanceRepository.deleteById(ep.getId());
						
						if(index == list.size()) {
							leaveLetterRepository.deleteById(ep.getLeaveLetterId());
						}
						index ++;
					}	
				}else {
					employeeAttendanceRepository.deleteById(id);
					List<LeaveLetter> listLeaveleter =leaveLetterRepository.findByUserIdAndStartLeaveDate(employeeAttendance.getUserId(), employeeAttendance.getDateToWork());
						for(LeaveLetter leaveLetter : listLeaveleter) {
							leaveLetterRepository.deleteById(leaveLetter.getId());
						}
				}
			}else {
				employeeAttendanceRepository.deleteById(id);
			}
		} catch (Exception e) {
			LOGGER.error("L????i khi xoa?? nga??y c??ng.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/employeeAttendance/listAll")
	public RestResult listAll() {
		return new RestResult(employeeAttendanceRepository.findAll());
	}


	@RequestMapping(value = "/employeeAttendance/findByUserId")
	public RestResult listFindByEmployeeId(@RequestParam("userId") Long userId,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd) {
		Object result = null;
		
		result =employeeAttendanceRepository.findByUserIdAndDateToWorkBetween(userId, dateToWorkStart, dateToWorkEnd);
		
		
		return new RestResult (result);
	}
	
	@RequestMapping(value = "/employeeAttendance/findByDateToWork")
	public RestResult listFindByDateToWork(
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd) {
		Object result = null;
	
		result =employeeAttendanceRepository.findByDateToWorkBetween(dateToWorkStart, dateToWorkEnd);
		return new RestResult (result);
	}
	
	@RequestMapping(value = "/employeeAttendance/listSumAttendanceForUser")
	public RestResult listSumAttendanceForUser(
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd) {
		Object result = null;
	
		result =employeeAttendanceRepository.listSumEmployeeAttendanceLeaveDayCalc(dateToWorkStart, dateToWorkEnd);
		return new RestResult (result);
	}
	
	
	@RequestMapping(value= "/countEmployeeAttentdence")
	public RestResult listSumEmployeeAttendance(@RequestParam("id") long id) {
		
		EmployeeAttendance employeeAttendance = employeeAttendanceRepository.findById(id).get();
		List<EmployeeAttendance> list = new ArrayList<>();
		if(employeeAttendance.getLeaveLetterId() != null) {
			 list = employeeAttendanceRepository.findByLeaveLetterId(employeeAttendance.getLeaveLetterId());
		}
		return new RestResult(list);
	}
}
