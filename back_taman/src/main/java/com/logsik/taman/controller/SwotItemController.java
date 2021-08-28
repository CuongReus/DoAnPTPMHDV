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

import com.logsik.taman.domain.SwotItem;
import com.logsik.taman.dtos.SwotItemDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.SwotItemRepository;
import com.logsik.taman.repository.SwotItemRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class SwotItemController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(SwotItemController.class);

	@Autowired
	private SwotItemRepository swotItemRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("swotItem/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(swotItemRepository.findById(id));
	}

	@RequestMapping(value = "/swotItem/add", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult add(@RequestBody SwotItemDto swotItemDto) {
		try {
			SwotItem newSwotItem = dtoConverter.convertToSwotItem(swotItemDto);
			newSwotItem = swotItemRepository.save(newSwotItem);
			return new RestResult(newSwotItem);
		} catch (Exception e) {
			LOGGER.error("Error when adding swotItem.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/swotItem/update", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult update(@RequestBody SwotItemDto swotItemDto) {
		try {
			SwotItem updatedSwotItem = swotItemRepository.save(dtoConverter.convertToSwotItem(swotItemDto));
			return new RestResult(updatedSwotItem);
		} catch (Exception e) {
			LOGGER.error("Error when updating swotItem.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/swotItem/{id}")
	public RestResult deleteSwotItem(@PathVariable("id") Long id) {
		System.out.println("Delete SwotItem with ID = " + id + "...");

		try {
			swotItemRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete SwotItem.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/swotItem/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if (search == null) {
			result = swotItemRepository.findAll(pageable);
		} else {
			result = swotItemRepository.findByTitleContaining(search, pageable);
		}
		return new RestResult(result);
	}

	@RequestMapping(value = "/swotItem/listAll")
	public RestResult listAll() {
		return new RestResult(swotItemRepository.findAll());
	}
}
