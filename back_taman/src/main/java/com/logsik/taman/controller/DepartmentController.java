package com.logsik.taman.controller;

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
import com.logsik.taman.dtos.DepartmentDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.DepartmentRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class DepartmentController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(DepartmentController.class);

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("department/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(departmentRepository.findById(id));
	}

	@RequestMapping(value = "/department/add", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult add(@RequestBody DepartmentDto departmentDto) {
		try {
			Department newDepartment = dtoConverter.convertToDepartment(departmentDto);
			newDepartment = departmentRepository.save(newDepartment);
			return new RestResult(newDepartment);
		} catch (Exception e) {
			LOGGER.error("Error when adding department.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/department/update", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult update(@RequestBody DepartmentDto departmentDto) {
		try {
			Department updatedDepartment = departmentRepository.save(dtoConverter.convertToDepartment(departmentDto));
			return new RestResult(updatedDepartment);
		} catch (Exception e) {
			LOGGER.error("Error when updating department.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/department/{id}")
	public RestResult deletedepartment(@PathVariable("id") Long id) {
		System.out.println("Delete department with ID = " + id + "...");

		try {
			departmentRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete department.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/department/list")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if (search == null) {
			result = departmentRepository.findAll(pageable);
		} else {
			result = departmentRepository.findByNameContainingOrCodeContaining(search, search, pageable);
		}
		return new RestResult(result);
	}

	@RequestMapping(value = "/department/listAll")
	public RestResult listAll() {
		return new RestResult(departmentRepository.findAll());
	}
}
