package com.logsik.taman.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
import com.logsik.taman.domain.Quotation;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.QuotationDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.QuotationRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
@Transactional
public class QuotationController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(QuotationController.class);

	@Autowired
	private QuotationRepository quotationRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;
	
	@Autowired
	private UserRepository userRepository;

	@RequestMapping("quotation/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<Quotation> quotation = quotationRepository.findById(id);
		List<FileUpload> quotationUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Quotation",
				quotation.get().getId());
		return new RestResult(dtoConverter.convertToQuotationDto(quotation.get(), quotationUploadFile));
	}

	@RequestMapping(value = "/quotation/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody QuotationDto quotationDto) {
		checkAuthorization("admin.projectProgress.quotationC&U");
		try {
			Quotation newQuotation = dtoConverter.convertToQuotation(quotationDto);
			newQuotation = quotationRepository.save(newQuotation);
			saveNewQuotationFile(newQuotation, quotationDto.getQuotationUploadFile());
			return new RestResult(newQuotation);
		} catch (Exception e) {
			LOGGER.error("Error when adding quotation.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void saveNewQuotationFile(Quotation quotation, List<UploadFileResponse> quotationUploadFile) {
		User createdUser = userRepository.findById(quotation.getCreatedUserId()).get(); 
		for (UploadFileResponse file : quotationUploadFile) {
			FileUpload quotationFile = new FileUpload();
			quotationFile.setName(file.getFileName());
			quotationFile.setFileLocation(file.getFileDownloadUri());
			quotationFile.setSize(file.getSize());
			quotationFile.setCrmLinkId(quotation.getId());
			quotationFile.setCrmTableName("Quotation");
			quotationFile.setUploadBy(createdUser.getEmail());
			quotation.setQuotationUpload(file.getFileDownloadUri());
			fileUploadRepository.save(quotationFile);
		}
	}

	@RequestMapping(value = "/quotation/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody QuotationDto quotationDto) {
		checkAuthorization("admin.projectProgress.quotationC&U");
		try {
			Quotation updatedQuotation = quotationRepository
					.save(dtoConverter.convertToQuotation(quotationDto));
			updateQuotation(updatedQuotation, quotationDto.getQuotationUploadFile());
			return new RestResult(updatedQuotation);
		} catch (Exception e) {
			LOGGER.error("Error when updating quotation.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updateQuotation(Quotation quotation, List<UploadFileResponse> newQuotation) {
		User lastedUpdateUser = userRepository.findById(quotation.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentQuotationFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Quotation",
				quotation.getId());
		List<String> currentQuotation = currentQuotationFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newQuotationString = newQuotation.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload quotationFile : currentQuotationFiles) {
			if (!newQuotationString.contains(quotationFile.getName())) {
				fileUploadRepository.delete(quotationFile);
			}
		}
		for (UploadFileResponse newFile : newQuotation) {
			if (!currentQuotation.contains(newFile.getFileDownloadUri())) {
				FileUpload quotationFile = new FileUpload();
				quotationFile.setCrmTableName("Quotation");
				quotationFile.setCrmLinkId(quotation.getId());
				quotationFile.setName(newFile.getFileName());
				quotationFile.setFileLocation(newFile.getFileDownloadUri());
				quotationFile.setSize(newFile.getSize());
				quotation.setQuotationUpload(newFile.getFileDownloadUri());
				quotationFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(quotationFile);
			} else if (currentQuotation.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}


	@DeleteMapping("/quotation/{id}")
	public RestResult deletequotation(@PathVariable("id") Long id) {
		System.out.println("Delete quotation with ID = " + id + "...");

		try {
			quotationRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete quotation.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/quotation/list")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = quotationRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/quotation/listAll")
	public RestResult listAll() {
		return new RestResult(quotationRepository.findAll());
	}
}
