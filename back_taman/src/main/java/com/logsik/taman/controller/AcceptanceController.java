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

import com.logsik.taman.domain.Acceptance;
import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.AcceptanceDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.AcceptanceRepository;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class AcceptanceController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(AcceptanceController.class);

	@Autowired
	private AcceptanceRepository acceptanceRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;
	@Autowired
	private UserRepository userRepository;

	@RequestMapping("acceptance/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<Acceptance> acceptance = acceptanceRepository.findById(id);
		List<FileUpload> acceptanceUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Acceptance",
				acceptance.get().getId());
		List<FileUpload> defectUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("AcceptanceDefect",
				acceptance.get().getId());
		List<FileUpload> overcomeUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Overcome",
				acceptance.get().getId());
		return new RestResult(dtoConverter.convertToAcceptanceDto(acceptance.get(), acceptanceUploadFile, defectUploadFile,overcomeUploadFile));
	}

	@RequestMapping(value = "/acceptance/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody AcceptanceDto acceptanceDto) {
		checkAuthorization("admin.projectProgress.acceptanceC&U");
		try {
			Acceptance newAcceptance = dtoConverter.convertToAcceptance(acceptanceDto);
			 newAcceptance = acceptanceRepository.save(newAcceptance);
			saveNewAcceptanceFile(newAcceptance, acceptanceDto.getAcceptanceUploadFile());
			saveNewAcceptanceDefectFile(newAcceptance, acceptanceDto.getDefectUploadFile());
			saveNewOvercomeFile(newAcceptance, acceptanceDto.getOvercomeUploadFile());
			return new RestResult(newAcceptance);
		} catch (Exception e) {
			LOGGER.error("Error when adding acceptance.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void saveNewAcceptanceFile(Acceptance acceptance, List<UploadFileResponse> acceptanceUploadFile) {
		User createdUser = userRepository.findById(acceptance.getCreatedUserId()).get(); 
		for (UploadFileResponse file : acceptanceUploadFile) {
			FileUpload acceptanceFile = new FileUpload();
			acceptanceFile.setName(file.getFileName());
			acceptanceFile.setFileLocation(file.getFileDownloadUri());
			acceptanceFile.setSize(file.getSize());
			acceptanceFile.setCrmLinkId(acceptance.getId());
			acceptanceFile.setCrmTableName("Acceptance");
			acceptance.setAcceptanceUpload(file.getFileDownloadUri());
			acceptanceFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(acceptanceFile);
		}
	}

	private void saveNewAcceptanceDefectFile(Acceptance acceptance, List<UploadFileResponse> defectUploadFile) {
		User createdUser = userRepository.findById(acceptance.getCreatedUserId()).get(); 
		for (UploadFileResponse file : defectUploadFile) {
			FileUpload acceptanceDefectFile = new FileUpload();
			acceptanceDefectFile.setName(file.getFileName());
			acceptanceDefectFile.setFileLocation(file.getFileDownloadUri());
			acceptanceDefectFile.setSize(file.getSize());
			acceptanceDefectFile.setCrmLinkId(acceptance.getId());
			acceptanceDefectFile.setCrmTableName("AcceptanceDefect");
			acceptance.setAcceptanceUpload(file.getFileDownloadUri());
			acceptanceDefectFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(acceptanceDefectFile);
		}
	}
	
	private void saveNewOvercomeFile(Acceptance acceptance, List<UploadFileResponse> overcomeUploadFile) {
		User createdUser = userRepository.findById(acceptance.getCreatedUserId()).get(); 
		for (UploadFileResponse file : overcomeUploadFile) {
			FileUpload overcome = new FileUpload();
			overcome.setName(file.getFileName());
			overcome.setFileLocation(file.getFileDownloadUri());
			overcome.setSize(file.getSize());
			overcome.setCrmLinkId(acceptance.getId());
			overcome.setCrmTableName("Overcome");
			acceptance.setOvercomeUpload(file.getFileDownloadUri());
			overcome.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(overcome);
		}
	}

	@RequestMapping(value = "/acceptance/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody AcceptanceDto acceptanceDto) {
		checkAuthorization("admin.projectProgress.acceptanceC&U");
		try {
			Acceptance updatedAcceptance = acceptanceRepository
					.save(dtoConverter.convertToAcceptance(acceptanceDto));
			updateAcceptance(updatedAcceptance, acceptanceDto.getAcceptanceUploadFile());
			updateAcceptanceDefect(updatedAcceptance, acceptanceDto.getDefectUploadFile());
			updateOvercome(updatedAcceptance, acceptanceDto.getOvercomeUploadFile());
			return new RestResult(updatedAcceptance);
		} catch (Exception e) {
			LOGGER.error("Error when updating acceptance.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updateAcceptance(Acceptance acceptance, List<UploadFileResponse> newAcceptance) {
		User lastedUpdateUser = userRepository.findById(acceptance.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentAcceptanceFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Acceptance",
				acceptance.getId());
		List<String> currentAcceptance = currentAcceptanceFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newAcceptanceString = newAcceptance.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload acceptanceFile : currentAcceptanceFiles) {
			if (!newAcceptanceString.contains(acceptanceFile.getName())) {
				fileUploadRepository.delete(acceptanceFile);
			}
		}
		for (UploadFileResponse newFile : newAcceptance) {
			if (!currentAcceptance.contains(newFile.getFileDownloadUri())) {
				FileUpload acceptanceFile = new FileUpload();
				acceptanceFile.setCrmTableName("Acceptance");
				acceptanceFile.setCrmLinkId(acceptance.getId());
				acceptanceFile.setName(newFile.getFileName());
				acceptanceFile.setFileLocation(newFile.getFileDownloadUri());
				acceptanceFile.setSize(newFile.getSize());
				acceptance.setAcceptanceUpload(newFile.getFileDownloadUri());
				acceptanceFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(acceptanceFile);
			} else if (currentAcceptance.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateAcceptanceDefect(Acceptance acceptance, List<UploadFileResponse> newAcceptanceDefect) {
		User lastedUpdateUser = userRepository.findById(acceptance.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentAcceptanceDefectFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("AcceptanceDefect", acceptance.getId());
		List<String> currentAcceptanceDefect = currentAcceptanceDefectFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newAcceptanceDefectString = newAcceptanceDefect.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload acceptanceDefectFile : currentAcceptanceDefectFiles) {
			if (!newAcceptanceDefectString.contains(acceptanceDefectFile.getName())) {
				fileUploadRepository.delete(acceptanceDefectFile);
			}
		}
		for (UploadFileResponse newFile : newAcceptanceDefect) {
			if (!currentAcceptanceDefect.contains(newFile.getFileDownloadUri())) {
				FileUpload acceptanceFile = new FileUpload();
				acceptanceFile.setCrmTableName("AcceptanceDefect");
				acceptanceFile.setCrmLinkId(acceptance.getId());
				acceptanceFile.setName(newFile.getFileName());
				acceptanceFile.setFileLocation(newFile.getFileDownloadUri());
				acceptanceFile.setSize(newFile.getSize());
				acceptance.setDefectUpload(newFile.getFileDownloadUri());
				acceptanceFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(acceptanceFile);
			} else if (currentAcceptanceDefect.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}
	
	private void updateOvercome(Acceptance acceptance, List<UploadFileResponse> newOvercomeUploadFile) {
		User lastedUpdateUser = userRepository.findById(acceptance.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentOvercomeFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("Overcome", acceptance.getId());
		List<String> currentOvercome = currentOvercomeFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newOvercomeString = newOvercomeUploadFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload overcomeFile : currentOvercomeFiles) {
			if (!newOvercomeString.contains(overcomeFile.getName())) {
				fileUploadRepository.delete(overcomeFile);
			}
		}
		for (UploadFileResponse newFile : newOvercomeUploadFile) {
			if (!currentOvercome.contains(newFile.getFileDownloadUri())) {
				FileUpload overcomeFile = new FileUpload();
				overcomeFile.setCrmTableName("Overcome");
				overcomeFile.setCrmLinkId(acceptance.getId());
				overcomeFile.setName(newFile.getFileName());
				overcomeFile.setFileLocation(newFile.getFileDownloadUri());
				overcomeFile.setSize(newFile.getSize());
				acceptance.setOvercomeUpload(newFile.getFileDownloadUri());
				overcomeFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(overcomeFile);
			} else if (currentOvercome.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	@DeleteMapping("/acceptance/{id}")
	public RestResult deleteacceptance(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete acceptance with ID = " + id + "...");

		try {
			acceptanceRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete acceptance.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/acceptance/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = acceptanceRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/acceptance/listAll")
	public RestResult listAll() {
		return new RestResult(acceptanceRepository.findAll());
	}
}
