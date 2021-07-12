package com.logsik.taman.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.config.AuthorizationServerConfig;
import com.logsik.taman.config.BCrypt;
import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.AnnualLeaveYearDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.dtos.UserDto;
import com.logsik.taman.queries.PersonelSpecification;
import com.logsik.taman.repository.CompanyRepository;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.UserLeaveYearCalcService;
import com.logsik.taman.service.impl.UserServiceImpl;

@RestController
@RequestMapping("/api")
@Transactional
public class UserController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
	private static final String DUPLICATE_EMAIL = "Không Được Trùng Email";
	@Autowired
	private UserServiceImpl userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FileUploadRepository fileUploadRepository;
	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private TokenStore tokenStore;

	@Autowired
	private AuthorizationServerConfig authorizationServerConfig;
	
	@Autowired
	private UserLeaveYearCalcService userLeaveYearCalcService;

	@RequestMapping("user/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		checkAuthorization("admin.users.read");
		Optional<User> user = userRepository.findById(id);
		List<FileUpload> profiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("UserLabourContract",
				user.get().getId());
		List<FileUpload> imageUpload = fileUploadRepository.findByCrmTableNameAndCrmLinkId("UserImage", user.get().getId());
		return new RestResult(dtoConverter.convertToUserDto(user.get(), profiles, imageUpload));
	}
  	@RequestMapping(value = "/user/add", method = RequestMethod.POST)
	public RestResult addUser(@RequestBody UserDto userDto) {
//		checkAuthorization("admin.users.create");
		try {
			User user = dtoConverter.convertToUser(userDto); // TODO: Hash password error
			user.setPassword(BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt()));
			User newUser = userService.save(user);
			return new RestResult(newUser);
		} catch (Exception e) {
			LOGGER.error("Error when adding user.", e);
			return new RestResult(true, DUPLICATE_EMAIL);
		}
	}
  	@RequestMapping(value = "/user/setAllUserAnnualLeave", method = RequestMethod.POST)
	public RestResult setAllUserAnnualLeave(@RequestBody AnnualLeaveYearDto annualLeaveYearDto) {
//		checkAuthorization("admin.users.create");
		try {
			
			userLeaveYearCalcService.updateAllUserTotalAnnualLeaveByYear(annualLeaveYearDto.getAnnualLeaveYear(),annualLeaveYearDto.getYear());
			return new RestResult("ANNUAL_SETUP_SUCCESS");
		} catch (Exception e) {
			LOGGER.error("Error when set up annual leave User.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
  	
  	@RequestMapping(value = "/user/setUserAnnualLeaveByUserId", method = RequestMethod.POST)
	public RestResult setUserAnnualLeaveBy(@RequestBody AnnualLeaveYearDto annualLeaveYearDto) {
//		checkAuthorization("admin.users.create");
		try {
			User user = userRepository.findById(annualLeaveYearDto.getUserId()).get();
			user.setAnnualLeaveYear(annualLeaveYearDto.getAnnualLeaveYear());
			userLeaveYearCalcService.updateTotalAnnualLeaveByYearAndUserId(annualLeaveYearDto.getAnnualLeaveYear(),annualLeaveYearDto.getUserId(),annualLeaveYearDto.getYear());
			userRepository.save(user);
			return new RestResult("ANNUAL_SETUP_SUCCESS");
		} catch (Exception e) {
			LOGGER.error("Error when set up annual leave User.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
  	
	private void saveNewUserProfileFiles(User user, List<UploadFileResponse> profiles) {
		for (UploadFileResponse file : profiles) {
			FileUpload userFile = new FileUpload();
			userFile.setName(file.getFileName());
			userFile.setFileLocation(file.getFileDownloadUri());
			userFile.setSize(file.getSize());
			userFile.setCrmLinkId(user.getId());
			userFile.setCrmTableName("UserLabourContract");
			userFile.setUploadBy(user.getCreatedUserEmail());
//			Set Profile into database to Download and show in List Screen
//			userFile.setUploadBy(user.getCreatedUserEmail());
			// user.setLabourContract(file.getFileDownloadUri());
			fileUploadRepository.save(userFile);
		}
	}
	private void saveNewUserImage(User user, List<UploadFileResponse> imageUpload) {
		for (UploadFileResponse file : imageUpload) {
			FileUpload userFile = new FileUpload();
			userFile.setName(file.getFileName());
			userFile.setFileLocation(file.getFileDownloadUri());
			userFile.setSize(file.getSize());
			userFile.setCrmLinkId(user.getId());
			userFile.setCrmTableName("UserImage");
			userFile.setUploadBy(user.getCreatedUserEmail());
			// user.setImage(file.getFileDownloadUri());
			fileUploadRepository.save(userFile);
		}
	}
	@RequestMapping(value = "/user/update", method = RequestMethod.POST)
	public RestResult updateUser(@RequestBody UserDto userDto) {
//		checkAuthorization("admin.users.update");
		try {
			Optional<User> user = userRepository.findById(userDto.getId());
			if (!StringUtils.isEmpty(userDto.getPassword())) {
				user.get().setPassword(BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt()));
			}
			User updatedUser = userService.save(dtoConverter.convertToUser(userDto));
			updateUserProfile(updatedUser, userDto.getProfiles());
			updateUserImage(updatedUser, userDto.getImageUpload());
			return new RestResult(updatedUser);
		} catch (Exception e) {
			LOGGER.error("Error when updating.", e);
			return new RestResult(true, DUPLICATE_EMAIL);
		}
	}
	@RequestMapping(value = "/user/changePassword", method = RequestMethod.POST)
	public RestResult changePassword(@RequestBody UserDto userDto) {
		if (!userDto.getId().equals(getCurrentUser().getId())) {
			return new RestResult(true, FORBIDDEN_ACCESS);
		}
		try {	
			Optional<User>  user = userRepository.findById(userDto.getId());
			if (!StringUtils.isEmpty(userDto.getPassword())) {
				user.get().setPassword(BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt()));
			}
			User updatedUser = userService.save(user.get());
			authorizationServerConfig.removeRefreshToken(user.get().getEmail());
			return new RestResult(updatedUser);
		} catch (Exception e) {
			LOGGER.error("Error when change password.", e);
			return new RestResult(true, DUPLICATE_EMAIL);
		}
	}

	// Update labour contract
	private void updateUserProfile(User user, List<UploadFileResponse> newProfiles) {
		List<FileUpload> currentUserFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("UserLabourContract",
				user.getId());
		List<String> currentProfiles = currentUserFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newProfilesString = newProfiles.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload userFile : currentUserFiles) {
			if (!newProfilesString.contains(userFile.getName())) {
				fileUploadRepository.delete(userFile);
			}

		}
		for (UploadFileResponse newFile : newProfiles) {
			if (!currentProfiles.contains(newFile.getFileDownloadUri())) {
				FileUpload userFile = new FileUpload();
				userFile.setCrmTableName("UserLabourContract");
				userFile.setCrmLinkId(user.getId());
				userFile.setName(newFile.getFileName());
				userFile.setFileLocation(newFile.getFileDownloadUri());
				userFile.setSize(newFile.getSize());
				// user.setLabourContract(newFile.getFileDownloadUri());
				userFile.setUploadBy(user.getLastedUpdateUserEmail());
				fileUploadRepository.save(userFile);
			} else if (currentProfiles.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}
		}

	}
	// End Update Labour ContractController

	// Update User Image
	private void updateUserImage(User user, List<UploadFileResponse> newImage) {
		List<FileUpload> currentUserFiles = fileUploadRepository.findByCrmTableNameAndCrmLinkId("UserImage",
				user.getId());
		List<String> currentImage = currentUserFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newImageString = newImage.stream().map(e -> e.getFileName()).collect(Collectors.toList());
		for (FileUpload userFile : currentUserFiles) {
			if (!newImageString.contains(userFile.getName())) {

				fileUploadRepository.delete(userFile);

			}

		}
		for (UploadFileResponse newFile : newImage) {
			if (!currentImage.contains(newFile.getFileDownloadUri())) {
				FileUpload userFile = new FileUpload();
				userFile.setCrmTableName("UserImage");
				userFile.setCrmLinkId(user.getId());
				userFile.setName(newFile.getFileName());
				userFile.setFileLocation(newFile.getFileDownloadUri());
				userFile.setSize(newFile.getSize());
				userFile.setSize(newFile.getSize());
				// user.setImage(newFile.getFileDownloadUri());
				userFile.setUploadBy(user.getCreatedUserEmail());
				fileUploadRepository.save(userFile);
			} else if (currentImage.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	// End Update User Image
	// DeleteMapping
	@DeleteMapping("/user/{id}")
	public RestResult deleteUser(@PathVariable("id") Long id) {
		checkAuthorization("admin.users.delete");
		LOGGER.info("Delete User with ID = " + id);

		try {
			userRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete User.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/user/findByCompanyIdAndFullNameOrPhoneOrEmail")
//    @PreAuthorize("hasAuthority('ADMIN')")
	public RestResult listFindByCompanyIdAndFullNameOrPhoneOrEmail(@RequestParam("companyId") String companyId,
			@RequestParam("fullNameOrPhoneOrEmail") String fullNameOrPhoneOrEmail,
			@RequestParam("isActive") Boolean isActive,Pageable pageable) {
		checkAuthorization("admin.users.read");
//		Object result = null;
		Page<User> result = userRepository.findAll(new PersonelSpecification(companyId, fullNameOrPhoneOrEmail,isActive),pageable);
		
		return new RestResult(result);
	}

	@RequestMapping(value = "/user/listAll")
	public RestResult listAll() {
		return new RestResult(userRepository.findAll());
	}
	
	@RequestMapping(value = "/user/listAllActive")
	public RestResult listAllActive() {
		return new RestResult(userRepository.findByIsActive(true));
	}

}
