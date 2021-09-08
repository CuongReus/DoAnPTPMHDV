package com.logsik.taman.controller;

import java.util.List;
import java.util.Optional;

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

import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.Labour;
import com.logsik.taman.dtos.LabourDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.queries.LabourSpecification;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.LabourRepository;
import com.logsik.taman.service.impl.DtoConverter;


@RestController
@RequestMapping("/api")
@Transactional
public class LabourController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(LabourController.class);

	@Autowired
	private LabourRepository labourRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@RequestMapping("labour/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<Labour> labour = labourRepository.findById(id);
		List<FileUpload> labourContractFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("LabourContractFile",
				labour.get().getId());
		
		return new RestResult(dtoConverter.convertToLabourDto(labour.get(), labourContractFile));
	}

	@RequestMapping(value = "/labour/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody LabourDto labourDto) {
		try {
			Labour labour = dtoConverter.convertToLabour(labourDto);
			Labour newLabour = labourRepository.save(labour);
			return new RestResult(newLabour);
		} catch (Exception e) {
			LOGGER.error("Error when adding labour.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/labour/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody LabourDto labourDto) {
		try {
			Labour updatedLabour = labourRepository
					.save(dtoConverter.convertToLabour(labourDto));
			return new RestResult(updatedLabour);
		} catch (Exception e) {
			LOGGER.error("Error when updating labour.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	
	@DeleteMapping("/labour/{id}")
	public RestResult deletelabour(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete labour with ID = " + id + "...");

		try {
			labourRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete labour.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}
	
	@RequestMapping(value = "/labour/findByCompanyIdAndFullNameOrPhone")
	public RestResult list(@RequestParam("companyId") String companyId,@RequestParam("fullNameOrPhone") String fullNameOrPhone, Pageable pageable) {
		Object result;
			result = labourRepository.findAll(new LabourSpecification(companyId, fullNameOrPhone),pageable);

		
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/labour/listAll")
	public RestResult listAll() {
		return new RestResult(labourRepository.findAll());
	}
}
