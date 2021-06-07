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

import com.logsik.taman.domain.Approval;
import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.ApprovalDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.ApprovalRepository;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.ProjectDetailRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.TotalRevenueService;

@RestController
@RequestMapping("/api")
public class ApprovalController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ApprovalController.class);

	@Autowired
	private ApprovalRepository approvalRepository;
	@Autowired
	private ProjectDetailRepository projectDetailRepository;
	@Autowired
	private TotalRevenueService totalRevenueService;
	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FileUploadRepository fileUploadRepository;

	@RequestMapping("approval/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<Approval> approval = approvalRepository.findById(id);
		List<FileUpload> approvalUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Approval",
				approval.get().getId());
		return new RestResult(dtoConverter.convertToApprovalDto(approval.get(), approvalUploadFile));
	}

	@RequestMapping(value = "/approval/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ApprovalDto approvalDto) {
		checkAuthorization("admin.projectProgress.approvalC&U");
		try {
			Approval newApproval = dtoConverter.convertToApproval(approvalDto);
			Optional<ProjectDetail> projectDetail = projectDetailRepository.findById(approvalDto.getProjectDetailId());
			totalRevenueService.addAndUpdateApprovalValueAndSetRevenue(newApproval, projectDetail.get());
			newApproval = approvalRepository.save(newApproval);

			saveNewApprovalFile(newApproval, approvalDto.getApprovalUploadFile());
			return new RestResult(newApproval);
		} catch (Exception e) {
			LOGGER.error("Error when adding approval.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void saveNewApprovalFile(Approval approval, List<UploadFileResponse> approvalUploadFile) {
		User createdUser = userRepository.findById(approval.getCreatedUserId()).get(); 
		for (UploadFileResponse file : approvalUploadFile) {
			FileUpload approvalFile = new FileUpload();
			approvalFile.setName(file.getFileName());
			approvalFile.setFileLocation(file.getFileDownloadUri());
			approvalFile.setSize(file.getSize());
			approvalFile.setCrmLinkId(approval.getId());
			approvalFile.setCrmTableName("Approval");
			approvalFile.setUploadBy(createdUser.getEmail());
			approval.setApprovalUpload(file.getFileDownloadUri());
			fileUploadRepository.save(approvalFile);
		}
	}

	@RequestMapping(value = "/approval/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ApprovalDto approvalDto) {
		checkAuthorization("admin.projectProgress.approvalC&U");
		try {
			Approval updatedApproval = approvalRepository.save(dtoConverter.convertToApproval(approvalDto));
			Optional<ProjectDetail> projectDetail = projectDetailRepository.findById(approvalDto.getProjectDetailId());
			totalRevenueService.addAndUpdateApprovalValueAndSetRevenue(updatedApproval, projectDetail.get());
			updateApproval(updatedApproval, approvalDto.getApprovalUploadFile());
			return new RestResult(updatedApproval);
		} catch (Exception e) {
			LOGGER.error("Error when updating approval.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updateApproval(Approval approval, List<UploadFileResponse> newApproval) {
		User lastedUpdateUser = userRepository.findById(approval.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentApprovalFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Approval",
				approval.getId());
		List<String> currentApproval = currentApprovalFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newApprovalString = newApproval.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload approvalFile : currentApprovalFiles) {
			if (!newApprovalString.contains(approvalFile.getName())) {
				fileUploadRepository.delete(approvalFile);
			}
		}
		for (UploadFileResponse newFile : newApproval) {
			if (!currentApproval.contains(newFile.getFileDownloadUri())) {
				FileUpload approvalFile = new FileUpload();
				approvalFile.setCrmTableName("Approval");
				approvalFile.setCrmLinkId(approval.getId());
				approvalFile.setName(newFile.getFileName());
				approvalFile.setFileLocation(newFile.getFileDownloadUri());
				approvalFile.setSize(newFile.getSize());
				approval.setApprovalUpload(newFile.getFileDownloadUri());
				approvalFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(approvalFile);
			} else if (currentApproval.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	@DeleteMapping("/approval/{id}")
	public RestResult deleteapproval(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete approval with ID = " + id + "...");

		try {
			approvalRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete approval.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/approval/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = approvalRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/approval/listAll")
	public RestResult listAll() {
		return new RestResult(approvalRepository.findAll());
	}
}
