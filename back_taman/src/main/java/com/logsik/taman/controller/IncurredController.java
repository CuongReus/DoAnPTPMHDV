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
import com.logsik.taman.domain.Incurred;
import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.IncurredDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.IncurredRepository;
import com.logsik.taman.repository.ProjectDetailRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.TotalRevenueService;

@RestController
@RequestMapping("/api")
public class IncurredController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(IncurredController.class);

	@Autowired
	private IncurredRepository incurredRepository;
	@Autowired
	private ProjectDetailRepository projectDetailRepository;
	@Autowired
	private TotalRevenueService totalRevenueService;
	@Autowired
	private DtoConverter dtoConverter;
	@Autowired
	private FileUploadRepository fileUploadRepository;
	@Autowired
	private UserRepository userRepository;
	@RequestMapping("incurred/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<Incurred> incurred = incurredRepository.findById(id);
		List<FileUpload> quotationUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Incurred_Quotation",
				incurred.get().getId());
		List<FileUpload> approvalUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Incurred_Approval",
				incurred.get().getId());
		List<FileUpload> invoiceIncurredUploadFile = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("Incurred_Invoice", incurred.get().getId());
		List<FileUpload> appendixUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Incurred_Appendix",
				incurred.get().getId());
		List<FileUpload> defectUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Incurred_Defect",
				incurred.get().getId());
		List<FileUpload> inputUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Incurred_InputInvoice",
				incurred.get().getId());
		List<FileUpload> workUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Incurred_WorkUpload",
				incurred.get().getId());
		return new RestResult(dtoConverter.convertToIncurredDto(incurred.get(), quotationUploadFile, approvalUploadFile,
				invoiceIncurredUploadFile, appendixUploadFile, defectUploadFile, inputUploadFile, workUploadFile));
	}
