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

import com.logsik.taman.domain.ProjectBudget;
import com.logsik.taman.dtos.ProjectBudgetDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.ProjectBudgetRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class ProjectBudgetController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ProjectBudgetController.class);

	@Autowired
	private ProjectBudgetRepository projectBudgetRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("projectBudget/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(projectBudgetRepository.findById(id));
	}
	@RequestMapping(value = "/projectBudget/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ProjectBudgetDto projectBudgetDto) {
		try {
			ProjectBudget newProjectBudget = dtoConverter.convertToProjectBudget(projectBudgetDto);
			 newProjectBudget = projectBudgetRepository.save(newProjectBudget);

			return new RestResult(newProjectBudget);
		} catch (Exception e) {
			LOGGER.error("Error when adding projectBudget.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	@RequestMapping(value = "/projectBudget/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ProjectBudgetDto projectBudgetDto) {
		try {

			ProjectBudget updatedProjectBudget = projectBudgetRepository.save(dtoConverter.convertToProjectBudget( projectBudgetDto));

			return new RestResult(updatedProjectBudget);
		} catch (Exception e) {
			LOGGER.error("Error when updating projectBudget.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	@DeleteMapping("/projectBudget/{id}")
	public RestResult deleteprojectBudget(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete projectBudget with ID = " + id + "...");

		try {
			projectBudgetRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete projectBudget.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/projectBudget/list")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result;
			result = projectBudgetRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/projectBudget/listAll")
	public RestResult listAll() {
		return new RestResult(projectBudgetRepository.findAll());

	}
}
