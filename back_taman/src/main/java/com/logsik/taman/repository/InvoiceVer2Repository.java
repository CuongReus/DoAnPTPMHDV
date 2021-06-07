package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.InvoiceVer2;

public interface InvoiceVer2Repository extends BaseRepository<InvoiceVer2, Long> {
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<InvoiceVer2> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<InvoiceVer2> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Optional<InvoiceVer2> findById(Long id);
	@EntityGraph(attributePaths = {"createdUser","lastedUpdateUser"})
	InvoiceVer2 findByProjectDetailId(Long projectDetailId);
}