//	Start Add Function
	@RequestMapping(value = "/incurred/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody IncurredDto incurredDto) {
		checkAuthorization("admin.projectProgress.incurredC&U");
		try {
			Incurred newIncurred = dtoConverter.convertToIncurred(incurredDto);
			
			Optional<ProjectDetail> projectDetail = projectDetailRepository.findById(newIncurred.getProjectDetailId());
			totalRevenueService.addAndUpdateIncurredValueAndSetRevenue(newIncurred, projectDetail.get());
			newIncurred = incurredRepository.save(newIncurred);
//			CloseProject closeProjectByProjectDetailId = closeProjectRepository
//					.findByProjectDetailId(incurred.getProjectDetail().getId());
//			if (closeProjectByProjectDetailId != null) {
//				totalRevenueService.addAndUpdateIncurredApprovalValueForCP(closeProjectByProjectDetailId, incurred);
//			}
			saveNewQuotationFile(newIncurred, incurredDto.getQuotationUploadFile());
			saveNewApprovalFile(newIncurred, incurredDto.getApprovalUploadFile());
			saveNewInvoiceIncurredFile(newIncurred, incurredDto.getInvoiceIncurredUploadFile());
			saveNewAppendixFile(newIncurred, incurredDto.getAppendixUploadFile());
			saveNewDefectFile(newIncurred, incurredDto.getDefectUploadFile());
			saveNewInputFile(newIncurred, incurredDto.getInputUploadFile());
			saveNewWorkFile(newIncurred, incurredDto.getWorkUploadFile());
			return new RestResult(newIncurred);
		} catch (Exception e) {
			LOGGER.error("Error when adding incurred.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	private void saveNewQuotationFile(Incurred incurred, List<UploadFileResponse> quotationUploadFile) {
		User createdUser = userRepository.findById(incurred.getCreatedUserId()).get(); 
		
		for (UploadFileResponse file : quotationUploadFile) {
			FileUpload quotationFile = new FileUpload();
			quotationFile.setName(file.getFileName());
			quotationFile.setFileLocation(file.getFileDownloadUri());
			quotationFile.setSize(file.getSize());
			quotationFile.setCrmLinkId(incurred.getId());
			quotationFile.setCrmTableName("Incurred_Quotation");
			incurred.setQuotationUpload(file.getFileDownloadUri());
			quotationFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(quotationFile);
		}
	}
	private void saveNewApprovalFile(Incurred incurred, List<UploadFileResponse> approvalUploadFile) {
		User createdUser = userRepository.findById(incurred.getCreatedUserId()).get(); 
		for (UploadFileResponse file : approvalUploadFile) {
			FileUpload approvalFile = new FileUpload();
			approvalFile.setName(file.getFileName());
			approvalFile.setFileLocation(file.getFileDownloadUri());
			approvalFile.setSize(file.getSize());
			approvalFile.setCrmLinkId(incurred.getId());
			approvalFile.setCrmTableName("Incurred_Approval");
			incurred.setApprovalUpload(file.getFileDownloadUri());
			approvalFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(approvalFile);
		}
	}
	private void saveNewInvoiceIncurredFile(Incurred incurred, List<UploadFileResponse> invoiceIncurredUploadFile) {
		User createdUser = userRepository.findById(incurred.getCreatedUserId()).get(); 
		for (UploadFileResponse file : invoiceIncurredUploadFile) {
			FileUpload incurredFile = new FileUpload();
			incurredFile.setName(file.getFileName());
			incurredFile.setFileLocation(file.getFileDownloadUri());
			incurredFile.setSize(file.getSize());
			incurredFile.setCrmLinkId(incurred.getId());
			incurredFile.setCrmTableName("Incurred_Invoice");
			incurred.setInvoiceIncurredUpload(file.getFileDownloadUri());
			incurredFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(incurredFile);
		}
	}

	private void saveNewAppendixFile(Incurred incurred, List<UploadFileResponse> appendixUploadFile) {
		User createdUser = userRepository.findById(incurred.getCreatedUserId()).get(); 
		for (UploadFileResponse file : appendixUploadFile) {
			FileUpload appendixFile = new FileUpload();
			appendixFile.setName(file.getFileName());
			appendixFile.setFileLocation(file.getFileDownloadUri());
			appendixFile.setSize(file.getSize());
			appendixFile.setCrmLinkId(incurred.getId());
			appendixFile.setCrmTableName("Incurred_Appendix");
			incurred.setAppendixUpload(file.getFileDownloadUri());
			appendixFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(appendixFile);
		}
	}
	private void saveNewDefectFile(Incurred incurred, List<UploadFileResponse> defectUploadFile) {
		User createdUser = userRepository.findById(incurred.getCreatedUserId()).get(); 
		for (UploadFileResponse file : defectUploadFile) {
			FileUpload defectFile = new FileUpload();
			defectFile.setName(file.getFileName());
			defectFile.setFileLocation(file.getFileDownloadUri());
			defectFile.setSize(file.getSize());
			defectFile.setCrmLinkId(incurred.getId());
			defectFile.setCrmTableName("Incurred_Defect");
			incurred.setDefectUpload(file.getFileDownloadUri());
			defectFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(defectFile);
		}
	}
	private void saveNewInputFile(Incurred incurred, List<UploadFileResponse> inputUploadFile) {
		User createdUser = userRepository.findById(incurred.getCreatedUserId()).get(); 
		for (UploadFileResponse file : inputUploadFile) {
			FileUpload inputInvoiceIncurred = new FileUpload();
			inputInvoiceIncurred.setName(file.getFileName());
			inputInvoiceIncurred.setFileLocation(file.getFileDownloadUri());
			inputInvoiceIncurred.setSize(file.getSize());
			inputInvoiceIncurred.setCrmLinkId(incurred.getId());
			inputInvoiceIncurred.setCrmTableName("Incurred_InputInvoice");
			incurred.setInputUpload(file.getFileDownloadUri());
			inputInvoiceIncurred.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(inputInvoiceIncurred);
		}
	}
	private void saveNewWorkFile(Incurred incurred, List<UploadFileResponse> workUploadFile) {
		User createdUser = userRepository.findById(incurred.getCreatedUserId()).get(); 
		for (UploadFileResponse file : workUploadFile) {
			FileUpload workFile = new FileUpload();
			workFile.setName(file.getFileName());
			workFile.setFileLocation(file.getFileDownloadUri());
			workFile.setSize(file.getSize());
			workFile.setCrmLinkId(incurred.getId());
			workFile.setCrmTableName("Incurred_WorkUpload");
			incurred.setWorkUpload(file.getFileDownloadUri());
			workFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(workFile);
		}
	}
//	End Add Function
	@RequestMapping(value = "/incurred/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody IncurredDto incurredDto) {
		checkAuthorization("admin.projectProgress.incurredC&U");
		try {
			
			Incurred updatedIncurred = incurredRepository.save(dtoConverter.convertToIncurred(incurredDto));
			Optional<ProjectDetail> projectDetail = projectDetailRepository.findById(updatedIncurred.getProjectDetailId());
			totalRevenueService.addAndUpdateIncurredValueAndSetRevenue(updatedIncurred, projectDetail.get());
			updateQuotationFile(updatedIncurred, incurredDto.getQuotationUploadFile());
			updateApprovalFile(updatedIncurred, incurredDto.getApprovalUploadFile());
			updateInvoiceIncurredFile(updatedIncurred, incurredDto.getInvoiceIncurredUploadFile());
			updateAppendixFile(updatedIncurred, incurredDto.getAppendixUploadFile());
			updateDefectFile(updatedIncurred, incurredDto.getDefectUploadFile());
			updateInputFile(updatedIncurred, incurredDto.getInputUploadFile());
			updateWorkFile(updatedIncurred, incurredDto.getWorkUploadFile());
			return new RestResult(updatedIncurred);
		} catch (Exception e) {
			LOGGER.error("Error when updating incurred.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updateQuotationFile(Incurred incurred, List<UploadFileResponse> newQuotationUploadFile) {
		User lastedUpdateUser = userRepository.findById(incurred.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentQuotationFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("Incurred_Quotation", incurred.getId());
		List<String> currentQuotation = currentQuotationFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newQuotationString = newQuotationUploadFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload incurredFile : currentQuotationFiles) {
			if (!newQuotationString.contains(incurredFile.getName())) {
				fileUploadRepository.delete(incurredFile);
			}
		}
		for (UploadFileResponse newFile : newQuotationUploadFile) {
			if (!currentQuotation.contains(newFile.getFileDownloadUri())) {
				FileUpload quotationFile = new FileUpload();
				quotationFile.setCrmTableName("Incurred_Quotation");
				quotationFile.setCrmLinkId(incurred.getId());
				quotationFile.setName(newFile.getFileName());
				quotationFile.setFileLocation(newFile.getFileDownloadUri());
				quotationFile.setSize(newFile.getSize());
				incurred.setQuotationUpload(newFile.getFileDownloadUri());
				quotationFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(quotationFile);
			} else if (currentQuotation.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateApprovalFile(Incurred incurred, List<UploadFileResponse> newApprovalUploadFile) {
		User lastedUpdateUser = userRepository.findById(incurred.getLastedUpdateUserId()).get(); 
		
		List<FileUpload> currentApprovalFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Incurred_Approval",
				incurred.getId());
		List<String> currentApproval = currentApprovalFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newApprovalString = newApprovalUploadFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload approvalFile : currentApprovalFiles) {
			if (!newApprovalString.contains(approvalFile.getName())) {
				fileUploadRepository.delete(approvalFile);
			}
		}
		for (UploadFileResponse newFile : newApprovalUploadFile) {
			if (!currentApproval.contains(newFile.getFileDownloadUri())) {
				FileUpload approvalFile = new FileUpload();
				approvalFile.setCrmTableName("Incurred_Approval");
				approvalFile.setCrmLinkId(incurred.getId());
				approvalFile.setName(newFile.getFileName());
				approvalFile.setFileLocation(newFile.getFileDownloadUri());
				approvalFile.setSize(newFile.getSize());
				incurred.setApprovalUpload(newFile.getFileDownloadUri());
				approvalFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(approvalFile);
			} else if (currentApproval.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateInvoiceIncurredFile(Incurred incurred, List<UploadFileResponse> newInvoiceIncurredUploadFile) {
		User lastedUpdateUser = userRepository.findById(incurred.getLastedUpdateUserId()).get(); 
		
		List<FileUpload> currentInvoiceIncurredFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("Incurred_Invoice", incurred.getId());
		List<String> currentInvoiceIncurred = currentInvoiceIncurredFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newnInvoicIncurredString = newInvoiceIncurredUploadFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload invoiceIncurredFile : currentInvoiceIncurredFiles) {
			if (!newnInvoicIncurredString.contains(invoiceIncurredFile.getName())) {
				fileUploadRepository.delete(invoiceIncurredFile);
			}
		}
		for (UploadFileResponse newFile : newInvoiceIncurredUploadFile) {
			if (!currentInvoiceIncurred.contains(newFile.getFileDownloadUri())) {
				FileUpload invoiceIncurredFile = new FileUpload();
				invoiceIncurredFile.setCrmTableName("Incurred_Invoice");
				invoiceIncurredFile.setCrmLinkId(incurred.getId());
				invoiceIncurredFile.setName(newFile.getFileName());
				invoiceIncurredFile.setFileLocation(newFile.getFileDownloadUri());
				invoiceIncurredFile.setSize(newFile.getSize());
				incurred.setInvoiceIncurredUpload(newFile.getFileDownloadUri());
				invoiceIncurredFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(invoiceIncurredFile);
			} else if (currentInvoiceIncurred.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateAppendixFile(Incurred incurred, List<UploadFileResponse> newAppendixUploadFile) {
		User lastedUpdateUser = userRepository.findById(incurred.getLastedUpdateUserId()).get(); 
		
		List<FileUpload> currentAppendixFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Incurred_Appendix",
				incurred.getId());
		List<String> currentAppendix = currentAppendixFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newnAppendixString = newAppendixUploadFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload appendixFile : currentAppendixFiles) {
			if (!newnAppendixString.contains(appendixFile.getName())) {
				fileUploadRepository.delete(appendixFile);
			}
		}
		for (UploadFileResponse newFile : newAppendixUploadFile) {
			if (!currentAppendix.contains(newFile.getFileDownloadUri())) {
				FileUpload appendixFile = new FileUpload();
				appendixFile.setCrmTableName("Incurred_Appendix");
				appendixFile.setCrmLinkId(incurred.getId());
				appendixFile.setName(newFile.getFileName());
				appendixFile.setFileLocation(newFile.getFileDownloadUri());
				appendixFile.setSize(newFile.getSize());
				incurred.setAppendixUpload(newFile.getFileDownloadUri());
				appendixFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(appendixFile);
			} else if (currentAppendix.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateDefectFile(Incurred incurred, List<UploadFileResponse> newDefectUploadFile) {
		User lastedUpdateUser = userRepository.findById(incurred.getLastedUpdateUserId()).get(); 
		
		List<FileUpload> currentDefectFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Incurred_Defect",
				incurred.getId());
		List<String> currentDefect = currentDefectFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newDefectString = newDefectUploadFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload DefectFile : currentDefectFiles) {
			if (!newDefectString.contains(DefectFile.getName())) {
				fileUploadRepository.delete(DefectFile);
			}
		}
		for (UploadFileResponse newFile : newDefectUploadFile) {
			if (!currentDefect.contains(newFile.getFileDownloadUri())) {
				FileUpload defectFile = new FileUpload();
				defectFile.setCrmTableName("Incurred_Defect");
				defectFile.setCrmLinkId(incurred.getId());
				defectFile.setName(newFile.getFileName());
				defectFile.setFileLocation(newFile.getFileDownloadUri());
				defectFile.setSize(newFile.getSize());
				incurred.setDefectUpload(newFile.getFileDownloadUri());
				defectFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(defectFile);
			} else if (currentDefect.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateInputFile(Incurred incurred, List<UploadFileResponse> newInputUploadFile) {
		User lastedUpdateUser = userRepository.findById(incurred.getLastedUpdateUserId()).get(); 
		
		List<FileUpload> currentInputInvoiceFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("Incurred_InputInvoice", incurred.getId());
		List<String> currentInputInvoice = currentInputInvoiceFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newInputString = newInputUploadFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload InputInvoiceFile : currentInputInvoiceFiles) {
			if (!newInputString.contains(InputInvoiceFile.getName())) {
				fileUploadRepository.delete(InputInvoiceFile);
			}
		}
		for (UploadFileResponse newFile : newInputUploadFile) {
			if (!currentInputInvoice.contains(newFile.getFileDownloadUri())) {
				FileUpload inputInvoiceFile = new FileUpload();
				inputInvoiceFile.setCrmTableName("Incurred_InputInvoice");
				inputInvoiceFile.setCrmLinkId(incurred.getId());
				inputInvoiceFile.setName(newFile.getFileName());
				inputInvoiceFile.setFileLocation(newFile.getFileDownloadUri());
				inputInvoiceFile.setSize(newFile.getSize());
				incurred.setInputUpload(newFile.getFileDownloadUri());
				inputInvoiceFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(inputInvoiceFile);
			} else if (currentInputInvoice.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateWorkFile(Incurred incurred, List<UploadFileResponse> newWorkUploadFile) {
		User lastedUpdateUser = userRepository.findById(incurred.getLastedUpdateUserId()).get(); 
		
		List<FileUpload> currentWorkUploadFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("Incurred_WorkUpload", incurred.getId());
		List<String> currentWorkUpload = currentWorkUploadFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newWorkUploadString = newWorkUploadFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload incurredWorkUploadFile : currentWorkUploadFiles) {
			if (!newWorkUploadString.contains(incurredWorkUploadFile.getName())) {
				fileUploadRepository.delete(incurredWorkUploadFile);
			}
		}
		for (UploadFileResponse newFile : newWorkUploadFile) {
			if (!currentWorkUpload.contains(newFile.getFileDownloadUri())) {
				FileUpload workUploadFile = new FileUpload();
				workUploadFile.setCrmTableName("Incurred_WorkUpload");
				workUploadFile.setCrmLinkId(incurred.getId());
				workUploadFile.setName(newFile.getFileName());
				workUploadFile.setFileLocation(newFile.getFileDownloadUri());
				workUploadFile.setSize(newFile.getSize());
				incurred.setDefectUpload(newFile.getFileDownloadUri());
				workUploadFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(workUploadFile);
			} else if (currentWorkUpload.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	@DeleteMapping("/incurred/{id}")
	public RestResult deleteincurred(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete incurred with ID = " + id + "...");

		try {
			incurredRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete incurred.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/incurred/list")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = incurredRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/incurred/listAll")
	public RestResult listAll() {
		return new RestResult(incurredRepository.findAll());
	}
}
