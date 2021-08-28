package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.taman.domain.Department;
import com.logsik.taman.domain.Job;



public interface JobRepository extends BaseRepository<Job, Long> {
	
	Optional<Job> findById(Long id);
	
	Page<Job> findByTitleContaining(String title,Pageable pageable);
	
	List <Job> findAll();
	
}
