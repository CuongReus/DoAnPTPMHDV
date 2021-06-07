package com.logsik.taman.service.impl;

import org.springframework.stereotype.Service;

@Service
public class InvoiceVer2StorageService extends AbstractFileStorageService {
	
	@Override
	protected String getFileStorageLocation() {
		return "./invoiceVer2Upload";
	}
}
