//package com.logsik.taman.controller;
//
//import java.util.Optional;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Pageable;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.logsik.taman.domain.UserRole;
//import com.logsik.taman.dtos.RestResult;
//import com.logsik.taman.repository.UserRoleRepository;
//import com.logsik.taman.service.impl.DtoConverter;
//
//@RestController
//@RequestMapping("/api")
//public class UserRoleController extends AbstractController {
//	private static final Logger LOGGER = LoggerFactory.getLogger(UserRoleController.class);
//
//	@Autowired
//	private UserRoleRepository userRoleRepository;
//
//	@Autowired
//	private DtoConverter dtoConverter;
//
//	@RequestMapping("userRole/{id}")
//	public RestResult findById(@PathVariable(value = "id") Long id) {
//
//		return new RestResult(userRoleRepository.findById(id));
//	}
//
//	@RequestMapping(value = "/userRole/add", method = RequestMethod.POST)
//	public RestResult add(@RequestBody UserRole userRole) {
//		try {
//			UserRole newUserRole = userRoleRepository.save(userRole);
//
//			return new RestResult(newUserRole);
//		} catch (Exception e) {
//			LOGGER.error("Error when adding contract.", e);
//			return new RestResult(true, MESSAGE_CANNOT_SAVE);
//		}
//	}
//
//	@RequestMapping(value = "/userRole/update", method = RequestMethod.POST)
//	public RestResult update(@RequestBody UserRole userRole) {
//		try {
//			Optional<UserRole> source = userRoleRepository.findById(userRole.getId());
//
//			UserRole updatedcontract = userRoleRepository.save(dtoConverter.fillUserRoleForm(source.get(), userRole));
//
//			return new RestResult(updatedcontract);
//		} catch (Exception e) {
//			LOGGER.error("Error when updating userRole.", e);
//			return new RestResult(true, MESSAGE_CANNOT_SAVE);
//		}
//	}
//
//	@DeleteMapping("/userRole/{id}")
//	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
//		System.out.println("Delete contract with ID = " + id + "...");
//
//		try {
//			userRoleRepository.deleteById(id);
//		} catch (Exception e) {
//			LOGGER.error("Error when delete userRole.", e);
//			return new RestResult(true, MESSAGE_CANNOT_DELETE);
//		}
//
//		return new RestResult("ok");
//	}
//
//	@RequestMapping(value = "/userRole/list")
//	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
//		Object result;
//			result = userRoleRepository.findAll(pageable);
//		return new RestResult(result);
//	}
//
//	@RequestMapping(value = "/userRole/listAll")
//	public RestResult listAll() {
//		return new RestResult(userRoleRepository.findAll());
//
//	}
//
//}
