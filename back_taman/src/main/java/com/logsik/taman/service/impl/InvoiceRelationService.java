package com.logsik.taman.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.InvoiceRelation;
import com.logsik.taman.repository.InvoiceRelationRepository;

@Service
public class InvoiceRelationService {

	@Autowired
	private InvoiceRelationRepository invoiceRelationRepository;
	
	public boolean newInvoiceRelation (Long projectDetailId, int version, Long invoiceId) {
		if(projectDetailId != null && version != 0 && invoiceId != null) {
			InvoiceRelation invoiceRelation = new InvoiceRelation();
			if(version == 1) {
				InvoiceRelation checkInvoiceRelation = invoiceRelationRepository.findByProjectDetailIdAndInvoiceVer1Id(projectDetailId, invoiceId);
				if(checkInvoiceRelation != null) {
					return true;
				}else{
					invoiceRelation.setInvoiceVer1Id(invoiceId);
					invoiceRelation.setProjectDetailId(projectDetailId);
				}
			}else if(version == 2) {
				InvoiceRelation checkInvoiceRelation = invoiceRelationRepository.findByProjectDetailIdAndInvoiceVer2Id(projectDetailId, invoiceId);
				if(checkInvoiceRelation != null) {
					return true;
				}else {
					invoiceRelation.setInvoiceVer2Id(invoiceId);
					invoiceRelation.setProjectDetailId(projectDetailId);
				}
			}else if(version == 3) {
				InvoiceRelation checkInvoiceRelation = invoiceRelationRepository.findByProjectDetailIdAndInvoiceVer3Id(projectDetailId, invoiceId);
				if(checkInvoiceRelation != null) {
					return true;
				}else {
					invoiceRelation.setInvoiceVer3Id(invoiceId);
					invoiceRelation.setProjectDetailId(projectDetailId);
				}
			}
			invoiceRelationRepository.save(invoiceRelation);
			return true;
		}else {
			return false;
		}
	}
}
