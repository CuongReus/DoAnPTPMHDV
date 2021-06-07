package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.Approval;

public interface ApprovalRepository extends BaseRepository<Approval, Long> {
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<Approval> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<Approval> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Optional<Approval> findById(Long id);
	@EntityGraph(attributePaths = {"createdUser","lastedUpdateUser"})
	Approval findByProjectDetailId(Long projectDetailId);
}
