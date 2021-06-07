package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.taman.domain.UserRole;


public interface UserRoleRepository extends BaseRepository<UserRole, Long> {
	Page<UserRole> findAll(Pageable pageable);
	Optional<UserRole> findById(Long id);
	

}
