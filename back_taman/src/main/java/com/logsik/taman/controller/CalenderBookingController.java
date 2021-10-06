package com.logsik.taman.controller;

import java.text.ParseException;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.CalenderBooking;
import com.logsik.taman.dtos.CalenderBookingDTO;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.queries.CalendarBookingSpecification;
import com.logsik.taman.repository.CalenderBookingRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.TimeService;

@RestController
@RequestMapping("/api")
public class CalenderBookingController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(CalenderBookingController.class);

	@Autowired
	private CalenderBookingRepository calenderBookingRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private TimeService timeService;
	

	@RequestMapping("calendarBooking/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(calenderBookingRepository.findById(id).get());
	}

	
	@RequestMapping(value = "/calendarBooking/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody CalenderBookingDTO calenderBookingDTO) {
		try {
			CalenderBooking newCalenderBooking = dtoConverter.convertToCalenderBooking(calenderBookingDTO);
			newCalenderBooking = calenderBookingRepository.save(newCalenderBooking);
			return new RestResult(newCalenderBooking);
		} catch (Exception e) {
			LOGGER.error("Error when adding calenderBooking.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/calendarBooking/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody CalenderBookingDTO calenderBookingDTO) {
		try {
			CalenderBooking updatedCalenderBooking = calenderBookingRepository
					.save(dtoConverter.convertToCalenderBooking(calenderBookingDTO));
			return new RestResult(updatedCalenderBooking);
		} catch (Exception e) {
			LOGGER.error("Error when updating calenderBooking.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/calendarBooking/{id}")
	public RestResult deletecalenderBooking(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete calenderBooking with ID = " + id + "...");

		try {
			calenderBookingRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete calenderBooking.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/calendarBooking/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = calenderBookingRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/calendarBooking/listAll")
	public RestResult listAll() {
		return new RestResult(calenderBookingRepository.findAll());
	}

	@RequestMapping(value = "/calendarBooking/listAllAndGroup")
	public RestResult listAllAndGroup(@RequestParam("startDate") String fromDateString, @RequestParam("userId") String userId)
			throws ParseException {
		Object result = null;
		Date fromDate = null;
		Date toDate = null;
		Date tomorrow = null;
		if (!StringUtils.isEmpty(fromDateString) && fromDateString != null) {
			fromDate = timeService.getFirstDayOfMonth(timeService.parseStringToDateTime(fromDateString));
			toDate = timeService.getLastDayOfMonth(timeService.parseStringToDateTime(fromDateString));
			tomorrow = new Date(toDate.getTime() + (1000 * 60 * 60 * 24));//query between fromDate and toDate for result miss data of lastDayOfMonth so plus 1 day
		}
		if(userId.equals("All")) {
			result = calenderBookingRepository.findAll(new CalendarBookingSpecification(fromDate, tomorrow));
		}else {
			result = calenderBookingRepository.listCalenderBookingByUserIdAndStartDate(Long.parseLong(userId), fromDate, tomorrow);
		}
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/calendarBooking/listByContactId")
	public RestResult listByContactId(@RequestParam("startDate") String fromDateString, @RequestParam("contactId") Long contactId)
			throws ParseException {
		Object result = null;
		Date fromDate = null;
		Date toDate = null;
		Date tomorrow = null;
		if (!StringUtils.isEmpty(fromDateString) && fromDateString != null) {
			fromDate = timeService.getFirstDayOfMonth(timeService.parseStringToDateTime(fromDateString));
			toDate = timeService.getLastDayOfMonth(timeService.parseStringToDateTime(fromDateString));
			tomorrow = new Date(toDate.getTime() + (1000 * 60 * 60 * 24));
		}
		result = calenderBookingRepository.listCalenderBookingByContactIdAndStartDate(contactId, fromDate, tomorrow);
		return new RestResult(result);
	}

}
