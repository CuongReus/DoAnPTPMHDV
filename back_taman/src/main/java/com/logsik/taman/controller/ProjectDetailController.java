package com.logsik.taman.controller;

import java.util.Optional;

import javax.transaction.Transactional;

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

import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.dtos.ProjectDetailDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.mail.MailClient;
import com.logsik.taman.repository.ProjectDetailRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.ProjectDetailService;
import com.logsik.taman.service.impl.TotalRevenueService;

@RestController
@RequestMapping("/api")
@Transactional
public class ProjectDetailController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ProjectDetailController.class);

	@Autowired
	private ProjectDetailRepository projectDetailRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private ProjectDetailService projectDetailService;
	@Autowired
	TotalRevenueService totalRevenueService;
	
	@Autowired
	private MailClient mailClient;

	@RequestMapping("projectDetail/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {

		return new RestResult(projectDetailRepository.findById(id));
	}

	@RequestMapping(value = "/projectDetail/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ProjectDetailDto projectDetailDto) {
		try {
			ProjectDetail newProjectDetail = dtoConverter.convertToProjectDetail(projectDetailDto);
			 newProjectDetail = projectDetailRepository.save(newProjectDetail);
			if(newProjectDetail.getNotifyTo() !=null) {
				String[] listEmail =   newProjectDetail.getNotifyTo().split(",");
				if(listEmail.length != 0) {
					mailClient.sendProjectDetailNotifyTo(newProjectDetail);
				}
				}
			return new RestResult(newProjectDetail);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/projectDetail/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ProjectDetailDto projectDetailDto) {
		try {
			
			ProjectDetail updatedProjectDetail = projectDetailRepository
					.save(dtoConverter.convertToProjectDetail(projectDetailDto));
			if(updatedProjectDetail.getNotifyTo() !=null) {
				String[] listEmail =   updatedProjectDetail.getNotifyTo().split(",");
				if(listEmail.length != 0) {
					mailClient.sendProjectDetailNotifyTo(updatedProjectDetail);
				}
				}
			return new RestResult(updatedProjectDetail);
		} catch (Exception e) {
			LOGGER.error("Error when updating projectDetail.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/projectDetail/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			Optional<ProjectDetail> projectDetail = projectDetailRepository.findById(id);
			projectDetailService.deleteAllItemInProjectDetailId(id);
			projectDetailRepository.deleteById(id);
			totalRevenueService.setProjectTotalRevenue(projectDetail.get().getProject());
			totalRevenueService.setProjectYearTotalRevenue(projectDetail.get().getProject().getProjectYear());
			
			
		} catch (Exception e) {
			LOGGER.error("Error when delete projectDetail.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/projectDetail/list")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result;
		result = projectDetailRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/projectDetail/listAll")
	public RestResult listAll() {
		return new RestResult(projectDetailRepository.findAll());

	}

	@RequestMapping(value = "/projectDetail/listFindByProject")
	public RestResult listFindByProject(@RequestParam("projectId") Long projectId, Pageable pageable) {
		return new RestResult(projectDetailRepository.findDistinctByProjectIdOrderByIdAsc(projectId));
	}

	@RequestMapping(value = "/projectDetailDto/findByProjectDetailId")
	public RestResult listProgress(@RequestParam("projectDetailId") Long projectDetailId) {
		return new RestResult(projectDetailService.findDtoById(projectDetailId));
	}
	
}
