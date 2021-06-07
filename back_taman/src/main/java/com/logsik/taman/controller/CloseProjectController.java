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

import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.CloseProjectDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.enums.ProjectCostStatus;
import com.logsik.taman.repository.CloseProjectRepository;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.ProjectDetailRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.ProjectCostService;
import com.logsik.taman.service.impl.TotalRevenueService;

@RestController
@RequestMapping("/api")
public class CloseProjectController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(CloseProjectController.class);

	@Autowired
	private CloseProjectRepository closeProjectRepository;
	
	@Autowired
	private ProjectCostService projectCostService;
	
	@Autowired
	private TotalRevenueService totalRevenueService;
	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;
	@Autowired
	private UserRepository userRepository;

	@RequestMapping("closeProject/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<CloseProject> closeProject = closeProjectRepository.findById(id);
		List<FileUpload> closeWorkDoneUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("CloseWorkDone",
				closeProject.get().getId());
		List<FileUpload> incurredUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("CloseProjectIncurred",
				closeProject.get().getId());
		return new RestResult(dtoConverter.convertToCloseProjectDto(closeProject.get(), closeWorkDoneUploadFile, incurredUploadFile));
	}

	@RequestMapping(value = "/closeProject/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody CloseProjectDto closeProjectDto) {
		checkAuthorization("admin.projectProgress.closeProjectC&U");
		try {
			CloseProject newCloseProject = dtoConverter.convertToCloseProject(closeProjectDto);
			
			 newCloseProject = closeProjectRepository.save(newCloseProject);
//			Set totalWorkDoneMoney after CloseProject New Object already Save
			 projectCostService.setTotalWorkDoneMoney(newCloseProject);
			saveNewCloseWorkDoneFile(newCloseProject, closeProjectDto.getCloseWorkDoneUploadFile());
			saveNewCloseProjectIncurredFile(newCloseProject, closeProjectDto.getIncurredUploadFile());
			return new RestResult(newCloseProject);
		} catch (Exception e) {
			LOGGER.error("Error when adding closeProject.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void saveNewCloseWorkDoneFile(CloseProject closeProject, List<UploadFileResponse> closeWorkDoneUploadFile) {
		User createdUser = userRepository.findById(closeProject.getCreatedUserId()).get(); 
		for (UploadFileResponse file : closeWorkDoneUploadFile) {
			FileUpload workDoneFile = new FileUpload();
			workDoneFile.setName(file.getFileName());
			workDoneFile.setFileLocation(file.getFileDownloadUri());
			workDoneFile.setSize(file.getSize());
			workDoneFile.setCrmLinkId(closeProject.getId());
			workDoneFile.setCrmTableName("CloseWorkDone");
			closeProject.setCloseWorkDoneUpload(file.getFileDownloadUri());
			workDoneFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(workDoneFile);
		}
	}

	private void saveNewCloseProjectIncurredFile(CloseProject closeProject, List<UploadFileResponse> incurredUploadFile) {
		User createdUser = userRepository.findById(closeProject.getCreatedUserId()).get(); 
		for (UploadFileResponse file : incurredUploadFile) {
			FileUpload closeProjectIncurredFile = new FileUpload();
			closeProjectIncurredFile.setName(file.getFileName());
			closeProjectIncurredFile.setFileLocation(file.getFileDownloadUri());
			closeProjectIncurredFile.setSize(file.getSize());
			closeProjectIncurredFile.setCrmLinkId(closeProject.getId());
			closeProjectIncurredFile.setCrmTableName("CloseProjectIncurred");
			closeProject.setIncurredUpload(file.getFileDownloadUri());
			closeProjectIncurredFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(closeProjectIncurredFile);
		}
	}

	@RequestMapping(value = "/closeProject/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody CloseProjectDto closeProjectDto) {
		checkAuthorization("admin.projectProgress.closeProjectC&U");
		try {
			CloseProject updatedCloseProject = dtoConverter.convertToCloseProject(closeProjectDto);
			
			 updatedCloseProject = closeProjectRepository
					.save(dtoConverter.convertToCloseProject(closeProjectDto));
//				Set totalWorkDoneMoney after CloseProject New Object already Save
			 projectCostService.setTotalWorkDoneMoney(updatedCloseProject);
			updateCloseWorkDone(updatedCloseProject, closeProjectDto.getCloseWorkDoneUploadFile());
			updateCloseProjectIncurred(updatedCloseProject, closeProjectDto.getIncurredUploadFile());
			return new RestResult(updatedCloseProject);
		} catch (Exception e) {
			LOGGER.error("Error when updating closeProject.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updateCloseWorkDone(CloseProject closeProject, List<UploadFileResponse> newCloseWorkDone) {
		User lastedUpdateUser = userRepository.findById(closeProject.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentCloseWorkDoneFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("CloseWorkDone",
				closeProject.getId());
		List<String> currentCloseWorkDoneFile = currentCloseWorkDoneFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newWorkDoneString = newCloseWorkDone.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload closeProjectWorkDoneFile : currentCloseWorkDoneFiles) {
			if (!newWorkDoneString.contains(closeProjectWorkDoneFile.getName())) {
				fileUploadRepository.delete(closeProjectWorkDoneFile);
			}
		}
		for (UploadFileResponse newFile : newCloseWorkDone) {
			if (!currentCloseWorkDoneFile.contains(newFile.getFileDownloadUri())) {
				FileUpload workDoneFile = new FileUpload();
				workDoneFile.setCrmTableName("CloseWorkDone");
				workDoneFile.setCrmLinkId(closeProject.getId());
				workDoneFile.setName(newFile.getFileName());
				workDoneFile.setFileLocation(newFile.getFileDownloadUri());
				workDoneFile.setSize(newFile.getSize());
				closeProject.setCloseWorkDoneUpload(newFile.getFileDownloadUri());
				workDoneFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(workDoneFile);
			} else if (currentCloseWorkDoneFile.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateCloseProjectIncurred(CloseProject closeProject, List<UploadFileResponse> newCloseProjectIncurred) {
		User lastedUpdateUser = userRepository.findById(closeProject.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentCloseProjectIncurredFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("CloseProjectIncurred", closeProject.getId());
		List<String> currentCloseProjectIncurred = currentCloseProjectIncurredFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newIncurredString = newCloseProjectIncurred.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload closeProjectIncurredFile : currentCloseProjectIncurredFiles) {
			if (!newIncurredString.contains(closeProjectIncurredFile.getName())) {
				fileUploadRepository.delete(closeProjectIncurredFile);
			}
		}
		for (UploadFileResponse newFile : newCloseProjectIncurred) {
			if (!currentCloseProjectIncurred.contains(newFile.getFileDownloadUri())) {
				FileUpload closeProjectIncurredFile = new FileUpload();
				closeProjectIncurredFile.setCrmTableName("CloseProjectIncurred");
				closeProjectIncurredFile.setCrmLinkId(closeProject.getId());
				closeProjectIncurredFile.setName(newFile.getFileName());
				closeProjectIncurredFile.setFileLocation(newFile.getFileDownloadUri());
				closeProjectIncurredFile.setSize(newFile.getSize());
				closeProject.setIncurredUpload(newFile.getFileDownloadUri());
				closeProjectIncurredFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(closeProjectIncurredFile);
			} else if (currentCloseProjectIncurred.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	@DeleteMapping("/closeProject/{id}")
	public RestResult deletecloseProject(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete closeProject with ID = " + id + "...");

		try {
			Optional<CloseProject> source = closeProjectRepository.findById(id);
			if(source!=null) {
			totalRevenueService.removeCloseProject(source.get().getProjectDetail().getProject().getProjectYear(),
					source.get().getProjectDetail().getProject(),source.get().getProjectDetail(),source.get()	);
			closeProjectRepository.deleteById(id);
			}
		} catch (Exception e) {
			LOGGER.error("Error when delete closeProject.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/closeProject/list")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = closeProjectRepository.findAll(pageable);
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/closeProject/findByProjectDetailId")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult findByProjectDetailId(@RequestParam("projectDetailId") Long projectDetailId, Pageable pageable) {
		Object result;
		result = closeProjectRepository.findByProjectDetailId(projectDetailId);
		return new RestResult(result);
	}

	@RequestMapping(value = "/closeProject/listAll")
	public RestResult listAll() {
		return new RestResult(closeProjectRepository.findAll());
	}
	
	
	@RequestMapping(value = "/closeProject/findByProjectDetail_ProjectId")
	public RestResult objectProjectPayment(@RequestParam("projectId") Long projectId) {
		return new RestResult(closeProjectRepository.findByProjectDetailProjectId(projectId));
	}
}
