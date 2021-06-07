package com.logsik.taman.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by phamcongbang on 11/04/2018.
 */
@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "The request is not authorized or wrong parameters.")
public class ForbiddenException extends RuntimeException {
	private String message;

	public ForbiddenException(String message) {
		this.message = message;
	}
}
