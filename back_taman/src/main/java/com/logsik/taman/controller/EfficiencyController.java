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

import com.logsik.taman.domain.ConstructionTeam;
import com.logsik.taman.domain.Efficiency;
import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.EfficiencyDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.ConstructionTeamRepository;
import com.logsik.taman.repository.EfficiencyRepository;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.ConstructionTeamService;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class EfficiencyController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(EfficiencyController.class);

	@Autowired
	private EfficiencyRepository efficiencyRepository;
	@Autowired
	private ConstructionTeamRepository constructionTeamRepository;
	@Autowired
	private ConstructionTeamService  constructionTeamService;
	
	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;
	@Autowired
	private UserRepository userRepository;

	@RequestMapping("efficiency/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<Efficiency> efficiency = efficiencyRepository.findById(id);
		List<FileUpload> handoverWorkUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Efficient_HandoverWork",
				efficiency.get().getId());
		return new RestResult(dtoConverter.convertToEfficiencyDto(efficiency.get(), handoverWorkUploadFile));
	}

	@RequestMapping(value = "/efficiency/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody EfficiencyDto efficiencyDto) {
		checkAuthorization("admin.projectProgress.efficientC&U");
		try {
			Efficiency newEfficiency = dtoConverter.convertToEfficiency(efficiencyDto);
			constructionTeamService.addNewConstructionTeam(newEfficiency);
			List<ConstructionTeam> listNewConstructionTeam = constructionTeamRepository.findAll();
			for(int i=0; i < listNewConstructionTeam.size(); i++) {
				if(listNewConstructionTeam.get(i).getTeamLeaderName().equals(newEfficiency.getNewLeaderName())) {
					newEfficiency.setConstructionTeamId(listNewConstructionTeam.get(i).getId());
					newEfficiency.setLeaderName(listNewConstructionTeam.get(i).getTeamLeaderName());
					newEfficiency.setLeaderPhone(listNewConstructionTeam.get(i).getLeaderPhoneNumber());
					newEfficiency.setNewSpecialize(null);
					newEfficiency.setNewLeaderName(null);
					newEfficiency.setNewLeaderPhone(null);
				}
			}
			 newEfficiency = efficiencyRepository.save(newEfficiency);
			saveNewEfficiencyFile(newEfficiency, efficiencyDto.getHandoverWorkUploadFile());
			return new RestResult(newEfficiency);
		} catch (Exception e) {
			LOGGER.error("Error when adding efficiency.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	

	private void saveNewEfficiencyFile(Efficiency efficiency, List<UploadFileResponse> handoverWorkUploadFile) {
		User createdUser = userRepository.findById(efficiency.getCreatedUserId()).get(); 
		for (UploadFileResponse file : handoverWorkUploadFile) {
			FileUpload handoverWorkFile = new FileUpload();
			handoverWorkFile.setName(file.getFileName());
			handoverWorkFile.setFileLocation(file.getFileDownloadUri());
			handoverWorkFile.setSize(file.getSize());
			handoverWorkFile.setCrmLinkId(efficiency.getId());
			handoverWorkFile.setCrmTableName("Efficient_HandoverWork");
			efficiency.setHandoverWorkUpload(file.getFileDownloadUri());
			handoverWorkFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(handoverWorkFile);
		}
	}

	@RequestMapping(value = "/efficiency/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody EfficiencyDto efficiencyDto) {
		checkAuthorization("admin.projectProgress.efficientC&U");
		try {
			Efficiency updatedEfficiency = dtoConverter.convertToEfficiency(efficiencyDto);
			constructionTeamService.addNewConstructionTeam(updatedEfficiency);
			List<ConstructionTeam> listNewConstructionTeam = constructionTeamRepository.findAll();
			for(int i=0; i < listNewConstructionTeam.size(); i++) {
				if(listNewConstructionTeam.get(i).getTeamLeaderName().equals(updatedEfficiency.getNewLeaderName())) {
					updatedEfficiency.setConstructionTeamId(listNewConstructionTeam.get(i).getId());
					updatedEfficiency.setLeaderName(listNewConstructionTeam.get(i).getTeamLeaderName());
					updatedEfficiency.setLeaderPhone(listNewConstructionTeam.get(i).getLeaderPhoneNumber());
					updatedEfficiency.setNewSpecialize(null);
					updatedEfficiency.setNewLeaderName(null);
					updatedEfficiency.setNewLeaderPhone(null);
				}
			}
			 updatedEfficiency = efficiencyRepository
					.save(updatedEfficiency);
			updateEfficiency(updatedEfficiency, efficiencyDto.getHandoverWorkUploadFile());
			return new RestResult(updatedEfficiency);
		} catch (Exception e) {
			LOGGER.error("Error when updating efficiency.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updateEfficiency(Efficiency efficiency, List<UploadFileResponse> newHandoverWorkUploadFile) {
		User lastedUpdateUser = userRepository.findById(efficiency.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentEfficiencyFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Efficient_HandoverWork",
				efficiency.getId());
		List<String> currentEfficiency = currentEfficiencyFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newEfficiencyString = newHandoverWorkUploadFile.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload efficiencyFile : currentEfficiencyFiles) {
			if (!newEfficiencyString.contains(efficiencyFile.getName())) {
				fileUploadRepository.delete(efficiencyFile);
			}
		}
		for (UploadFileResponse newFile : newHandoverWorkUploadFile) {
			if (!currentEfficiency.contains(newFile.getFileDownloadUri())) {
				FileUpload efficiencyFile = new FileUpload();
				efficiencyFile.setCrmTableName("Efficient_HandoverWork");
				efficiencyFile.setCrmLinkId(efficiency.getId());
				efficiencyFile.setName(newFile.getFileName());
				efficiencyFile.setFileLocation(newFile.getFileDownloadUri());
				efficiencyFile.setSize(newFile.getSize());
				efficiency.setHandoverWorkUpload(newFile.getFileDownloadUri());
				efficiencyFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(efficiencyFile);
			} else if (currentEfficiency.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}


	@DeleteMapping("/efficiency/{id}")
	public RestResult deleteefficiency(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete efficiency with ID = " + id + "...");

		try {
			efficiencyRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete efficiency.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/efficiency/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = efficiencyRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/efficiency/listAll")
	public RestResult listAll() {
		return new RestResult(efficiencyRepository.findAll());
	}
}
