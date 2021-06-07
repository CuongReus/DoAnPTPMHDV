package com.logsik.taman.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.InvoiceVATInput;
import com.logsik.taman.dtos.InvoiceVATInputDTO;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.InvoiceVATInputRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class InvoiceVATInputController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceVATInputController.class);

	@Autowired
	private InvoiceVATInputRepository invoiceVATInputRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@RequestMapping("invoiceVATInput/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		InvoiceVATInput invoiceVATInput = invoiceVATInputRepository.findById(id).get();
		List<FileUpload> files = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InvoiceVATInput",
				invoiceVATInput.getId());
		return new RestResult(dtoConverter.convertToInvoiceVATInputDTO(invoiceVATInput, files));
	}

	@RequestMapping(value = "invoiceVATInput/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody InvoiceVATInputDTO invoiceVATInputDTO) {
		try {
			InvoiceVATInput newInvoiceVATInput = dtoConverter.convertToInvoiceVATInput(invoiceVATInputDTO);
			
			newInvoiceVATInput = invoiceVATInputRepository.save(newInvoiceVATInput);
			 
			saveInputVATInputFile(newInvoiceVATInput, invoiceVATInputDTO.getFiles());
			
			return new RestResult(newInvoiceVATInput);
		} catch (Exception e) {
			LOGGER.error("Error when adding invoiceVATInput.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	
	private void saveInputVATInputFile(InvoiceVATInput invoiceVATInput, List<UploadFileResponse> files) {
		for (UploadFileResponse file : files) {
			FileUpload fileUpload = new FileUpload();
			fileUpload.setName(file.getFileName());
			fileUpload.setFileLocation(file.getFileDownloadUri());
			fileUpload.setSize(file.getSize());
			fileUpload.setCrmLinkId(invoiceVATInput.getId());
			fileUpload.setCrmTableName("InvoiceVATInput");
			fileUploadRepository.save(fileUpload);
		}
	}

	@RequestMapping(value = "invoiceVATInput/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody InvoiceVATInputDTO invoiceVATInputDTO) {
		try {
			InvoiceVATInput updatedInvoiceVATInput = invoiceVATInputRepository
					.save(dtoConverter.convertToInvoiceVATInput(invoiceVATInputDTO));
					
			updateInvoiceVATInputFile(updatedInvoiceVATInput, invoiceVATInputDTO.getFiles());
	
			return new RestResult(updatedInvoiceVATInput);
	
		} catch (Exception e) {
			LOGGER.error("Error when updating invoiceVATInput.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	
	private void updateInvoiceVATInputFile(InvoiceVATInput invoiceVATInput, List<UploadFileResponse> files) {
		List<FileUpload> currentUserFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InvoiceVATInput", invoiceVATInput.getId());
		List<String> currentProfiles = currentUserFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newProfilesString = files.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload userFile : currentUserFiles) {
			if (!newProfilesString.contains(userFile.getName())) {

				fileUploadRepository.delete(userFile);

			}

		}
		for (UploadFileResponse newFile : files) {
			if (!currentProfiles.contains(newFile.getFileDownloadUri())) {
				FileUpload userFile = new FileUpload();
				userFile.setCrmTableName("InvoiceVATInput");
				userFile.setCrmLinkId(invoiceVATInput.getId());
				userFile.setName(newFile.getFileName());
				userFile.setFileLocation(newFile.getFileDownloadUri());
				userFile.setSize(newFile.getSize());
				fileUploadRepository.save(userFile);
			} else if (currentProfiles.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}
		}
	}

	@DeleteMapping("invoiceVATInput/{id}")
	public RestResult deleteinvoiceVATInput(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete invoiceVATInput with ID = " + id + "...");

		try {
			invoiceVATInputRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete invoiceVATInput.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	
	@RequestMapping(value = "/invoiceVATInput/findByProjectDetailId")
	public RestResult invoiceByProjectDetail(@RequestParam("projectDetailId") Long projectDetailId) {
		return new RestResult(invoiceVATInputRepository.findByProjectDetailIdOrderByInvoiceVatOutIdAsc(projectDetailId));
	}
	
	
}
