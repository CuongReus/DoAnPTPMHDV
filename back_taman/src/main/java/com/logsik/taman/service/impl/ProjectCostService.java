package com.logsik.taman.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.domain.Payment;
import com.logsik.taman.domain.ProjectCost;
import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.dtos.SumProjectCostTotalPaidDto;
import com.logsik.taman.dtos.SumTotalPaidDto;
import com.logsik.taman.enums.PaymentStatus;
import com.logsik.taman.enums.ProjectPaymentType;
import com.logsik.taman.repository.PaymentRepository;
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
	private PaymentRepository paymentRepository;
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

	public ProjectCost updateTotalPaidByProjectCost(Long projectCostId) {
		Optional<ProjectCost> projectCost = projectCostRepository.findById(projectCostId);

		SumTotalPaidDto sumTotalPaid = paymentRepository.sumTotalPaidByProjectCostId(projectCostId);
		if (sumTotalPaid != null) {
			sumTotalPaid.setProjectCostId(projectCostId);
			projectCost.get().setTotalPaid(sumTotalPaid.getTotalPaid());
		} else {
			projectCost.get().setTotalPaid(0l);
		}
		ProjectCost result = projectCostRepository.save(projectCost.get());
		return result;
	}

	public void ApprovalAllPayment(ProjectCost projectCost) {
		Long totalMoney = 0L;
		List<Payment> listPaymentByProjectCostId = paymentRepository.findByProjectCostId(projectCost.getId());
		if (!listPaymentByProjectCostId.isEmpty()) {
			for (Payment payment : listPaymentByProjectCostId) {
				if ("CHUA_DUYET_THANH_TOAN".equals(payment.getStatus().toString())) {

					payment.setStatus(PaymentStatus.DA_DUYET_THANH_TOAN);
					payment.setPaymentDate(projectCost.getCloseDate());
					updateTotalPaidByProjectCost(projectCost.getId());
				}

			}
		} else if (listPaymentByProjectCostId.isEmpty()) {
			if ("DA_THANH_TOAN_DU".equals(projectCost.getStatus().toString())) {
				if (projectCost.getTotalMoney() != null) {
					totalMoney = projectCost.getTotalMoney();
				}
				projectCost.setTotalPaid(totalMoney);
			}
		}
	}

	public void deleteAllPaymentFollowByProjectCostId(Long projectCostId) {
		List<Payment> listPaymentByProjectCostId = paymentRepository.findByProjectCostId(projectCostId);
		for (Payment payment : listPaymentByProjectCostId) {
			paymentRepository.deleteById(payment.getId());
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
