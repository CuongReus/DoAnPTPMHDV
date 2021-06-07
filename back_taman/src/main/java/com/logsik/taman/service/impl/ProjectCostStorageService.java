package com.logsik.taman.service.impl;

import org.springframework.stereotype.Service;

@Service
public class ProjectCostStorageService extends AbstractFileStorageService {
	@Override
	protected String getFileStorageLocation() {
		return "./projectCostFile";
	}
}
