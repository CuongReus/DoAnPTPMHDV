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
  	
	@RequestMapping(value = "/user/update", method = RequestMethod.POST)
	public RestResult updateUser(@RequestBody UserDto userDto) {
//		checkAuthorization("admin.users.update");
		try {
			Optional<User> user = userRepository.findById(userDto.getId());
			if (!StringUtils.isEmpty(userDto.getPassword())) {
				user.get().setPassword(BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt()));
			}
			User updatedUser = userService.save(dtoConverter.convertToUser(userDto));
			// updateUserImage(updatedUser, userDto.getImageUpload());
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
	public RestResult listFindByCompanyIdAndFullNameOrPhoneOrEmail(@RequestParam("companyId") String companyId,
			@RequestParam("fullNameOrPhoneOrEmail") String fullNameOrPhoneOrEmail,
			@RequestParam("isActive") Boolean isActive,Pageable pageable) {
		checkAuthorization("admin.users.read");
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
