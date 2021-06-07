package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.Incurred;

public interface IncurredRepository extends BaseRepository<Incurred, Long> {
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<Incurred> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<Incurred> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Optional<Incurred> findById(Long id);
	@EntityGraph(attributePaths = {"createdUser","lastedUpdateUser"})
	Incurred findByProjectDetailId(Long projectDetailId);
}
