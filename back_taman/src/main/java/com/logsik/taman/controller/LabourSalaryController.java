package com.logsik.taman.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.LabourSalary;
import com.logsik.taman.dtos.LabourSalaryDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.LabourAttendanceRepository;
import com.logsik.taman.repository.LabourSalaryRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.LabourSalaryService;
import com.logsik.taman.service.impl.TimeService;

@RestController
@RequestMapping("/api")
public class LabourSalaryController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(LabourSalaryController.class);

	@Autowired
	private LabourSalaryRepository labourSalaryRepository;

	@Autowired
	private LabourSalaryService labourSalaryService;
	
	@Autowired
	private LabourAttendanceRepository labourAttendanceRepository;
	
	@Autowired
	private TimeService timeService;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("labourSalary/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(labourSalaryRepository.findById(id));
	}

	@RequestMapping(value = "/labourSalary/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody LabourSalaryDto labourSalaryDto) {
		try {
			LabourSalary newlabourSalary = labourSalaryRepository.save(dtoConverter.convertToLabourSalary(labourSalaryDto));
			return new RestResult(newlabourSalary);
		} catch (Exception e) {
			LOGGER.error("Error when adding labourSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/labourSalary/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody LabourSalaryDto labourSalaryDto) {
		try {
			LabourSalary updatedLabourSalary = dtoConverter.convertToLabourSalary(labourSalaryDto);
			labourSalaryService.reCalculateTotalPrices(updatedLabourSalary);
			updatedLabourSalary = labourSalaryRepository
					.save(updatedLabourSalary);
			return new RestResult(updatedLabourSalary);
		} catch (Exception e) {
			LOGGER.error("Error when updating labourSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	
	@RequestMapping(value = "/labourSalary/updatePaymentStatus", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult updateAttendanceCoefficient(@RequestBody LabourSalary labourSalary) {
		try {
			List<LabourSalary> listFindbyMonthAndYear = labourSalaryRepository.findByMonthAndYear(labourSalary.getMonth(), labourSalary.getYear());
			if(!listFindbyMonthAndYear.isEmpty()) {
			for(LabourSalary lb :  listFindbyMonthAndYear) {
				lb.setPaymentStatus(labourSalary.getPaymentStatus());
				lb.setPaymentDate(labourSalary.getPaymentDate());
				labourSalaryRepository.save(lb);
				}
			}
			
//			Refresh labour cost here after "Duyet thanh toán" theo thang
			List<Long> projectDetailIds = labourAttendanceRepository.getAllProjectDetailIdOfLabourAttendanceInMonth(
					timeService.getFirstDayOfMonth(labourSalary.getMonth(), labourSalary.getYear()),
					timeService.getLastDayOfMonth(labourSalary.getMonth(), labourSalary.getYear()));
			
			return new RestResult("ok");
		} catch (Exception e) {
			LOGGER.error("Error when updating labourSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/labourSalary/{id}")
	public RestResult deletelabourSalary(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete labourSalary with ID = " + id + "...");
		try {
			labourSalaryRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete labourSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/labourSalary/list")
	public RestResult list(@RequestParam("search") Long id, Pageable pageable) {
		Object result;
		result = labourSalaryRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/labourSalary/listAll")
	public RestResult listAll() {
		return new RestResult(labourSalaryRepository.findAll());
	}

	@RequestMapping(value = "labourSalary/listFindByLabourIdAndMonthAndYear")
	public RestResult listFindByLabourAndMonthYear(@RequestParam("labourId") Long labourId,
			@RequestParam("month") Integer month, @RequestParam("year") Integer year) {
		return new RestResult(labourSalaryRepository.findByLabourIdAndMonthAndYear(labourId, month, year));
	}

	@RequestMapping(value = "labourSalary/listAllLabourByMonthAndYear")
	public RestResult listFindAllLabourByMonthAndYear(@RequestParam("month") Integer month,
			@RequestParam("year") Integer year) {
		return new RestResult(labourSalaryRepository.findByMonthAndYear(month, year));
	}
}
