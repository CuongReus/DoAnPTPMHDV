package com.logsik.taman.service.impl;

import org.springframework.stereotype.Service;

@Service
public class InvoiceVer3StorageService extends AbstractFileStorageService {
	
	@Override
	protected String getFileStorageLocation() {
		return "./invoiceVer3Uploadvalue";
	}

}
