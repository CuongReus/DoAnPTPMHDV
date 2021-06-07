package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.taman.domain.Role;


public interface RoleRepository extends BaseRepository<Role, Long> {
	Page<Role> findAll(Pageable pageable);
	Optional<Role> findById(Long id);
	

}
