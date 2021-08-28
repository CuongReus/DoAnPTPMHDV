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

import com.logsik.taman.domain.Job;
import com.logsik.taman.dtos.JobDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.JobRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class JobController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(JobController.class);

	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("job/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(jobRepository.findById(id));
	}

	@RequestMapping(value = "/job/add", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult add(@RequestBody JobDto jobDto) {
		try {
			Job newJob = dtoConverter.convertToJob(jobDto);
			newJob = jobRepository.save(newJob);
			return new RestResult(newJob);
		} catch (Exception e) {
			LOGGER.error("Error when adding job.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/job/update", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult update(@RequestBody JobDto jobDto) {
		try {
			Job updatedJob = jobRepository.save(dtoConverter.convertToJob(jobDto));
			return new RestResult(updatedJob);
		} catch (Exception e) {
			LOGGER.error("Error when updating job.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/job/{id}")
	public RestResult deletejob(@PathVariable("id") Long id) {
		System.out.println("Delete job with ID = " + id + "...");

		try {
			jobRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete job.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/job/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if (search == null) {
			result = jobRepository.findAll(pageable);
		} else {
			result = jobRepository.findByTitleContaining(search, pageable);
		}
		return new RestResult(result);
	}

	@RequestMapping(value = "/job/listAll")
	public RestResult listAll() {
		return new RestResult(jobRepository.findAll());
	}
}
