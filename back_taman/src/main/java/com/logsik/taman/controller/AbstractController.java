package com.logsik.taman.controller;

import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.logsik.taman.domain.Role;
import com.logsik.taman.domain.User;
import com.logsik.taman.exception.ForbiddenException;
import com.logsik.taman.service.impl.UserServiceImpl;

public class AbstractController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AbstractController.class);
	public static String MESSAGE_CANNOT_SAVE = "Không thể lưu trữ dữ liệu. Vui lòng kiểm tra lại hoặc thông báo quản trị viên";
	
	public static String MESSAGE_TECH_ERROR = "Có lỗi khi tải dữ liệu. Vui lòng thử lại hoặc thông báo quản trị viên";
	public static String MESSAGE_CANNOT_DELETE = "Không thể xóa dữ liệu. Vui lòng thử lại hoặc thông báo quản trị viên.";
	public static String FORBIDDEN_ACCESS = "Forbiden Access.";
	@Autowired
	private UserServiceImpl userService;

//    TODO: Put User info into a context object or cache to reduce database connections.
	public User getCurrentUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		User user = this.userService.findByEmail(auth.getName());
		return user;
	}
	
	@SuppressWarnings("unchecked")
	protected void checkAuthorization(String permissionKey) {
		User currentUser = getCurrentUser();
		Map<String, Boolean> permissions = new HashMap<String, Boolean>();
		for (Role role : currentUser.getRoles()) {
			try {
				Map<String, Boolean> rolePermissions = new ObjectMapper().readValue(role.getPermissions(), HashMap.class);
				mergePermissions(permissions, rolePermissions);
			} catch (Exception e) {
				throw new RuntimeException("Cannot parse permissions data.", e);
			} 
		}
		if (permissions.get(permissionKey) == null || permissions.get(permissionKey) == false) {
			LOGGER.error("User does not have access right on " + permissionKey);
			throw new ForbiddenException("User does not have access right on " + permissionKey);
		}
	}

	/**
	 * Add keys from rolePermission to the permissions
	 */
	private void mergePermissions(Map<String, Boolean> permissions, Map<String, Boolean> rolePermissions) {
		for (String key : rolePermissions.keySet()) {
			if (permissions.containsKey(key)) {
				permissions.put(key, permissions.get(key) || rolePermissions.get(key));
			} else {
				permissions.put(key, rolePermissions.get(key));
			}
		}
	}

}
