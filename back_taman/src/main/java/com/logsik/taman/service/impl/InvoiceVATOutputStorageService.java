package com.logsik.taman.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class InvoiceVATOutputStorageService extends AbstractFileStorageService {
	
	@Override
	protected String getFileStorageLocation() {
		return "./invoiceVATOutput";
	}

}
