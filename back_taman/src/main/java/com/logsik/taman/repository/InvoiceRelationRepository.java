package com.logsik.taman.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.InvoiceRelation;

public interface InvoiceRelationRepository extends BaseRepository<InvoiceRelation, Long> {
	@EntityGraph(attributePaths = { "projectDetail","invoiceVer1","invoiceVer2","invoiceVer3" })
	List<InvoiceRelation> findByProjectDetailId(Long projectDetailId);
	
	InvoiceRelation findByProjectDetailIdAndInvoiceVer1Id(Long projectDetailId, Long invoiceId);
	
	InvoiceRelation findByProjectDetailIdAndInvoiceVer2Id(Long projectDetailId, Long invoiceId);
	
	InvoiceRelation findByProjectDetailIdAndInvoiceVer3Id(Long projectDetailId, Long invoiceId);
}
