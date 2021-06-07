package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.logsik.taman.domain.ConstructionTeam;

public interface ConstructionTeamRepository
		extends BaseRepository<ConstructionTeam, Long>, JpaSpecificationExecutor<ConstructionTeam> {
	@EntityGraph(attributePaths = { "company" })
	Page<ConstructionTeam> findById(Long id, Pageable pageable);

	@EntityGraph(attributePaths = { "company" })
	Page<ConstructionTeam> findAll(Specification<ConstructionTeam> spec, Pageable pageable);

	@EntityGraph(attributePaths = { "company" })
	Optional<ConstructionTeam> findById(Long id);

	@EntityGraph(attributePaths = { "company" })
	List<ConstructionTeam> findAll();

}
