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

import com.logsik.taman.domain.CalenderType;
import com.logsik.taman.dtos.CalenderTypeDTO;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.CalenderTypeRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class CalenderTypeController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(CalenderTypeController.class);

	@Autowired
	private CalenderTypeRepository calenderTypeRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("calendarType/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(calenderTypeRepository.findById(id).get());
	}

	@RequestMapping(value = "/calendarType/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody CalenderTypeDTO calenderTypeDTO) {
		try {
			CalenderType newCalenderType = dtoConverter.convertToCalenderType(calenderTypeDTO);
			 newCalenderType = calenderTypeRepository.save(newCalenderType);
			return new RestResult(newCalenderType);
		} catch (Exception e) {
			LOGGER.error("Error when adding calenderType.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	

	@RequestMapping(value = "/calendarType/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody CalenderTypeDTO calenderTypeDTO) {
		try {
			CalenderType updatedCalenderType = calenderTypeRepository
					.save(dtoConverter.convertToCalenderType(calenderTypeDTO));
			return new RestResult(updatedCalenderType);
		} catch (Exception e) {
			LOGGER.error("Error when updating calenderType.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	


	@DeleteMapping("/calendarType/{id}")
	public RestResult deletecalenderType(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete calenderType with ID = " + id + "...");

		try {
			calenderTypeRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete calenderType.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/calendarType/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = calenderTypeRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/calendarType/listAll")
	public RestResult listAll() {
		return new RestResult(calenderTypeRepository.findAll());
	}
}
