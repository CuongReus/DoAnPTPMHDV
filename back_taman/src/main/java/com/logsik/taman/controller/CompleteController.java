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

import com.logsik.taman.domain.Complete;
import com.logsik.taman.dtos.CompleteDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.CompleteRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class CompleteController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(CompleteController.class);

	@Autowired
	private CompleteRepository completeRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("complete/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {

		return new RestResult(completeRepository.findById(id));
	}

	@RequestMapping(value = "/complete/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody CompleteDto completeDto) {
		checkAuthorization("admin.projectProgress.completeC&U");
		try {
			Complete newComplete = dtoConverter.convertToComplete(completeDto);

			 newComplete = completeRepository.save(newComplete);

			return new RestResult(newComplete);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/complete/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody CompleteDto completeDto) {
		checkAuthorization("admin.projectProgress.completeC&U");
		try {

			Complete updatedcontract = completeRepository.save(dtoConverter.convertToComplete(completeDto));

			return new RestResult(updatedcontract);
		} catch (Exception e) {
			LOGGER.error("Error when updating complete.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/complete/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			completeRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete complete.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/complete/list")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result;
		if (search == null) {
			result = completeRepository.findAll(pageable);
		} else {
			result = completeRepository.findById(search, pageable);

		}
		return new RestResult(result);
	}

	@RequestMapping(value = "/complete/listAll")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult listAll() {
		return new RestResult(completeRepository.findAll());

	}

}
