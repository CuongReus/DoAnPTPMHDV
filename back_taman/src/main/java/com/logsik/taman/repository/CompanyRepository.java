package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.taman.domain.Company;

public interface CompanyRepository extends BaseRepository<Company, Long> {
	Page<Company> findAll(Pageable pageable);

	Optional <Company> findById(Long id);

	Page<Company> findByNameContainingOrCodeContaining(String name, String code, Pageable pageable);
}
