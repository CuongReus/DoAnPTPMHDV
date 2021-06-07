package com.logsik.taman.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.InvoiceVer3;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.InvoiceVer3Dto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.InvoiceVer3Repository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.InvoiceRelationService;

@RestController
@RequestMapping("/api")
public class InvoiceVer3Controller extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceVer3Controller.class);

	@Autowired
	private InvoiceVer3Repository invoiceVer3Repository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private InvoiceRelationService invoiceRelationService;
	
	@RequestMapping("invoiceVer3/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<InvoiceVer3> invoiceVer3 = invoiceVer3Repository.findById(id);
		List<FileUpload> inputUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InputVer3",
				invoiceVer3.get().getId());
		List<FileUpload> invoiceUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InvoiceVer3",
				invoiceVer3.get().getId());
		return new RestResult(dtoConverter.convertToInvoiceVer3Dto(invoiceVer3.get(), inputUploadFile, invoiceUploadFile));
	}
	@RequestMapping(value = "/invoiceVer3/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody InvoiceVer3Dto invoiceVer3Dto) {
		checkAuthorization("admin.projectProgress.invoiceVer3C&U");
		try {
			InvoiceVer3 newInvoiceVer3 = dtoConverter.convertToInvoiceVer3(invoiceVer3Dto);
			 newInvoiceVer3 = invoiceVer3Repository.save(newInvoiceVer3);
			saveNewInputVer3File(newInvoiceVer3, invoiceVer3Dto.getInputUploadFile());
			saveNewInvoiceVer3File(newInvoiceVer3, invoiceVer3Dto.getInvoiceUploadFile());
			boolean result = invoiceRelationService.newInvoiceRelation(newInvoiceVer3.getProjectDetailId(), 3, newInvoiceVer3.getId());
			if(result) {
				return new RestResult(newInvoiceVer3);
			}else {
				return new RestResult(true, MESSAGE_CANNOT_SAVE);
			}
		} catch (Exception e) {
			LOGGER.error("Error when adding invoiceVer3.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	private void saveNewInputVer3File(InvoiceVer3 invoiceVer3, List<UploadFileResponse> invoiceVer3UploadFile) {
		User createdUser = userRepository.findById(invoiceVer3.getCreatedUserId()).get(); 
		for (UploadFileResponse file : invoiceVer3UploadFile) {
			FileUpload inputVer3File = new FileUpload();
			inputVer3File.setName(file.getFileName());
			inputVer3File.setFileLocation(file.getFileDownloadUri());
			inputVer3File.setSize(file.getSize());
			inputVer3File.setCrmLinkId(invoiceVer3.getId());
			inputVer3File.setCrmTableName("InputVer3");
			invoiceVer3.setInputUpload(file.getFileDownloadUri());
			inputVer3File.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(inputVer3File);
		}
	}

	private void saveNewInvoiceVer3File(InvoiceVer3 invoiceVer3, List<UploadFileResponse> defectUploadFile) {
		User createdUser = userRepository.findById(invoiceVer3.getCreatedUserId()).get(); 
		for (UploadFileResponse file : defectUploadFile) {
			FileUpload invoiceVer3File = new FileUpload();
			invoiceVer3File.setName(file.getFileName());
			invoiceVer3File.setFileLocation(file.getFileDownloadUri());
			invoiceVer3File.setSize(file.getSize());
			invoiceVer3File.setCrmLinkId(invoiceVer3.getId());
			invoiceVer3File.setCrmTableName("InvoiceVer3");
			invoiceVer3.setInvoiceUpload(file.getFileDownloadUri());
			invoiceVer3File.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(invoiceVer3File);
		}
	}

	@RequestMapping(value = "/invoiceVer3/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody InvoiceVer3Dto invoiceVer3Dto) {
		checkAuthorization("admin.projectProgress.invoiceVer3C&U");
		try {
			InvoiceVer3 updatedInvoiceVer3 = invoiceVer3Repository
					.save(dtoConverter.convertToInvoiceVer3(invoiceVer3Dto));
			updateInputVer3(updatedInvoiceVer3, invoiceVer3Dto.getInputUploadFile());
			updateInvoiceVer3(updatedInvoiceVer3, invoiceVer3Dto.getInvoiceUploadFile());
			boolean result = invoiceRelationService.newInvoiceRelation(updatedInvoiceVer3.getProjectDetailId(), 3, updatedInvoiceVer3.getId());
			if(result) {
				return new RestResult(updatedInvoiceVer3);
			}else {
				return new RestResult(true, MESSAGE_CANNOT_SAVE);
			}
		} catch (Exception e) {
			LOGGER.error("Error when updating invoiceVer3.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	private void updateInputVer3(InvoiceVer3 invoiceVer3, List<UploadFileResponse> newInputVer3) {
		User lastedUpdateUser = userRepository.findById(invoiceVer3.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentInvoiceVer3Files = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InputVer3",
				invoiceVer3.getId());
		List<String> currentInvoiceVer3 = currentInvoiceVer3Files.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newInvoiceVer3String = newInputVer3.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload inputVer3File : currentInvoiceVer3Files) {
			if (!newInvoiceVer3String.contains(inputVer3File.getName())) {
				fileUploadRepository.delete(inputVer3File);
			}
		}
		for (UploadFileResponse newFile : newInputVer3) {
			if (!currentInvoiceVer3.contains(newFile.getFileDownloadUri())) {
				FileUpload inputVer3File = new FileUpload();
				inputVer3File.setCrmTableName("InputVer3");
				inputVer3File.setCrmLinkId(invoiceVer3.getId());
				inputVer3File.setName(newFile.getFileName());
				inputVer3File.setFileLocation(newFile.getFileDownloadUri());
				inputVer3File.setSize(newFile.getSize());
				invoiceVer3.setInputUpload(newFile.getFileDownloadUri());
				inputVer3File.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(inputVer3File);
			} else if (currentInvoiceVer3.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}
		}
	}

	private void updateInvoiceVer3(InvoiceVer3 invoiceVer3, List<UploadFileResponse> newInvoiceVer3) {
		User lastedUpdateUser = userRepository.findById(invoiceVer3.getLastedUpdateUserId()).get(); 
		
		List<FileUpload> currentInvoiceVer3Files = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("InvoiceVer3", invoiceVer3.getId());
		List<String> currentInvoiceVer3 = currentInvoiceVer3Files.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newInvoiceVer3String = newInvoiceVer3.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload invoiceVer3File : currentInvoiceVer3Files) {
			if (!newInvoiceVer3String.contains(invoiceVer3File.getName())) {
				fileUploadRepository.delete(invoiceVer3File);
			}
		}
		for (UploadFileResponse newFile : newInvoiceVer3) {
			if (!currentInvoiceVer3.contains(newFile.getFileDownloadUri())) {
				FileUpload invoiceVer3File = new FileUpload();
				invoiceVer3File.setCrmTableName("InvoiceVer3");
				invoiceVer3File.setCrmLinkId(invoiceVer3.getId());
				invoiceVer3File.setName(newFile.getFileName());
				invoiceVer3File.setFileLocation(newFile.getFileDownloadUri());
				invoiceVer3File.setSize(newFile.getSize());
				invoiceVer3.setInvoiceUpload(newFile.getFileDownloadUri());
				invoiceVer3File.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(invoiceVer3File);
			} else if (currentInvoiceVer3.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	@DeleteMapping("/invoiceVer3/{id}")
	public RestResult deleteinvoiceVer3(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete invoiceVer3 with ID = " + id + "...");

		try {
			invoiceVer3Repository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete invoiceVer3.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/invoiceVer3/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = invoiceVer3Repository.findAll(pageable);
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/invoiceVer3/findByProjectDetailId")
	public RestResult list(@RequestParam("projectDetailId") Long projectDetailId) {
		Object result;
		result = invoiceVer3Repository.findByProjectDetailId(projectDetailId);
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/invoiceVer3/listFindByInvoiceNumber")
	public RestResult list(@RequestParam("invoiceNumber") String invoiceNumber) {
		Object result;
		result = invoiceVer3Repository.findByInvoiceNumber(invoiceNumber);
		return new RestResult(result);
	}

	@RequestMapping(value = "/invoiceVer3/listAll")
	public RestResult listAll() {
		return new RestResult(invoiceVer3Repository.findAll());
	}
}
