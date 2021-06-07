package com.logsik.taman.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.InvoiceVATOutput;

public interface InvoiceVATOutputRepository extends BaseRepository<InvoiceVATOutput, Long> {
	
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project", "responsibleUser"})
	Page<InvoiceVATOutput> findById(Long id, Pageable pageable);
	
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","responsibleUser"})
	List<InvoiceVATOutput> findByProjectDetailId(Long projectDetailId);

}
