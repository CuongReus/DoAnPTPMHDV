package com.logsik.taman.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.Approval;
import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.domain.Complete;
import com.logsik.taman.domain.Efficiency;
import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.dtos.ProjectDetailProgressDto;
import com.logsik.taman.repository.ApprovalRepository;
import com.logsik.taman.repository.CloseProjectRepository;
import com.logsik.taman.repository.CompleteRepository;
import com.logsik.taman.repository.EfficiencyRepository;
import com.logsik.taman.repository.ProjectDetailRepository;

@Service
@Transactional
public class ProjectDetailService {

	@Autowired
	ApprovalRepository approvalRepository;
	@Autowired
	CloseProjectRepository closeProjectRepository;
	@Autowired
	CompleteRepository completeRepository;
	@Autowired
	EfficiencyRepository efficiencyRepository;

	@Autowired
	ProjectDetailRepository projectDetailRepository;

	@Autowired
	TotalRevenueService totalRevenueService;

	public ProjectDetailProgressDto findDtoById(Long projectDetailId) {
		ProjectDetailProgressDto projectDetailProgressDto = new ProjectDetailProgressDto();
		ProjectDetail projectDetail = projectDetailRepository.findDistinctById(projectDetailId);
		Approval approval = approvalRepository.findByProjectDetailId(projectDetailId);
		CloseProject closeProject = closeProjectRepository.findByProjectDetailId(projectDetailId);
		Complete complete = completeRepository.findByProjectDetailId(projectDetailId);
		Efficiency efficiency = efficiencyRepository.findByProjectDetailId(projectDetailId);

		projectDetailProgressDto.setApproval(approval);
		projectDetailProgressDto.setCloseProject(closeProject);
		projectDetailProgressDto.setComplete(complete);
		projectDetailProgressDto.setEfficiency(efficiency);
		projectDetailProgressDto.setProject(projectDetail.getProject());
		projectDetailProgressDto.setName(projectDetail.getName());
		projectDetailProgressDto.setTotalRevenue(projectDetail.getTotalRevenue());
		projectDetailProgressDto.setTotalProfit(projectDetail.getTotalProfit());
		projectDetailProgressDto.setId(projectDetail.getId());
		projectDetailProgressDto.setNote(projectDetail.getNote());
		projectDetailProgressDto.setProjectDetailStatus(projectDetail.getProjectDetailStatus());
		projectDetailProgressDto.setClosedDate(projectDetail.getClosedDate());
		projectDetailProgressDto.setNotifyTo(projectDetail.getNotifyTo());
		projectDetailProgressDto.setNotifyMessage(projectDetail.getNotifyMessage());
		projectDetailProgressDto.setCreatedUser(projectDetail.getCreatedUser());
		projectDetailProgressDto.setCreatedDate(projectDetail.getCreatedDate());
		projectDetailProgressDto.setLastedUpdateUser(projectDetail.getLastedUpdateUser());
		projectDetailProgressDto.setLastedUpdateDate(projectDetail.getLastedUpdateDate());
		return projectDetailProgressDto;

	}

	public void deleteAllItemInProjectDetailId(Long projectDetailId) {
		Approval approval = approvalRepository.findByProjectDetailId(projectDetailId);
		CloseProject closeProject = closeProjectRepository.findByProjectDetailId(projectDetailId);
		Complete complete = completeRepository.findByProjectDetailId(projectDetailId);
		Efficiency efficiency = efficiencyRepository.findByProjectDetailId(projectDetailId);
		
		if (approval != null) {
			approvalRepository.deleteById(approval.getId());
		}
		if (closeProject != null) {
			closeProjectRepository.deleteById(closeProject.getId());
		}
		if (complete != null) {
			completeRepository.deleteById(complete.getId());
		}
		if (efficiency != null) {
			efficiencyRepository.deleteById(efficiency.getId());
		}
	}

}
