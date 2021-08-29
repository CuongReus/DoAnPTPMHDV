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

import com.logsik.taman.domain.SwotJob;
import com.logsik.taman.dtos.SwotJobDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.SwotJobRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class SwotJobController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(SwotJobController.class);

	@Autowired
	private SwotJobRepository swotJobRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("swotJob/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(swotJobRepository.findById(id));
	}

	@RequestMapping(value = "/swotJob/add", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult add(@RequestBody SwotJobDto swotJobDto) {
		try {
			SwotJob newSwotJob = dtoConverter.convertToSwotJob(swotJobDto);
			newSwotJob = swotJobRepository.save(newSwotJob);
			return new RestResult(newSwotJob);
		} catch (Exception e) {
			LOGGER.error("Error when adding swotJob.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/swotJob/update", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult update(@RequestBody SwotJobDto swotJobDto) {
		try {
			SwotJob updatedSwotJob = swotJobRepository.save(dtoConverter.convertToSwotJob(swotJobDto));
			return new RestResult(updatedSwotJob);
		} catch (Exception e) {
			LOGGER.error("Error when updating swotJob.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/swotJob/{id}")
	public RestResult deleteSwotJob(@PathVariable("id") Long id) {
		System.out.println("Delete SwotJob with ID = " + id + "...");

		try {
			swotJobRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete SwotJob.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}
	
	@RequestMapping(value = "/swotJob/listFindByJobId")
	public RestResult listFindByJobId(@RequestParam("jobId") Long jobId) {
		Object result;
		result = swotJobRepository.findByJobId(jobId);
		return new RestResult(result);
	}

	@RequestMapping(value = "/swotJob/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		
		Object result;
		result = swotJobRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/swotJob/listAll")
	public RestResult listAll() {
		return new RestResult(swotJobRepository.findAll());
	}
}
