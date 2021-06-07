package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.Complete;

public interface CompleteRepository extends BaseRepository<Complete, Long> {
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<Complete> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<Complete> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Optional<Complete> findById(Long id);
	@EntityGraph(attributePaths = {"createdUser","lastedUpdateUser"})
	Complete findByProjectDetailId(Long projectDetailId);
}
