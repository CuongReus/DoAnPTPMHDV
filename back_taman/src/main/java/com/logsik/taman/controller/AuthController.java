package com.logsik.taman.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.UserServiceImpl;

@RestController
@RequestMapping("/api")
public class AuthController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserServiceImpl userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping(value = "/auth/getCurrentUser")
	public User getCurrentUser() {
		return super.getCurrentUser();
	}
	
	@RequestMapping(value = "auth/getByEmail", method = RequestMethod.GET)
	public RestResult getByEmail(@RequestParam("email") String email) {
		return  new RestResult(userRepository.findByEmail(email));
	}
}
