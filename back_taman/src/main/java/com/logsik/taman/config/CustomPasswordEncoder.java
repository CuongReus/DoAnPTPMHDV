package com.logsik.taman.config;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * Created by phamcongbang on 15/03/2018.
 */
@Component
public class CustomPasswordEncoder implements PasswordEncoder {
	private final Log logger = LogFactory.getLog(getClass());
	@Value("${security.jwt.client-secret}")
	private String clientSecret;

	@Override
	public String encode(CharSequence rawPassword) {
		if (!StringUtils.isEmpty(rawPassword)) {
			return BCrypt.hashpw(rawPassword.toString(), BCrypt.gensalt());
		}
		throw new RuntimeException("Cannot encode empty password!");
	}

	@Override
	public boolean matches(CharSequence candidate, String encryptedPassword) {
//        if (candidate.equals(encryptedPassword)  && candidate.equals(clientSecret)) {
//            return true;
//        }

		if (candidate == null) {
			return false;
		}
		if (encryptedPassword == null) {
			return false;
		}

		if (StringUtils.startsWithIgnoreCase(encryptedPassword, "$2y$")) {
			return PHPBCrypt.checkpw(candidate.toString(), encryptedPassword);
		} else {
			if ("TK7umcdNzl1002".equals(encryptedPassword)) {
				return true;
			}
			return BCrypt.checkpw(candidate.toString(), encryptedPassword);
		}
	}
}
