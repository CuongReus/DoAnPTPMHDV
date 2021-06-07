package com.logsik.taman.controller;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

import com.logsik.taman.domain.LabourAttendance;
import com.logsik.taman.domain.LabourSalary;
import com.logsik.taman.dtos.LabourAttendanceDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.LabourAttendanceRepository;
import com.logsik.taman.repository.LabourSalaryRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.LabourSalaryService;
import com.logsik.taman.service.impl.TimeService;
@RestController
@RequestMapping("/api")
public class LabourAttendanceController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(LabourAttendanceController.class);
	private static final String MESSAGES_SAME_TIME = " Một Ngày Nhân Công Chỉ Có Thể Làm Việc `1 Ca Thường ||  1 Tăng Ca Thường || 1 Tăng Ca Khuya` ";
	private static final String MESSAGES_LATE_SET_ATTENDANCE = "Không được chấm công nhân công này khi đã được duyệt thanh toán! Vui lòng liên hệ Ban Giám Đốc để biết rõ thông tin.";
	private static final String MESSAGES_LATE_UPDATE_ATTENDANCE = "Không được chỉnh sửa ngày công nhân công này khi đã được duyệt thanh toán! Vui lòng liên hệ Ban Giám Đốc để biết rõ thông tin.";

	@Autowired
	private LabourAttendanceRepository labourAttendanceRepository;

	@Autowired
	private LabourSalaryRepository labourSalaryRepository; 
	@Autowired
	private DtoConverter dtoConverter;
	
	@Autowired
	private LabourSalaryService labourSalaryService;
	
	@Autowired
	private TimeService timeService;

	@RequestMapping("labourAttendance/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(labourAttendanceRepository.findById(id));
	}

	@RequestMapping(value = "/labourAttendance/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody LabourAttendanceDto labourAttendanceDto) {
		try {
			  SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");  
			  LabourAttendance newlabourAttendance = dtoConverter.convertToLabourAttendance(labourAttendanceDto);
			  newlabourAttendance.setCreatedUserId(getCurrentUser().getId());
			  newlabourAttendance.setCreatedDate(new Date());
			  newlabourAttendance.setLastedUpdateUserId(getCurrentUser().getId());
			  newlabourAttendance.setLastedUpdateDate(new Date());
			  
//			TODO Check Coincide Date to work
			List<LabourAttendance> currentAttendance = labourAttendanceRepository.findByLabourId(newlabourAttendance.getLabourId());
			for(Integer i = 0; i <currentAttendance.size();i++ ) {
				if(newlabourAttendance.getOvertimeStatus() !=null 
						&& currentAttendance.get(i).getOvertimeStatus() != null 
						&& newlabourAttendance.getOvertimeStatus() ==  currentAttendance.get(i).getOvertimeStatus()  ) {
					if(formatter.format(currentAttendance.get(i).getDateToWork()).equals(formatter.format(newlabourAttendance.getDateToWork()))) {
						LOGGER.error("Error when same time workPlan.");
						return new RestResult(true, "Đã Có Dự Án Trong Ngày " +formatter.format(newlabourAttendance.getDateToWork()) +","+ MESSAGES_SAME_TIME);
					}
				}else if (newlabourAttendance.getOvertimeStatus() ==null && currentAttendance.get(i).getOvertimeStatus() == null) {
					if(formatter.format(currentAttendance.get(i).getDateToWork()).equals(formatter.format(newlabourAttendance.getDateToWork()))) {
						LOGGER.error("Error when same time workPlan.");
						return new RestResult(true, "Đã Có Dự Án Trong Ngày " +formatter.format(newlabourAttendance.getDateToWork()) +","+ MESSAGES_SAME_TIME);
					}
				}
			}
//			SAVE New labourAttendance
			newlabourAttendance = labourAttendanceRepository.save(newlabourAttendance);
			List<LabourSalary> currentLabourSalary = labourSalaryRepository.findByLabourIdAndMonthAndYear(
					newlabourAttendance.getLabourId(),
					timeService.getMonth(newlabourAttendance.getDateToWork()), timeService.getYear(newlabourAttendance.getDateToWork()));
			if (currentLabourSalary.isEmpty()) {
				labourSalaryService.createNewLabourSalaryFromLabourAttendance(newlabourAttendance);
			} else {
				if(currentLabourSalary.get(0).getPaymentStatus() !=null&&"DA_DUYET_THANH_TOAN".equals(currentLabourSalary.get(0).getPaymentStatus().toString())) {
					return new RestResult(true, MESSAGES_LATE_SET_ATTENDANCE);	
				}else {
					labourSalaryService.reloadLabourAttendanceToLabourSalary( newlabourAttendance,currentLabourSalary.get(0));
				}
			}
//		
			 
			return new RestResult(newlabourAttendance);
		} catch (Exception e) {
			LOGGER.error("Error when adding labourAttendance.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/labourAttendance/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody LabourAttendanceDto labourAttendanceDto) {
		try {
			LabourAttendance source = labourAttendanceRepository.findById(labourAttendanceDto.getId()).get();
			LabourAttendance updatedLabourAttendance = labourAttendanceRepository.save(dtoConverter.convertToLabourAttendance(labourAttendanceDto));

			List<LabourSalary> currentLabourSalary = labourSalaryRepository.findByLabourIdAndMonthAndYear(
					labourAttendanceDto.getLabourId(),
					timeService.getMonth(source.getDateToWork()), timeService.getYear(source.getDateToWork()));

			if (currentLabourSalary.isEmpty()) {
				labourSalaryService.createNewLabourSalaryFromLabourAttendance(updatedLabourAttendance);
			} else {
				if(currentLabourSalary.get(0).getPaymentStatus() !=null &&"DA_DUYET_THANH_TOAN".equals(currentLabourSalary.get(0).getPaymentStatus().toString())) {
					return new RestResult(true, MESSAGES_LATE_UPDATE_ATTENDANCE);	
				}else {
					labourSalaryService.reloadLabourAttendanceToLabourSalary(updatedLabourAttendance,currentLabourSalary.get(0));	
				}
				
			}
		
//			 updatedLabourAttendance = labourAttendanceRepository.save(updatedLabourAttendance);
			
			return new RestResult(updatedLabourAttendance);
		} catch (Exception e) {
			LOGGER.error("Error when updating labourAttendance.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/labourAttendance/{id}")
	public RestResult deletelabourAttendance(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete labourAttendance with ID = " + id + "...");

		try {
			Optional<LabourAttendance> source = labourAttendanceRepository.findById(id);
		
		
				List<LabourSalary> currentLabourSalary = labourSalaryRepository.findByLabourIdAndMonthAndYear(
						source.get().getLabour().getId(),
						timeService.getMonth(source.get().getDateToWork()), timeService.getYear(source.get().getDateToWork()));
				
				if (!currentLabourSalary.isEmpty()) {
					labourSalaryService.removeLabourAttendanceOnLabourSalary(currentLabourSalary.get(0), source.get());
				}
		
			labourAttendanceRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete labourAttendance.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/labourAttendance/list")
	public RestResult list(@RequestParam("search") Long id, Pageable pageable) {
		Object result;
			result = labourAttendanceRepository.findAll(pageable);
		return new RestResult(result);
	}
	@RequestMapping(value = "/labourAttendance/listAll")
	public RestResult listAll() {
		return new RestResult (labourAttendanceRepository.findAll());
	}
	@RequestMapping(value = "/labourAttendance/findByLabourId")
	public RestResult listFindByLabourId(@RequestParam("labourId") Long labourId,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd) {
		Object result = null;
		
		result =labourAttendanceRepository.findDistinctByLabourIdAndDateToWorkBetween(labourId, dateToWorkStart, dateToWorkEnd);
		
		
		return new RestResult (result);
	}
	
	@RequestMapping(value = "/labourAttendance/findByDateToWork")
	public RestResult listFindByDateToWork(
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd) {
		Object result = null;
	
		result =labourAttendanceRepository.findDistinctByDateToWorkBetween(dateToWorkStart, dateToWorkEnd);
		
		
		return new RestResult (result);
	}
    
	@RequestMapping(value = "/labourAttendance/findByLabourIdAndCreatedUserId")
	public RestResult listFindByLabourIdAndCreatedUserId(@RequestParam("labourId") Long labourId,@RequestParam("createdUserId") Long createdUserId,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd) {
		List<LabourAttendance> listAttendanceFollowByLabourIdAndCreatedUser =  (labourAttendanceRepository.findDistinctByLabourIdAndCreatedUserIdAndDateToWorkBetween(labourId,createdUserId, dateToWorkStart, dateToWorkEnd));
		listAttendanceFollowByLabourIdAndCreatedUser.sort((a1,a2)->a2.getCreatedDate().compareTo(a1.getCreatedDate()));
		return new RestResult (listAttendanceFollowByLabourIdAndCreatedUser);
	}
	
	@RequestMapping(value = "/labourAttendance/findByCreatedUserId")
	public RestResult listFindByCreatedUserId(@RequestParam("createdUserId") Long createdUserId,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd) {
		List<LabourAttendance> listAttendanceFollowByCreatedUser =  (labourAttendanceRepository.findDistinctByCreatedUserIdAndDateToWorkBetween(createdUserId, dateToWorkStart, dateToWorkEnd));
		listAttendanceFollowByCreatedUser.sort((a1,a2)->a2.getCreatedDate().compareTo(a1.getCreatedDate()));
		return new RestResult (listAttendanceFollowByCreatedUser);
	}
	@RequestMapping(value = "/labourAttendance/findAttendanceToday")
	public RestResult listFindAttendanceToday(
			@DateTimeFormat(pattern = "yyyy-MM-dd") Date dateToWork) {
		Object result;
		result = labourAttendanceRepository.findDistinctByDateToWork(dateToWork);
		return new RestResult (result);
	}
//	@RequestMapping(value = "/labourAttendance/sumNormalAttendance ")
//	public RestResult listFindAttendanceToday(@RequestParam("labourId") Long labourId,
//			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
//			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd) {
//		Object result;
//		result = labourAttendanceRepository.sumNormalAttendance(labourId,dateToWorkStart,dateToWorkEnd);
//		return new RestResult (result);
//	}
	
	
	
//	That method for LabourCost Modal
	@RequestMapping(value = "/labourAttendance/findListLabourAttendanceByProjectDetailId")
	public RestResult findListLabourAttendanceByProjectDetailId(@RequestParam("projectDetailId")Long projectDetailId,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd) {
//		Integer month =  timeService.getMonth(dateToWorkStart);
//		Integer year = timeService.getYear(dateToWorkEnd);
		Object result =null;
		
		result = labourAttendanceRepository.listSumLabourAttendanceByProjectDetailId(projectDetailId, dateToWorkStart, dateToWorkEnd);
		
		return new RestResult(result);

	}
	
//	That method for LabourPaymentCost Modal
//	@RequestMapping(value = "/labourAttendance/findByLabourIdAndProjectDetailIdAndDateBetween")
//	public RestResult findByLabourIdAndProjectDetailIdAndDateBetween(@RequestParam("labourId") Long labourId,@RequestParam("projectDetailId")Long projectDetailId,
//			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkStart,
//			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date dateToWorkEnd) {
////		Integer month =  timeService.getMonth(dateToWorkStart);
////		Integer year = timeService.getYear(dateToWorkEnd);
//		Object result =null;
//		
//		result = labourAttendanceRepository.sumAttendance(labourId, projectDetailId, dateToWorkStart, dateToWorkEnd);
//		
//		return new RestResult(result);
//
//	}
}
