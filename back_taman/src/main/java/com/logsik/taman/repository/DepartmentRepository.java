package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.taman.domain.Department;



public interface DepartmentRepository extends BaseRepository<Department, Long> {
	
	Optional<Department> findById(Long id);
	
	Page<Department> findByNameContainingOrCodeContaining(String name,String code, Pageable pageable);
	
	List <Department> findAll();
	
}
