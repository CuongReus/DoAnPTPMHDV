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

import com.logsik.taman.domain.Department;
import com.logsik.taman.domain.EmployeeSalary;
import com.logsik.taman.dtos.DepartmentDto;
import com.logsik.taman.dtos.EmployeeSalaryDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.queries.EmployeeSalarySpecification;
import com.logsik.taman.repository.DepartmentRepository;
import com.logsik.taman.repository.EmployeeSalaryRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.EmployeeSalaryService;

@RestController
@RequestMapping("/api")
public class EmployeeSalaryController extends AbstractController{
	private static final Logger LOGGER = LoggerFactory.getLogger(EmployeeSalaryController.class);
	
	@Autowired
	private EmployeeSalaryRepository employeeSalaryRepository;

	@Autowired
	private EmployeeSalaryService employeeSalaryService;
	
	@Autowired
	private DepartmentRepository departmentRepository;
	@Autowired
	private DtoConverter dtoConverter;
	
	
	@RequestMapping("employeeSalary/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(employeeSalaryRepository.findById(id));
	}

	@RequestMapping(value = "/employeeSalary/add", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult add(@RequestBody EmployeeSalaryDto employeeSalaryDto) {
		try {
			EmployeeSalary newEmployeeSalary= dtoConverter.convertToEmployeeSalary(employeeSalaryDto);
			 newEmployeeSalary= employeeSalaryRepository.save(newEmployeeSalary);
			
			return new RestResult(newEmployeeSalary);
		} catch (Exception e) {
			LOGGER.error("Error when adding employeeSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/employeeSalary/update", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult update(@RequestBody EmployeeSalaryDto employeeSalaryDto) {
		try {
			EmployeeSalary updatedEmployeeSalary= employeeSalaryRepository.save(dtoConverter.convertToEmployeeSalary(employeeSalaryDto));
			
			employeeSalaryService.reCalculateTotalPrices(updatedEmployeeSalary);
			return new RestResult(updatedEmployeeSalary);
		} catch (Exception e) {
			LOGGER.error("Error when updating employeeSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	
	@RequestMapping(value="/employeeSalary/loadUserSalaryConfig",method = RequestMethod.POST)
	public RestResult loadSalaryConfig(@RequestBody EmployeeSalaryDto employeeSalaryDto) {
		try {
			employeeSalaryService.loadUserSalaryConfig(employeeSalaryDto);
			return new RestResult("LOAD_USER_SALARY_SUCCESS");
		} catch (Exception e) {
			LOGGER.error("Error when updating employeeSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	
	@RequestMapping(value = "/employeeSalary/updateAttendanceCoefficient", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult updateAttendanceCoefficient(@RequestBody DepartmentDto departmentDto,@RequestParam("month") Integer month,@RequestParam("year") Integer year) {
		try {
			Department updatedDepartment= departmentRepository.save(dtoConverter.convertToDepartment(departmentDto));
			employeeSalaryService.updateAttendanceCoefficient(updatedDepartment,month,year);
			return new RestResult(updatedDepartment);
		} catch (Exception e) {
			LOGGER.error("Error when updating employeeSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	@RequestMapping(value = "/employeeSalary/updatePaymentStatus", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult updateAttendanceCoefficient(@RequestBody EmployeeSalaryDto employeeSalaryDto) {
		try {
			EmployeeSalary employeeSalary = dtoConverter.convertToEmployeeSalary(employeeSalaryDto);
			List<EmployeeSalary> listFindbyMonthAndYear = employeeSalaryRepository.findByMonthAndYear(employeeSalary.getMonth(), employeeSalary.getYear());
			if(!listFindbyMonthAndYear.isEmpty()) {
			for(EmployeeSalary es :  listFindbyMonthAndYear) {
				es.setPaymentStatus(employeeSalary.getPaymentStatus());
				es.setPaymentDate(employeeSalary.getPaymentDate());
				employeeSalaryRepository.save(es);
			}
			}
			
			return new RestResult("ok");
		} catch (Exception e) {
			LOGGER.error("Error when updating employeeSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	
	@RequestMapping(value = "/employeeSalary/addNewAttendanceCoefficient", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult addNewAttendanceCoefficient(@RequestBody DepartmentDto departmentDto) {
		try {
			Department newDepartment= dtoConverter.convertToDepartment(departmentDto);
						newDepartment= departmentRepository.save(newDepartment);
//			employeeSalaryService.updateAttendanceCoefficient(updatedDepartment);
			return new RestResult(newDepartment);
		} catch (Exception e) {
			LOGGER.error("Error when updating employeeSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/employeeSalary/{id}")
	public RestResult deleteemployeeSalary(@PathVariable("id") Long id) {
		System.out.println("Delete employeeSalary with ID = " + id + "...");
		try {
			employeeSalaryRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete employeeSalary.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/employeeSalary/listAll")
	public RestResult listAll() {
		return new RestResult(employeeSalaryRepository.findAll());
	}
	
	@RequestMapping(value = "/employeeSalary/listAllUserIsActive")
	public RestResult listAllUserIsActive() {
		return new RestResult(employeeSalaryRepository.findByUserIsActive(true));
	}

	@RequestMapping(value = "employeeSalary/listAllEmployeeSalaryByMonthAndYear")
	public RestResult listFindAllEmployeeByCompanyMonthAndYear(@RequestParam("month") String month,
			@RequestParam("year") String year,@RequestParam("companyId") String companyId,@RequestParam("fullNameOrEmail") String fullNameOrEmail) {
		return new RestResult(employeeSalaryRepository.findAll(new EmployeeSalarySpecification(month, year, companyId,fullNameOrEmail)));
	}
	

}
