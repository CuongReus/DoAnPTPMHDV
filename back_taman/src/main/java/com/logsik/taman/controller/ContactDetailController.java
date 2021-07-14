package com.logsik.taman.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.ContactDetail;
import com.logsik.taman.dtos.ContactDetailDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.ContactDetailRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
@Transactional
public class ContactDetailController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ContactDetailController.class);

	@Autowired
	private ContactDetailRepository contactDetailRepository;
	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("contactDetail/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(contactDetailRepository.findById(id));
	}

	@RequestMapping(value = "/contactDetail/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ContactDetailDto contactDetailDto) {
		try {
			ContactDetail newContactDetail = contactDetailRepository.save(dtoConverter.convertToContactDetail(contactDetailDto));			
			return new RestResult(newContactDetail);
		} catch (Exception e) {
			LOGGER.error("Error when adding contact.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/contactDetail/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ContactDetailDto contactDetailDto) {
		try {
			ContactDetail updatedContactDetail = contactDetailRepository.save(dtoConverter.convertToContactDetail(contactDetailDto));
			
			return new RestResult(updatedContactDetail);
		} catch (Exception e) {
			LOGGER.error("Error when updating ContactDetail.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/contactDetail/{id}")
	public RestResult deleteContactDetail(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contactDetail with ID = " + id + "...");

		try {
			contactDetailRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete ContactDetail.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/contactDetail/list")
	public RestResult list(Pageable pageable) {
		Object result;
		result = contactDetailRepository.findAll(pageable);
		return new RestResult(result);
	}
	@RequestMapping(value = "/contactDetail/listFindByContactId")
	public RestResult listFindByContactId(@RequestParam("contactId") Long contactId) {
		Object result;
		result = contactDetailRepository.findByContactId(contactId);
		return new RestResult(result);
	}

	@RequestMapping(value = "/contactDetail/listAll")
	public RestResult listAll() {
		return new RestResult(contactDetailRepository.findAll());

	}

}
