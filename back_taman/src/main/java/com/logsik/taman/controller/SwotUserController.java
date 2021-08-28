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

import com.logsik.taman.domain.SwotUser;
import com.logsik.taman.dtos.SwotUserDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.SwotUserRepository;
import com.logsik.taman.repository.SwotUserRepository;
import com.logsik.taman.repository.SwotUserRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class SwotUserController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(SwotUserController.class);

	@Autowired
	private SwotUserRepository swotUserRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("swotUser/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(swotUserRepository.findById(id));
	}

	@RequestMapping(value = "/swotUser/add", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult add(@RequestBody SwotUserDto swotUserDto) {
		try {
			SwotUser newSwotUser = dtoConverter.convertToSwotUser(swotUserDto);
			newSwotUser = swotUserRepository.save(newSwotUser);
			return new RestResult(newSwotUser);
		} catch (Exception e) {
			LOGGER.error("Error when adding swotUser.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/swotUser/update", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult update(@RequestBody SwotUserDto swotUserDto) {
		try {
			SwotUser updatedSwotUser = swotUserRepository.save(dtoConverter.convertToSwotUser(swotUserDto));
			return new RestResult(updatedSwotUser);
		} catch (Exception e) {
			LOGGER.error("Error when updating swotUser.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/swotUser/{id}")
	public RestResult deleteSwotUser(@PathVariable("id") Long id) {
		System.out.println("Delete SwotUser with ID = " + id + "...");

		try {
			swotUserRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete SwotUser.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/swotUser/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		
		Object result;
		result = swotUserRepository.findAll(pageable);
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/swotUser/listFindByUserId")
	public RestResult listFindByUserId(@RequestParam("userId") Long userId) {
		Object result;
		result = swotUserRepository.findByUserId(userId);
		return new RestResult(result);
	}

	@RequestMapping(value = "/swotUser/listAll")
	public RestResult listAll() {
		return new RestResult(swotUserRepository.findAll());
	}
}
