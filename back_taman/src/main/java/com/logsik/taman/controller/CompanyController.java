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

import com.logsik.taman.domain.Company;
import com.logsik.taman.dtos.CompanyDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.CompanyRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class CompanyController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(CompanyController.class);

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("company/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {

		return new RestResult(companyRepository.findById(id));
	}

	@RequestMapping(value = "/company/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody CompanyDto companyDto) {
		try {
			Company newCompany = dtoConverter.convertToCompany(companyDto);
			newCompany = companyRepository.save(newCompany);

			return new RestResult(newCompany);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/company/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody CompanyDto companyDto) {
		try {

			Company updatedCompany = companyRepository.save(dtoConverter.convertToCompany(companyDto));

			return new RestResult(updatedCompany);
		} catch (Exception e) {
			LOGGER.error("Error when updating company.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/company/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			companyRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete company.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/company/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if (search == null) {
			result = companyRepository.findAll(pageable);
		} else {
			result = companyRepository.findByNameContainingOrCodeContaining(search, search, pageable);

		}
		return new RestResult(result);
	}

	@RequestMapping(value = "/company/listAll")
	public RestResult listAll() {
		return new RestResult(companyRepository.findAll());

	}

}
