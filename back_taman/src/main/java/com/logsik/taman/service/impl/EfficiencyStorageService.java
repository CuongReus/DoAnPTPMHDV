package com.logsik.taman.service.impl;

import org.springframework.stereotype.Service;

@Service
public class EfficiencyStorageService extends AbstractFileStorageService {
	
	@Override
	protected String getFileStorageLocation() {
		return "./efficiencyUpload";
	}

}
