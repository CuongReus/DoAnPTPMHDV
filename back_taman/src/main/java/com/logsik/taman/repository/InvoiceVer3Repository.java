package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.InvoiceVer3;

public interface InvoiceVer3Repository extends BaseRepository<InvoiceVer3, Long> {
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<InvoiceVer3> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Page<InvoiceVer3> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","createdUser","lastedUpdateUser" })
	Optional<InvoiceVer3> findById(Long id);
	
	@EntityGraph(attributePaths = {"createdUser","lastedUpdateUser"})
	InvoiceVer3 findByProjectDetailId(Long projectDetailId);
	
	List<InvoiceVer3> findByInvoiceNumber(String invoiceNumber);
}
