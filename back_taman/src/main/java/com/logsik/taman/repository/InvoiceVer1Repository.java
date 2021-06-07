package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.InvoiceVer1;

public interface InvoiceVer1Repository extends BaseRepository<InvoiceVer1, Long> {
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<InvoiceVer1> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<InvoiceVer1> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Optional<InvoiceVer1> findById(Long id);
	@EntityGraph(attributePaths = {"createdUser","lastedUpdateUser"})
	InvoiceVer1 findByProjectDetailId(Long projectDetailId);

}
