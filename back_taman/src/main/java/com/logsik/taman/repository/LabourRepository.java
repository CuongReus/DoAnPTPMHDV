package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.logsik.taman.domain.Labour;

public interface LabourRepository extends BaseRepository<Labour, Long>, JpaSpecificationExecutor<Labour> {
	@EntityGraph(attributePaths = { "companies", "createdUser","lastedUpdateUser" })
	Page<Labour> findAll(Specification<Labour> spec, Pageable pageable);

	@EntityGraph(attributePaths = { "companies", "createdUser","lastedUpdateUser" })
	Optional<Labour> findById(Long id);

	@EntityGraph(attributePaths = {"createdUser","lastedUpdateUser" })
	List<Labour> findAll();

	@EntityGraph(attributePaths = { "companies", "createdUser","lastedUpdateUser" })
	Page<Labour> findByFullNameContainingOrPhoneContaining(String fullName, String phone, Pageable pageable);

//	@EntityGraph(attributePaths = { "company"})
//	List<Labour> fdByFull();

}
