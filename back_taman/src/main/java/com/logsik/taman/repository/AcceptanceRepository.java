package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.Acceptance;

public interface AcceptanceRepository extends BaseRepository<Acceptance, Long> {
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<Acceptance> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<Acceptance> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Optional<Acceptance> findById(Long id);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Acceptance findByProjectDetailId(Long projectDetailId);
	

}
