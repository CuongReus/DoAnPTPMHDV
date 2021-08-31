package com.logsik.taman.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.Job;
import com.logsik.taman.domain.SwotItem;
import com.logsik.taman.domain.SwotJob;
import com.logsik.taman.domain.SwotUser;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.SwotUserDto;
import com.logsik.taman.dtos.QueryUserJob;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.SwotJobRepository;
import com.logsik.taman.repository.SwotUserRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.repository.SwotUserRepository;
import com.logsik.taman.repository.SwotUserRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class SwotUserController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(SwotUserController.class);

	@Autowired
	private SwotUserRepository swotUserRepository;
	
	@Autowired
	private SwotJobRepository swotJobRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("swotUser/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(swotUserRepository.findById(id));
	}

	@RequestMapping(value = "/swotUser/add", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult add(@RequestBody SwotUserDto swotUserDto) {
		try {
			SwotUser newSwotUser = dtoConverter.convertToSwotUser(swotUserDto);
			newSwotUser = swotUserRepository.save(newSwotUser);
			return new RestResult(newSwotUser);
		} catch (Exception e) {
			LOGGER.error("Error when adding swotUser.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/swotUser/update", method = RequestMethod.POST)
	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult update(@RequestBody SwotUserDto swotUserDto) {
		try {
			SwotUser updatedSwotUser = swotUserRepository.save(dtoConverter.convertToSwotUser(swotUserDto));
			return new RestResult(updatedSwotUser);
		} catch (Exception e) {
			LOGGER.error("Error when updating swotUser.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/swotUser/{id}")
	public RestResult deleteSwotUser(@PathVariable("id") Long id) {
		System.out.println("Delete SwotUser with ID = " + id + "...");

		try {
			swotUserRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete SwotUser.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/swotUser/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		
		Object result;
		result = swotUserRepository.findAll(pageable);
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/swotUser/listFindByUserId")
	public RestResult listFindByUserId(@RequestParam("userId") Long userId) {
		Object result;
		result = swotUserRepository.findByUserId(userId);
		return new RestResult(result);
	}

	@RequestMapping(value = "/swotUser/listAll")
	public RestResult listAll() {
		return new RestResult(swotUserRepository.findAll());
	}
	
	public class UserJobMatchedDto {
		public User user;
		public List<SwotItem> matchedSwotItems = new ArrayList<>();
	}
	public class FindMatchedUserJobResult {
		public List<SwotJob> swotItemsOfSelectedJob = new ArrayList<>();
		public List<UserJobMatchedDto> userJobMatchedList = new ArrayList<>();
	}
	@RequestMapping(value = "/swotUser/findMachedUserJob", method = RequestMethod.POST)
	public RestResult findMatchedUserJob(@RequestBody QueryUserJob queryUserJob) {
		FindMatchedUserJobResult result = new FindMatchedUserJobResult();
		result.swotItemsOfSelectedJob = swotJobRepository.findByJobId(queryUserJob.getSelectedJobId());
		List<UserJobMatchedDto> userJobList = new ArrayList<>();
		
		List<SwotUser> swotUsers = new ArrayList<>();
		if (!queryUserJob.getCurrentJobIds().isEmpty()) {
			List<Long> userIds = new ArrayList<>();
			List<User> users = userRepository.findByJobIdInAndIsActive(queryUserJob.getCurrentJobIds(), true);
			for (User user: users) {
				userIds.add(user.getId());
			}
			swotUsers = swotUserRepository.findByUserIdIn(userIds);
		} else {
			swotUsers = swotUserRepository.findAll();
		}
		
		for (SwotUser swotUser: swotUsers) {
			UserJobMatchedDto userJobDto = getUserJobMatched(userJobList, swotUser);
			if (userJobDto == null) {
				userJobDto = new UserJobMatchedDto();
				userJobDto.user = swotUser.getUser();
				userJobList.add(userJobDto);
			}
			if (containsSwotItem(result.swotItemsOfSelectedJob, swotUser.getSwotItem())) {
				userJobDto.matchedSwotItems.add(swotUser.getSwotItem());
			}			
		}
		userJobList
		.sort((a1,a2) -> {
			if (a2.matchedSwotItems.size() > a1.matchedSwotItems.size()) {
				return 1;
			} else if (a2.matchedSwotItems.size() < a1.matchedSwotItems.size()) {
				return -1;
			} else {
				return 0;
			}
		});
		result.userJobMatchedList = userJobList;
		return new RestResult(result);
	}

	private boolean containsSwotItem(List<SwotJob> swotItemsOfSelectedJob, SwotItem swotItem) {
		for (SwotJob swotJob : swotItemsOfSelectedJob) {
			if (swotJob.getSwotItemId().equals(swotItem.getId())) {
				return true;
			}
		}
		return false;
	}

	private UserJobMatchedDto getUserJobMatched(List<UserJobMatchedDto> userJobList, SwotUser swotUser) {
		for (UserJobMatchedDto dto: userJobList) {
			if (dto.user.getId().equals(swotUser.getUserId())) {
				return dto;
			}
		}
		return null;
	}
}
