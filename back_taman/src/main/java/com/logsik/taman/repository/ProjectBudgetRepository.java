package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.ProjectBudget;

public interface ProjectBudgetRepository extends BaseRepository<ProjectBudget, Long> {
	Page<ProjectBudget> findAll(Specification<ProjectBudget> spec, Pageable pageable);

	Optional<ProjectBudget> findById(Long id);

	List<ProjectBudget> findAll();
	
	
	@EntityGraph(attributePaths = {"createdUser","lastedUpdateUser"})
	ProjectBudget findByProjectDetailId(Long projectDetailId);
}