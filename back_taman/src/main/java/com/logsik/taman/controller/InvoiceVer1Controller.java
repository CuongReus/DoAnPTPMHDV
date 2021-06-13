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
import com.logsik.taman.domain.InvoiceVer1;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.InvoiceVer1Dto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.InvoiceVer1Repository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class InvoiceVer1Controller extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceVer1Controller.class);

	@Autowired
	private InvoiceVer1Repository invoiceVer1Repository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;
	
	@Autowired
	private UserRepository userRepository;

	@RequestMapping("invoiceVer1/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<InvoiceVer1> invoiceVer1 = invoiceVer1Repository.findById(id);
		List<FileUpload> paymentUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("PaymentVer1",
				invoiceVer1.get().getId());
		List<FileUpload> invoiceUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InvoiceVer1",
				invoiceVer1.get().getId());
		List<FileUpload> inputUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("InputVer1",
				invoiceVer1.get().getId());
		return new RestResult(dtoConverter.convertToInvoiceVer1Dto(invoiceVer1.get(), paymentUploadFile, invoiceUploadFile,inputUploadFile));
	}

	@RequestMapping(value = "/invoiceVer1/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody InvoiceVer1Dto invoiceVer1Dto) {
		checkAuthorization("admin.projectProgress.invoiceVer1C&U");
		try {
			InvoiceVer1 newInvoiceVer1 = dtoConverter.convertToInvoiceVer1(invoiceVer1Dto);
			 newInvoiceVer1 = invoiceVer1Repository.save(newInvoiceVer1);
			savePaymentInvoiceVer1File(newInvoiceVer1, invoiceVer1Dto.getPaymentUploadFile());
			saveInvoiceVer1File(newInvoiceVer1, invoiceVer1Dto.getInvoiceUploadFile());
			saveInputVer1File(newInvoiceVer1, invoiceVer1Dto.getInputUploadFile());
			boolean result = true;
			if(result) {
				return new RestResult(newInvoiceVer1);
			}else {
				return new RestResult(true, MESSAGE_CANNOT_SAVE);
			}
		} catch (Exception e) {
			LOGGER.error("Error when adding invoiceVer1.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void savePaymentInvoiceVer1File(InvoiceVer1 invoiceVer1, List<UploadFileResponse> paymentUploadFile) {
		User createdUser = userRepository.findById(invoiceVer1.getCreatedUserId()).get(); 
		for (UploadFileResponse file : paymentUploadFile) {
			FileUpload paymentVer1File = new FileUpload();
			paymentVer1File.setName(file.getFileName());
			paymentVer1File.setFileLocation(file.getFileDownloadUri());
			paymentVer1File.setSize(file.getSize());
			paymentVer1File.setCrmLinkId(invoiceVer1.getId());
			paymentVer1File.setCrmTableName("PaymentVer1");
			invoiceVer1.setPaymentUpload(file.getFileDownloadUri());
			paymentVer1File.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(paymentVer1File);
		}
	}

	private void saveInvoiceVer1File(InvoiceVer1 invoiceVer1, List<UploadFileResponse> invoiceUploadFile) {
		User createdUser = userRepository.findById(invoiceVer1.getCreatedUserId()).get(); 
		for (UploadFileResponse file : invoiceUploadFile) {
			FileUpload invoiceVer1File = new FileUpload();
			invoiceVer1File.setName(file.getFileName());
			invoiceVer1File.setFileLocation(file.getFileDownloadUri());
			invoiceVer1File.setSize(file.getSize());
			invoiceVer1File.setCrmLinkId(invoiceVer1.getId());
			invoiceVer1File.setCrmTableName("InvoiceVer1");
			invoiceVer1.setInvoiceUpload(file.getFileDownloadUri());
			invoiceVer1File.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(invoiceVer1File);
		}
	}
	
	private void saveInputVer1File(InvoiceVer1 invoiceVer1, List<UploadFileResponse> inputUploadFile) {
		User createdUser = userRepository.findById(invoiceVer1.getCreatedUserId()).get(); 
		for (UploadFileResponse file : inputUploadFile) {
			FileUpload inputInvoice = new FileUpload();
			inputInvoice.setName(file.getFileName());
			inputInvoice.setFileLocation(file.getFileDownloadUri());
			inputInvoice.setSize(file.getSize());
			inputInvoice.setCrmLinkId(invoiceVer1.getId());
			inputInvoice.setCrmTableName("InputVer1");
			invoiceVer1.setInputUpload(file.getFileDownloadUri());
			inputInvoice.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(inputInvoice);
		}
	}

	@RequestMapping(value = "/invoiceVer1/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody InvoiceVer1Dto invoiceVer1Dto) {
		checkAuthorization("admin.projectProgress.invoiceVer1C&U");
		try {
			InvoiceVer1 updatedInvoiceVer1 = invoiceVer1Repository
					.save(dtoConverter.convertToInvoiceVer1(invoiceVer1Dto));
			updatePaymentVer1File(updatedInvoiceVer1, invoiceVer1Dto.getPaymentUploadFile());
			updateInvoiceVer1File(updatedInvoiceVer1, invoiceVer1Dto.getInvoiceUploadFile());
			updateInputVer1File(updatedInvoiceVer1, invoiceVer1Dto.getInputUploadFile());
			boolean result = true;
			if(result) {
				return new RestResult(updatedInvoiceVer1);
			}else {
				return new RestResult(true, MESSAGE_CANNOT_SAVE);
			}
		} catch (Exception e) {
			LOGGER.error("Error when updating invoiceVer1.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updatePaymentVer1File(InvoiceVer1 invoiceVer1, List<UploadFileResponse> newPaymentVer1) {
		User lastedUpdateUser = userRepository.findById(invoiceVer1.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentPaymentVer1Files = fileUploadRepository.findByCrmTableNameAndCrmLinkId("PaymentVer1",
				invoiceVer1.getId());
		List<String> currentPaymentVer1 = currentPaymentVer1Files.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newPaymentVer1String = newPaymentVer1.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload paymentVer1File : currentPaymentVer1Files) {
			if (!newPaymentVer1String.contains(paymentVer1File.getName())) {
				fileUploadRepository.delete(paymentVer1File);
			}
		}
		for (UploadFileResponse newFile : newPaymentVer1) {
			if (!currentPaymentVer1.contains(newFile.getFileDownloadUri())) {
				FileUpload paymentVer1File = new FileUpload();
				paymentVer1File.setCrmTableName("PaymentVer1");
				paymentVer1File.setCrmLinkId(invoiceVer1.getId());
				paymentVer1File.setName(newFile.getFileName());
				paymentVer1File.setFileLocation(newFile.getFileDownloadUri());
				paymentVer1File.setSize(newFile.getSize());
				invoiceVer1.setPaymentUpload(newFile.getFileDownloadUri());
				paymentVer1File.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(paymentVer1File);
			} else if (currentPaymentVer1.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateInvoiceVer1File(InvoiceVer1 invoiceVer1, List<UploadFileResponse> newInvoiceVer1File) {
		User lastedUpdateUser = userRepository.findById(invoiceVer1.getLastedUpdateUserId()).get(); 
		
		List<FileUpload> currentInvoiceVer1Files = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("InvoiceVer1", invoiceVer1.getId());
		List<String> currentInvoiceVer1 = currentInvoiceVer1Files.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newInvoiceVer1String = newInvoiceVer1File.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload invoiceVer1File : currentInvoiceVer1Files) {
			if (!newInvoiceVer1String.contains(invoiceVer1File.getName())) {
				fileUploadRepository.delete(invoiceVer1File);
			}
		}
		for (UploadFileResponse newFile : newInvoiceVer1File) {
			if (!currentInvoiceVer1.contains(newFile.getFileDownloadUri())) {
				FileUpload invoiceVer1File = new FileUpload();
				invoiceVer1File.setCrmTableName("InvoiceVer1");
				invoiceVer1File.setCrmLinkId(invoiceVer1.getId());
				invoiceVer1File.setName(newFile.getFileName());
				invoiceVer1File.setFileLocation(newFile.getFileDownloadUri());
				invoiceVer1File.setSize(newFile.getSize());
				invoiceVer1.setInvoiceUpload(newFile.getFileDownloadUri());
				invoiceVer1File.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(invoiceVer1File);
			} else if (currentInvoiceVer1.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}
		}

	}
	private void updateInputVer1File(InvoiceVer1 invoiceVer1, List<UploadFileResponse> newInputVer1File) {
		User lastedUpdateUser = userRepository.findById(invoiceVer1.getLastedUpdateUserId()).get(); 
		
		List<FileUpload> currentInputVer1Files = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("InputVer1", invoiceVer1.getId());
		List<String> currentInputVer1 = currentInputVer1Files.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newInputVer1String = newInputVer1File.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload inputVer1File : currentInputVer1Files) {
			if (!newInputVer1String.contains(inputVer1File.getName())) {
				fileUploadRepository.delete(inputVer1File);
			}
		}
		for (UploadFileResponse newFile : newInputVer1File) {
			if (!currentInputVer1.contains(newFile.getFileDownloadUri())) {
				FileUpload inputInvoiceFile = new FileUpload();
				inputInvoiceFile.setCrmTableName("InputVer1");
				inputInvoiceFile.setCrmLinkId(invoiceVer1.getId());
				inputInvoiceFile.setName(newFile.getFileName());
				inputInvoiceFile.setFileLocation(newFile.getFileDownloadUri());
				inputInvoiceFile.setSize(newFile.getSize());
				invoiceVer1.setInputUpload(newFile.getFileDownloadUri());
				inputInvoiceFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(inputInvoiceFile);
			} else if (currentInputVer1.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	@DeleteMapping("/invoiceVer1/{id}")
	public RestResult deleteinvoiceVer1(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete invoiceVer1 with ID = " + id + "...");

		try {
			invoiceVer1Repository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete invoiceVer1.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/invoiceVer1/list")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = invoiceVer1Repository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/invoiceVer1/listAll")
	public RestResult listAll() {
		return new RestResult(invoiceVer1Repository.findAll());
	}
	
	@RequestMapping(value = "/invoiceVer1/findByProjectDetailId")
	public RestResult invoiceByProjectDetail(@RequestParam("projectDetailId") Long projectDetailId) {
		return new RestResult(invoiceVer1Repository.findByProjectDetailId(projectDetailId));
	}
	
	
}
