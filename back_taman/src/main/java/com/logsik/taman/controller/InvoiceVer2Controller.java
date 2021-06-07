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
import com.logsik.taman.domain.InvoiceVer2;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.InvoiceVer2Dto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.InvoiceVer2Repository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.InvoiceRelationService;

@RestController
@RequestMapping("/api")
public class InvoiceVer2Controller extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceVer2Controller.class);

	@Autowired
	private InvoiceVer2Repository invoiceVer2Repository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private InvoiceRelationService invoiceRelationService;
	
	@RequestMapping("invoiceVer2/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<InvoiceVer2> invoiceVer2 = invoiceVer2Repository.findById(id);
		List<FileUpload> invoiceUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InvoiceVer2",
				invoiceVer2.get().getId());
		List<FileUpload> verifyUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Verify",
				invoiceVer2.get().getId());
		List<FileUpload> inputUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InputVer2",
				invoiceVer2.get().getId());
		List<FileUpload> paymentUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("PaymentVer2",
				invoiceVer2.get().getId());
		return new RestResult(dtoConverter.convertToInvoiceVer2Dto(invoiceVer2.get(),
				invoiceUploadFile,
				verifyUploadFile,
				inputUploadFile,
				paymentUploadFile));
	}

	@RequestMapping(value = "/invoiceVer2/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody InvoiceVer2Dto invoiceVer2Dto) {
		checkAuthorization("admin.projectProgress.invoiceVer2C&U");
		try {
			InvoiceVer2 newInvoiceVer2 = dtoConverter.convertToInvoiceVer2(invoiceVer2Dto);
			newInvoiceVer2 = invoiceVer2Repository.save(newInvoiceVer2);
			saveInvoiceVer2File(newInvoiceVer2, invoiceVer2Dto.getInvoiceUploadFile());
			saveVerifyVer2File(newInvoiceVer2, invoiceVer2Dto.getVerifyUploadFile());
			saveInputVer2File(newInvoiceVer2, invoiceVer2Dto.getInputUploadFile());
			savePaymentVer2File(newInvoiceVer2, invoiceVer2Dto.getPaymentUploadFile());
			boolean result = invoiceRelationService.newInvoiceRelation(newInvoiceVer2.getProjectDetailId(), 2, newInvoiceVer2.getId());
			if(result) {
				return new RestResult(newInvoiceVer2);
			}else {
				return new RestResult(true, MESSAGE_CANNOT_SAVE);
			}
		} catch (Exception e) {
			LOGGER.error("Error when adding invoiceVer2.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void saveInvoiceVer2File(InvoiceVer2 invoiceVer2, List<UploadFileResponse> invoiceUploadFile) {
		User createdUser = userRepository.findById(invoiceVer2.getCreatedUserId()).get(); 
		
		for (UploadFileResponse file : invoiceUploadFile) {
			FileUpload InvoiceVer2File = new FileUpload();
			InvoiceVer2File.setName(file.getFileName());
			InvoiceVer2File.setFileLocation(file.getFileDownloadUri());
			InvoiceVer2File.setSize(file.getSize());
			InvoiceVer2File.setCrmLinkId(invoiceVer2.getId());
			InvoiceVer2File.setCrmTableName("InvoiceVer2");
			invoiceVer2.setInvoiceUpload(file.getFileDownloadUri());
			InvoiceVer2File.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(InvoiceVer2File);
		}
	}

	private void saveVerifyVer2File(InvoiceVer2 invoiceVer2, List<UploadFileResponse> verifyUploadFile) {
		User createdUser = userRepository.findById(invoiceVer2.getCreatedUserId()).get(); 
		
		for (UploadFileResponse file : verifyUploadFile) {
			FileUpload verifyFile = new FileUpload();
			verifyFile.setName(file.getFileName());
			verifyFile.setFileLocation(file.getFileDownloadUri());
			verifyFile.setSize(file.getSize());
			verifyFile.setCrmLinkId(invoiceVer2.getId());
			verifyFile.setCrmTableName("Verify");
			invoiceVer2.setVerifyUpload(file.getFileDownloadUri());
			verifyFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(verifyFile);
		}
	}
	
	private void saveInputVer2File(InvoiceVer2 invoiceVer2, List<UploadFileResponse> inputUploadFile) {
		User createdUser = userRepository.findById(invoiceVer2.getCreatedUserId()).get(); 
		
		for (UploadFileResponse file : inputUploadFile) {
			FileUpload inputVer2File = new FileUpload();
			inputVer2File.setName(file.getFileName());
			inputVer2File.setFileLocation(file.getFileDownloadUri());
			inputVer2File.setSize(file.getSize());
			inputVer2File.setCrmLinkId(invoiceVer2.getId());
			inputVer2File.setCrmTableName("InputVer2");
			invoiceVer2.setInputUpload(file.getFileDownloadUri());
			inputVer2File.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(inputVer2File);
		}
	}
	

	private void savePaymentVer2File(InvoiceVer2 invoiceVer2, List<UploadFileResponse> paymentUploadFile) {
		User createdUser = userRepository.findById(invoiceVer2.getCreatedUserId()).get(); 
		for (UploadFileResponse file : paymentUploadFile) {
			FileUpload paymentVer2File = new FileUpload();
			paymentVer2File.setName(file.getFileName());
			paymentVer2File.setFileLocation(file.getFileDownloadUri());
			paymentVer2File.setSize(file.getSize());
			paymentVer2File.setCrmLinkId(invoiceVer2.getId());
			paymentVer2File.setCrmTableName("PaymentVer2");
			invoiceVer2.setPaymentUpload(file.getFileDownloadUri());
			paymentVer2File.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(paymentVer2File);
		}
	}

	@RequestMapping(value = "/invoiceVer2/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody InvoiceVer2Dto invoiceVer2Dto) {
		checkAuthorization("admin.projectProgress.invoiceVer2C&U");
		try {
			InvoiceVer2 updatedInvoiceVer2 = invoiceVer2Repository
					.save(dtoConverter.convertToInvoiceVer2( invoiceVer2Dto));
			updateInvoiceVer2File(updatedInvoiceVer2, invoiceVer2Dto.getInvoiceUploadFile());
			updateVerifyVer2File(updatedInvoiceVer2, invoiceVer2Dto.getVerifyUploadFile());
			updateInputVer2File(updatedInvoiceVer2, invoiceVer2Dto.getInputUploadFile());
			updatePaymentVer2File(updatedInvoiceVer2, invoiceVer2Dto.getPaymentUploadFile());
			boolean result = invoiceRelationService.newInvoiceRelation(updatedInvoiceVer2.getProjectDetailId(), 2, updatedInvoiceVer2.getId());
			if(result) {
				return new RestResult(updatedInvoiceVer2);
			}else {
				return new RestResult(true, MESSAGE_CANNOT_SAVE);
			}
		} catch (Exception e) {
			LOGGER.error("Error when updating invoiceVer2.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updateInvoiceVer2File(InvoiceVer2 invoiceVer2, List<UploadFileResponse> newinvoiceVer2File) {
		User lastedUpdateUser = userRepository.findById(invoiceVer2.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentInvoiceVer2Files = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InvoiceVer2",
				invoiceVer2.getId());
		List<String> currentInvoiceVer2 = currentInvoiceVer2Files.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newInvoiceVer2String = newinvoiceVer2File.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload invoiceVer2File : currentInvoiceVer2Files) {
			if (!newInvoiceVer2String.contains(invoiceVer2File.getName())) {
				fileUploadRepository.delete(invoiceVer2File);
			}
		}
		for (UploadFileResponse newFile : newinvoiceVer2File) {
			if (!currentInvoiceVer2.contains(newFile.getFileDownloadUri())) {
				FileUpload invoiceFile = new FileUpload();
				invoiceFile.setCrmTableName("InvoiceVer2");
				invoiceFile.setCrmLinkId(invoiceVer2.getId());
				invoiceFile.setName(newFile.getFileName());
				invoiceFile.setFileLocation(newFile.getFileDownloadUri());
				invoiceFile.setSize(newFile.getSize());
				invoiceVer2.setInvoiceUpload(newFile.getFileDownloadUri());
				invoiceFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(invoiceFile);
			} else if (currentInvoiceVer2.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateVerifyVer2File(InvoiceVer2 invoiceVer2, List<UploadFileResponse> newVerifyUploadFile) {
		User lastedUpdateUser = userRepository.findById(invoiceVer2.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentVerifyFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("Verify", invoiceVer2.getId());
		List<String> currentVerfify = currentVerifyFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newVerifyString = newVerifyUploadFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload verifyFile : currentVerifyFiles) {
			if (!newVerifyString.contains(verifyFile.getName())) {
				fileUploadRepository.delete(verifyFile);
			}
		}
		for (UploadFileResponse newFile : newVerifyUploadFile) {
			if (!currentVerfify.contains(newFile.getFileDownloadUri())) {
				FileUpload verifyFile = new FileUpload();
				verifyFile.setCrmTableName("Verify");
				verifyFile.setCrmLinkId(invoiceVer2.getId());
				verifyFile.setName(newFile.getFileName());
				verifyFile.setFileLocation(newFile.getFileDownloadUri());
				verifyFile.setSize(newFile.getSize());
				invoiceVer2.setVerifyUpload(newFile.getFileDownloadUri());
				verifyFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(verifyFile);
			} else if (currentVerfify.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}
	private void updateInputVer2File(InvoiceVer2 invoiceVer2, List<UploadFileResponse> newInputVer2File) {
		User lastedUpdateUser = userRepository.findById(invoiceVer2.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentInputVer2Files = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("InputVer2", invoiceVer2.getId());
		List<String> currentInputVer2 = currentInputVer2Files.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newInputVer2String = newInputVer2File.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload inputVer2File : currentInputVer2Files) {
			if (!newInputVer2String.contains(inputVer2File.getName())) {
				fileUploadRepository.delete(inputVer2File);
			}
		}
		for (UploadFileResponse newFile : newInputVer2File) {
			if (!currentInputVer2.contains(newFile.getFileDownloadUri())) {
				FileUpload inputVer2File = new FileUpload();
				inputVer2File.setCrmTableName("InputVer2");
				inputVer2File.setCrmLinkId(invoiceVer2.getId());
				inputVer2File.setName(newFile.getFileName());
				inputVer2File.setFileLocation(newFile.getFileDownloadUri());
				inputVer2File.setSize(newFile.getSize());
				invoiceVer2.setInputUpload(newFile.getFileDownloadUri());
				inputVer2File.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(inputVer2File);
			} else if (currentInputVer2.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}
	
	private void updatePaymentVer2File(InvoiceVer2 invoiceVer2, List<UploadFileResponse> newPaymentUploadFile) {
		User lastedUpdateUser = userRepository.findById(invoiceVer2.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentPaymentVer2Files = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("PaymentVer2", invoiceVer2.getId());
		List<String> currentPaymentVer2 = currentPaymentVer2Files.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newPaymentVer2String = newPaymentUploadFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload paymentVer2File : currentPaymentVer2Files) {
			if (!newPaymentVer2String.contains(paymentVer2File.getName())) {
				fileUploadRepository.delete(paymentVer2File);
			}
		}
		for (UploadFileResponse newFile : newPaymentUploadFile) {
			if (!currentPaymentVer2.contains(newFile.getFileDownloadUri())) {
				FileUpload paymentVer2File = new FileUpload();
				paymentVer2File.setCrmTableName("PaymentVer2");
				paymentVer2File.setCrmLinkId(invoiceVer2.getId());
				paymentVer2File.setName(newFile.getFileName());
				paymentVer2File.setFileLocation(newFile.getFileDownloadUri());
				paymentVer2File.setSize(newFile.getSize());
				invoiceVer2.setPaymentUpload(newFile.getFileDownloadUri());
				paymentVer2File.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(paymentVer2File);
			} else if (currentPaymentVer2.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	@DeleteMapping("/invoiceVer2/{id}")
	public RestResult deleteinvoiceVer2(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete invoiceVer2 with ID = " + id + "...");

		try {
			invoiceVer2Repository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete invoiceVer2.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/invoiceVer2/list")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = invoiceVer2Repository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/invoiceVer2/listAll")
	public RestResult listAll() {
		return new RestResult(invoiceVer2Repository.findAll());
	}
	@RequestMapping(value = "/invoiceVer2/findByProjectDetailId")
	public RestResult invoiceByProjectDetail(@RequestParam("projectDetailId") Long projectDetailId) {
		return new RestResult(invoiceVer2Repository.findByProjectDetailId(projectDetailId));
	}
}
