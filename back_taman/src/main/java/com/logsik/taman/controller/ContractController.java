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

import com.logsik.taman.domain.Contract;
import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.ContractDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.repository.ContractRepository;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class ContractController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ContractController.class);

	@Autowired
	private ContractRepository contractRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private FileUploadRepository fileUploadRepository;
	
	@Autowired
	private UserRepository userRepository;

	@RequestMapping("contract/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<Contract> contract = contractRepository.findById(id);
		List<FileUpload> draftUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Draft",
				contract.get().getId());
		List<FileUpload> officialUploadFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Official",
				contract.get().getId());
		return new RestResult(dtoConverter.convertToContractDto(contract.get(), draftUploadFile, officialUploadFile));
	}

	@RequestMapping(value = "/contract/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ContractDto contractDto) {
		checkAuthorization("admin.projectProgress.contractC&U");
		try {
			Contract newContract = dtoConverter.convertToContract(contractDto);
			 newContract = contractRepository.save(newContract);
			saveNewContractDraftFile(newContract, contractDto.getDraftUploadFile());
			saveNewContractOfficialFile(newContract, contractDto.getOfficialUploadFile());
			return new RestResult(newContract);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void saveNewContractDraftFile(Contract contract, List<UploadFileResponse> draftUploadFile) {
		User createdUser = userRepository.findById(contract.getCreatedUserId()).get(); 
		for (UploadFileResponse file : draftUploadFile) {
			FileUpload draftFile = new FileUpload();
			draftFile.setName(file.getFileName());
			draftFile.setFileLocation(file.getFileDownloadUri());
			draftFile.setSize(file.getSize());
			draftFile.setCrmLinkId(contract.getId());
			draftFile.setCrmTableName("Draft");
			contract.setDraftUpload(file.getFileDownloadUri());
			draftFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(draftFile);
		}
	}

	private void saveNewContractOfficialFile(Contract contract, List<UploadFileResponse> officialUploadFile) {
		User createdUser = userRepository.findById(contract.getCreatedUserId()).get(); 
		for (UploadFileResponse file : officialUploadFile) {
			FileUpload officialFile = new FileUpload();
			officialFile.setName(file.getFileName());
			officialFile.setFileLocation(file.getFileDownloadUri());
			officialFile.setSize(file.getSize());
			officialFile.setCrmLinkId(contract.getId());
			officialFile.setCrmTableName("Official");
			contract.setOfficialUpload(file.getFileDownloadUri());
			officialFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(officialFile);
		}
	}

	@RequestMapping(value = "/contract/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ContractDto contractDto) {
		checkAuthorization("admin.projectProgress.contractC&U");
		try {
			Contract updatedContract = contractRepository
					.save(dtoConverter.convertToContract(contractDto));
			updateDraft(updatedContract, contractDto.getDraftUploadFile());
			updateOfficial(updatedContract, contractDto.getOfficialUploadFile());
			return new RestResult(updatedContract);
		} catch (Exception e) {
			LOGGER.error("Error when updating contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updateDraft(Contract contract, List<UploadFileResponse> newDraftContract) {
		User lastedUpdateUser = userRepository.findById(contract.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentDraftFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("Draft",
				contract.getId());
		List<String> currentDraft = currentDraftFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newDraftString = newDraftContract.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload DraftFile : currentDraftFiles) {
			if (!newDraftString.contains(DraftFile.getName())) {
				fileUploadRepository.delete(DraftFile);
			}
		}
		for (UploadFileResponse newFile : newDraftContract) {
			if (!currentDraft.contains(newFile.getFileDownloadUri())) {
				FileUpload draftFile = new FileUpload();
				draftFile.setCrmTableName("Draft");
				draftFile.setCrmLinkId(contract.getId());
				draftFile.setName(newFile.getFileName());
				draftFile.setFileLocation(newFile.getFileDownloadUri());
				draftFile.setSize(newFile.getSize());
				contract.setDraftUpload(newFile.getFileDownloadUri());
				draftFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(draftFile);
			} else if (currentDraft.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	private void updateOfficial(Contract contract, List<UploadFileResponse> newOfficialContract) {
		User lastedUpdateUser = userRepository.findById(contract.getLastedUpdateUserId()).get(); 
		List<FileUpload> currentContractDefectFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("Official", contract.getId());
		List<String> currentContractDefect = currentContractDefectFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newContractDefectString = newOfficialContract.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload contractDefectFile : currentContractDefectFiles) {
			if (!newContractDefectString.contains(contractDefectFile.getName())) {
				fileUploadRepository.delete(contractDefectFile);
			}
		}
		for (UploadFileResponse newFile : newOfficialContract) {
			if (!currentContractDefect.contains(newFile.getFileDownloadUri())) {
				FileUpload contractFile = new FileUpload();
				contractFile.setCrmTableName("Official");
				contractFile.setCrmLinkId(contract.getId());
				contractFile.setName(newFile.getFileName());
				contractFile.setFileLocation(newFile.getFileDownloadUri());
				contractFile.setSize(newFile.getSize());
				contract.setOfficialUpload(newFile.getFileDownloadUri());
				contractFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(contractFile);
			} else if (currentContractDefect.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	@DeleteMapping("/contract/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			contractRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/contract/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		result = contractRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/contract/listAll")
	public RestResult listAll() {
		return new RestResult(contractRepository.findAll());
	}
}
