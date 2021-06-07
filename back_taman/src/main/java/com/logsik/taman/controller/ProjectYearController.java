package com.logsik.taman.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.ProjectYear;
import com.logsik.taman.dtos.ProjectYearDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.ProjectYearRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class ProjectYearController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ProjectYearController.class);

	@Autowired
	private ProjectYearRepository projectYearRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("projectYear/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {

		return new RestResult(projectYearRepository.findById(id));
	}

	
	@RequestMapping(value = "/projectYear/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ProjectYearDto projectYearDto) {
		try {
			ProjectYear newProjectYear = dtoConverter.convertToProjectYear(projectYearDto);
			 newProjectYear = projectYearRepository.save(newProjectYear);

			return new RestResult(newProjectYear);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/projectYear/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ProjectYearDto projectYearDto) {
		try {

			ProjectYear updatedProjectYear = projectYearRepository.save(dtoConverter.convertToProjectYear(projectYearDto));

			return new RestResult(updatedProjectYear);
		} catch (Exception e) {
			LOGGER.error("Error when updating projectYear.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/projectYear/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			projectYearRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete projectYear.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/projectYear/list")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result;
			result = projectYearRepository.findAll(pageable);
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/projectYear/listAll")
	public RestResult listAll() {
		return new RestResult(projectYearRepository.findAll());

	}
	@RequestMapping(value = "/projectYear/listFindByCompany")
	public RestResult listFindByCompany(@RequestParam("company") Long companyId) {
		return new RestResult(projectYearRepository.findByCompanyId(companyId));

	}

}
