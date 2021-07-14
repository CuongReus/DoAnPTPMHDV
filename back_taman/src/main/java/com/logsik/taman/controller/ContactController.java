package com.logsik.taman.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.Contact;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.ContactDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.enums.ContactStatus;
import com.logsik.taman.enums.SupplierType;
import com.logsik.taman.queries.ContactSpecification;
import com.logsik.taman.queries.PersonelSpecification;
import com.logsik.taman.repository.ContactRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class ContactController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ContactController.class);

	@Autowired
	private ContactRepository contactRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("contact/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(contactRepository.findById(id));
	}

	@RequestMapping(value = "/contact/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ContactDto contactDto) {
		try {
			Contact newContact = contactRepository.save(dtoConverter.convertToContact(contactDto));

			return new RestResult(newContact);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/contact/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ContactDto contactDto) {
		try {
			Contact dtoConvert = dtoConverter.convertToContact(contactDto);
			Contact updatedContact = contactRepository.save(dtoConvert);

			return new RestResult(updatedContact);
		} catch (Exception e) {
			LOGGER.error("Error when updating contact.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/contact/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contact with ID = " + id + "...");

		try {
			contactRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete contact.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}
		return new RestResult("ok");
	}

	@RequestMapping(value = "/contact/listFindByContactStatusAndNameOrTaxNumber")
	public RestResult listFindByContactStatusAndNameOrTaxNumber(
			@RequestParam("contactStatus") String contactStatus,
			@RequestParam("nameOrTaxNumber") String nameOrTaxNumber,Pageable pageable) {
		Page<Contact> result = contactRepository.findAll(new ContactSpecification(contactStatus, nameOrTaxNumber),pageable);
		
		return new RestResult(result);
	}

	@RequestMapping(value = "/contact/listAll")
	public RestResult listAll() {
		return new RestResult(contactRepository.findAll());

	}
	
}
