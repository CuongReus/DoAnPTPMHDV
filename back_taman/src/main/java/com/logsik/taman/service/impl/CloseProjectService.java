package com.logsik.taman.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.Approval;
import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.repository.CloseProjectRepository;

@Service
public class CloseProjectService {
	@Autowired
	private CloseProjectRepository closeProjectRepository;
	//	CP is stand for Close Project
	public void addAndUpdateApprovalValueForCP(CloseProject closeProject,Approval approval ) {
		closeProject.setCloseApprovalValue(approval.getApprovalValue());
		closeProjectRepository.save(closeProject);
	}
}
