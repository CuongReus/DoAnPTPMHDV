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

import com.logsik.taman.domain.Project;
import com.logsik.taman.dtos.ProjectDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.mail.MailClient;
import com.logsik.taman.queries.ProjectSpecification;
import com.logsik.taman.repository.ProjectRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class ProjectController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ProjectController.class);

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private DtoConverter dtoConverter;
	
	@Autowired
	private MailClient mailClient;

	@RequestMapping("project/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(projectRepository.findById(id));
	}
	@RequestMapping(value = "/project/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ProjectDto projectDto) {
		try {
			Project newProject = dtoConverter.convertToProject(projectDto);
			newProject = projectRepository.save(newProject);
			if(newProject.getNotifyTo() !=null) {
				String[] listEmail =   newProject.getNotifyTo().split(",");
				if(listEmail.length != 0) {
					mailClient.sendProjectNotifyTo(newProject);
				}
				}
			return new RestResult(newProject);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	@RequestMapping(value = "/project/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ProjectDto projectDto) {
		try {

			Project updatedProject = projectRepository.save(dtoConverter.convertToProject(projectDto));
			if(updatedProject.getNotifyTo() !=null) {
				String[] listEmail =   updatedProject.getNotifyTo().split(",");
				if(listEmail.length != 0) {
					mailClient.sendProjectNotifyTo(updatedProject);
				}
				}
			return new RestResult(updatedProject);
		} catch (Exception e) {
			LOGGER.error("Error when updating project.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	@DeleteMapping("/project/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			projectRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete project.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/project/list")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result;
			result = projectRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/project/listAll")
	public RestResult listAll() {
		return new RestResult(projectRepository.findAll());

	}
	@RequestMapping(value = "/project/listFindByProjectYear")
	public RestResult listFindByProjectYear(@RequestParam("projectYearId") Long projectYearId) {
		return new RestResult(projectRepository.findByProjectYearId(projectYearId));
	}
	@RequestMapping(value = "/project/listFindByProjectYearAndProjectType")
	public RestResult listFindByProjectYearAndProjectType(@RequestParam("projectYearId") String projectYearId,
			@RequestParam("projectType") String projectType) {
		return new RestResult(projectRepository.findAll(new ProjectSpecification(projectYearId,projectType )));
	}
}
