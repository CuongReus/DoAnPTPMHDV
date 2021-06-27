package com.logsik.taman.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.domain.ProjectCost;
import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.dtos.SumProjectCostTotalPaidDto;
import com.logsik.taman.dtos.SumTotalPaidDto;
import com.logsik.taman.enums.PaymentStatus;
import com.logsik.taman.enums.ProjectPaymentType;
import com.logsik.taman.repository.ProjectCostRepository;
import com.logsik.taman.repository.ProjectDetailRepository;

@Service
@Transactional
public class ProjectCostService {
	@Autowired
	private ProjectCostRepository projectCostRepository;
	@Autowired
	private ProjectDetailRepository projectDetailRepository;
	@Autowired
	private TotalRevenueService totalRevenueService;

	public void updateLotNumber(Long projectDetailId, ProjectPaymentType paymentType) {
		Integer lotNumber = 0;
		List<ProjectCost> listCurrentProjectCost = projectCostRepository
				.findByProjectDetailIdAndPaymentType(projectDetailId, paymentType);
		for (ProjectCost projectCost : listCurrentProjectCost) {
//			lotNumber++;
			projectCost.setLotNumber(lotNumber);
			projectCostRepository.save(projectCost);
		}

	}
	
//	This method for CloseProject
	
	public void setTotalWorkDoneMoney(CloseProject closeProject ) {
		Long sumTotalPaidByProjectDetail = 0L;
		Long totalProfit = 0L;
		SumProjectCostTotalPaidDto sumProjectCostTotalPaidDto =   projectCostRepository.sumProjectCostTotalPaidDto(closeProject.getProjectDetailId());
		if(sumProjectCostTotalPaidDto !=null) {
			sumTotalPaidByProjectDetail = sumProjectCostTotalPaidDto.getTotalPaid();
		}
		
		closeProject.setCloseWorkDoneValue(sumTotalPaidByProjectDetail);
		if(closeProject.getCloseWorkDoneValue() !=null && closeProject.getCloseWorkDoneValue() !=0 ) {
			totalProfit=(closeProject.getCloseApprovalValue()-closeProject.getCloseWorkDoneValue());
		}
		
		
		closeProject.setProfit(totalProfit);
		Optional<ProjectDetail> currentProjectDetailRevenueAndProfit = projectDetailRepository.findById(closeProject.getProjectDetailId());
		totalRevenueService.setRevenueForProjectDetail(currentProjectDetailRevenueAndProfit.get(),closeProject);
		totalRevenueService.setProjectTotalRevenue(currentProjectDetailRevenueAndProfit.get().getProject());
		totalRevenueService.setProjectYearTotalRevenue(currentProjectDetailRevenueAndProfit.get().getProject().getProjectYear());
	}

}
