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
import com.logsik.taman.domain.InvoiceVATOutput;
import com.logsik.taman.dtos.InvoiceVATOutputDTO;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.InvoiceVATOutputRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class InvoiceVATOutputController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceVATOutputController.class);

	@Autowired
	private InvoiceVATOutputRepository invoiceVATOutputRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@RequestMapping("invoiceVATOutput/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		InvoiceVATOutput invoiceVATOutput = invoiceVATOutputRepository.findById(id).get();
		List<FileUpload> files = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InvoiceVATOutput",
				invoiceVATOutput.getId());
		return new RestResult(dtoConverter.convertToInvoiceVATOutputDTO(invoiceVATOutput, files));
	}

	@RequestMapping(value = "invoiceVATOutput/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody InvoiceVATOutputDTO invoiceVATOutputDTO) {
		try {
			InvoiceVATOutput newInvoiceVATOutput = dtoConverter.convertToInvoiceVATOutput(invoiceVATOutputDTO);
			
			newInvoiceVATOutput = invoiceVATOutputRepository.save(newInvoiceVATOutput);
			 
			saveInputVATInputFile(newInvoiceVATOutput, invoiceVATOutputDTO.getFiles());
			
			return new RestResult(newInvoiceVATOutput);
		} catch (Exception e) {
			LOGGER.error("Error when adding invoiceVATOutput.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	
	private void saveInputVATInputFile(InvoiceVATOutput invoiceVATOutput, List<UploadFileResponse> files) {
		for (UploadFileResponse file : files) {
			FileUpload fileUpload = new FileUpload();
			fileUpload.setName(file.getFileName());
			fileUpload.setFileLocation(file.getFileDownloadUri());
			fileUpload.setSize(file.getSize());
			fileUpload.setCrmLinkId(invoiceVATOutput.getId());
			fileUpload.setCrmTableName("InvoiceVATOutput");
			fileUploadRepository.save(fileUpload);
		}
	}

	@RequestMapping(value = "invoiceVATOutput/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody InvoiceVATOutputDTO invoiceVATOutputDTO) {
		try {
			InvoiceVATOutput updatedInvoiceVATOutput = invoiceVATOutputRepository
					.save(dtoConverter.convertToInvoiceVATOutput(invoiceVATOutputDTO));
					
			updateInvoiceVATOutputFile(updatedInvoiceVATOutput, invoiceVATOutputDTO.getFiles());
	
			return new RestResult(updatedInvoiceVATOutput);
	
		} catch (Exception e) {
			LOGGER.error("Error when updating invoiceVATOutput.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	
	private void updateInvoiceVATOutputFile(InvoiceVATOutput invoiceVATOutput, List<UploadFileResponse> files) {
		List<FileUpload> currentUserFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InvoiceVATOutput", invoiceVATOutput.getId());
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
				userFile.setCrmTableName("InvoiceVATOutput");
				userFile.setCrmLinkId(invoiceVATOutput.getId());
				userFile.setName(newFile.getFileName());
				userFile.setFileLocation(newFile.getFileDownloadUri());
				userFile.setSize(newFile.getSize());
				fileUploadRepository.save(userFile);
			} else if (currentProfiles.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}
		}
	}

	@DeleteMapping("invoiceVATOutput/{id}")
	public RestResult deleteinvoiceVATOutput(@PathVariable("id") Long id) throws Exception{
		try {
			invoiceVATOutputRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete invoiceVATOutput.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
		return new RestResult("ok");
	}
	
	@RequestMapping(value = "/invoiceVATOutput/findByProjectDetailId")
	public RestResult invoiceByProjectDetail(@RequestParam("projectDetailId") Long projectDetailId) {
		return new RestResult(invoiceVATOutputRepository.findByProjectDetailId(projectDetailId));
	}
	
}
