package com.logsik.taman.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.User;
import com.logsik.taman.repository.UserRepository;

/**
 * Created by phamcongbang on 14/05/2018.
 */
@Service
public class UserServiceImpl {
    @Autowired
    private UserRepository userRepository;

//    TODO: Need to find a solution to update cache when neccessary
//    @Cacheable("users")
    public User findByEmail(String email) {
        List<User> users = userRepository.findByEmail(email);
        if (!users.isEmpty()) {
            return users.get(0);
        } else {
            return null;
        }
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
