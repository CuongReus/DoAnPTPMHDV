package com.logsik.taman.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by phamcongbang on 11/04/2018.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "The request cannot be found on server.")
public class NotFoundException extends RuntimeException {
	private String message;

	public NotFoundException(String message) {
		this.message = message;
	}
}
