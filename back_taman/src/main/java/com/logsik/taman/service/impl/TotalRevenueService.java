package com.logsik.taman.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.Approval;
import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.domain.Project;
import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.domain.ProjectYear;
import com.logsik.taman.dtos.SumRevenueOfProjectDto;
import com.logsik.taman.dtos.SumRevenueOfProjectYearDto;
import com.logsik.taman.repository.ApprovalRepository;
import com.logsik.taman.repository.CloseProjectRepository;
import com.logsik.taman.repository.ProjectDetailRepository;
import com.logsik.taman.repository.ProjectRepository;
import com.logsik.taman.repository.ProjectYearRepository;

@Service
@Transactional
public class TotalRevenueService {

	@Autowired
	private ProjectYearRepository projectYearRepository;
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private ProjectDetailRepository projectDetailRepository;
	@Autowired
	private CloseProjectRepository closeProjectRepository;
	@Autowired
	private ApprovalRepository approvalRepository;

	public void addAndUpdateApprovalValueAndSetRevenue(Approval approval, ProjectDetail projectDetail) {
		CloseProject closeProjectByProjectDetailId = closeProjectRepository
				.findByProjectDetailId(approval.getProjectDetailId());
		Long incurredApprovalValue = 0L;
		Long profit = 0L;
		Long profitIncurrent = 0L;
		if (closeProjectByProjectDetailId != null) {
			// Update CloseApprovalValue for CloseProject If CP not null
			closeProjectByProjectDetailId.setCloseApprovalValue(approval.getApprovalValue());
			
			if (closeProjectByProjectDetailId.getProfitIncurrent() != null) {
				profitIncurrent = closeProjectByProjectDetailId.getProfitIncurrent();
			}
			// Update Profit for CloseProject If CP not null
			if (closeProjectByProjectDetailId.getCloseWorkDoneValue() != null) {
				closeProjectByProjectDetailId
						.setProfit(approval.getApprovalValue() - closeProjectByProjectDetailId.getCloseWorkDoneValue());
				profit = closeProjectByProjectDetailId.getProfit();
			}
			closeProjectRepository.save(closeProjectByProjectDetailId);
		}
		

		projectDetail.setTotalRevenue(approval.getApprovalValue() + incurredApprovalValue);
		projectDetail.setTotalProfit(profit + profitIncurrent);
		projectDetailRepository.save(projectDetail);

		setProjectTotalRevenue(projectDetail.getProject());
		setProjectYearTotalRevenue(projectDetail.getProject().getProjectYear());

	}


	public void setRevenueForProjectDetail(ProjectDetail projectDetail, CloseProject closeProject) {
		Long projectDetailProfitByCP = 0L;
		if(closeProject.isClosed() == true) {
			projectDetailProfitByCP = (closeProject.getProfit() + closeProject.getProfitIncurrent());
		}
		Long projectDetailRevenueByCP = (closeProject.getCloseApprovalValue() + closeProject.getIncurApprovalValue());
		if (projectDetailProfitByCP != null || projectDetailRevenueByCP != null) {
			projectDetail.setTotalProfit(projectDetailProfitByCP);
			projectDetail.setTotalRevenue(projectDetailRevenueByCP);
			projectDetailRepository.save(projectDetail);
		}
	}

	public void setProjectTotalRevenue(Project project) {
		Long totalRevenue = 0L;
		Long totalProfit = 0L;
		List<SumRevenueOfProjectDto> totalProjectRevenue = projectRepository
				.sumProjectRevenueByProjectId(project.getId());
		if(totalProjectRevenue.get(0).getTotalProjectRevenue() != null) {
			totalRevenue = totalProjectRevenue.get(0).getTotalProjectRevenue();
		}
		if(totalProjectRevenue.get(0).getTotalProjectProfit() !=null) {
			totalProfit = totalProjectRevenue.get(0).getTotalProjectProfit();
		}
		project.setTotalProfit(totalProfit);
		project.setTotalRevenue(totalRevenue);
		projectRepository.save(project);
	}

	public void setProjectYearTotalRevenue(ProjectYear projectYear) {
		Long totalRevenue = 0L;
		Long totalProfit = 0L;
		List<SumRevenueOfProjectYearDto> totalProjectYearRevenue = projectYearRepository
				.sumRevenueByProjectYearId(projectYear.getId());
		if(totalProjectYearRevenue.get(0).getTotalProjectYearRevenue() != null) {
			totalRevenue = totalProjectYearRevenue.get(0).getTotalProjectYearRevenue();
		}
		if(totalProjectYearRevenue.get(0).getTotalProjectYearProfit() !=null) {
			totalProfit = totalProjectYearRevenue.get(0).getTotalProjectYearProfit();
		}
		projectYear.setTotalRevenue(totalRevenue);
		projectYear.setTotalProfit(totalProfit);
		projectYearRepository.save(projectYear);
	}

	public void removeCloseProject(ProjectYear projectYear, Project project, ProjectDetail projectDetail,
			CloseProject closeProject) {
		Long projectDetailProfitByCP = (closeProject.getProfit() + closeProject.getProfitIncurrent());
		Long projectDetailRevenueByCP = (closeProject.getCloseApprovalValue() + closeProject.getIncurApprovalValue());

//		Start minus ProjectYear Profit & Revenue

		projectYear.setTotalProfit(projectYear.getTotalProfit() - projectDetailProfitByCP);
		projectYear.setTotalRevenue(projectYear.getTotalRevenue() - projectDetailRevenueByCP);
		projectYearRepository.save(projectYear);
//		End minus ProjectYear Profit & Revenue
//		Start minus Project Profit & Revenue
		project.setTotalProfit(project.getTotalProfit() - projectDetailProfitByCP);
		project.setTotalRevenue(project.getTotalRevenue() - projectDetailRevenueByCP);
		projectRepository.save(project);
//		End minus Project Profit & Revenue
//		Start minus ProjectDetail Profit & Revenue
		projectDetail.setTotalProfit(projectDetail.getTotalProfit() - projectDetailProfitByCP);
		projectDetail.setTotalRevenue(projectDetail.getTotalRevenue() - projectDetailRevenueByCP);
		projectDetailRepository.save(projectDetail);
//		End minus ProjectDetail Profit & Revenue
	}

}
