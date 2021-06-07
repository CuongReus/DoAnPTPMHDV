package com.logsik.taman.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.InvoiceVATInput;

public interface InvoiceVATInputRepository extends BaseRepository<InvoiceVATInput, Long> {
	
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project", "responsibleUser", "invoiceVatOut"})
	Page<InvoiceVATInput> findById(Long id, Pageable pageable);
	
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","responsibleUser", "invoiceVatOut"})
	List<InvoiceVATInput> findByProjectDetailIdOrderByInvoiceVatOutIdAsc(Long projectDetailId);

}
