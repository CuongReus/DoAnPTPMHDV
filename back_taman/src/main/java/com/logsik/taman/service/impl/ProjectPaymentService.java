package com.logsik.taman.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.ProjectBudget;
import com.logsik.taman.domain.ProjectCost;
import com.logsik.taman.dtos.ProjectDetailProgressDto;
import com.logsik.taman.dtos.ProjectPaymentCheckStatusDto;
import com.logsik.taman.dtos.ProjectPaymentDto;
import com.logsik.taman.enums.ProjectCostStatus;
import com.logsik.taman.enums.ProjectPaymentType;
import com.logsik.taman.repository.PaymentRepository;
import com.logsik.taman.repository.ProjectBudgetRepository;
import com.logsik.taman.repository.ProjectCostRepository;

@Service
public class ProjectPaymentService {

	@Autowired
	private ProjectDetailService projectDetailService;

	@Autowired
	private ProjectCostRepository projectCostRepository;

	@Autowired
	private ProjectBudgetRepository projectBudgetRepository;

	@Autowired
	private PaymentRepository paymentRepository;

	public ProjectPaymentDto findDtoByProjectDetailDto(Long projectDetailId) {
		ProjectPaymentDto projectPaymentDto = new ProjectPaymentDto();
		ProjectDetailProgressDto projectDetailProgressDto = projectDetailService.findDtoById(projectDetailId);

		ProjectBudget projectBudget = projectBudgetRepository.findByProjectDetailId(projectDetailId);

		List<ProjectCost> listProductCost = projectCostRepository.findByProjectDetailIdAndPaymentType(projectDetailId,
				ProjectPaymentType.VAT_TU);
		List<ProjectCost> listLabourCost = projectCostRepository.findByProjectDetailIdAndPaymentType(projectDetailId,
				ProjectPaymentType.NHAN_CONG);
		List<ProjectCost> listOtherCost = projectCostRepository.findByProjectDetailIdAndPaymentType(projectDetailId,
				ProjectPaymentType.CHI_PHI_KHAC);
		List<ProjectCost> listConstructionTeamCost = projectCostRepository
				.findByProjectDetailIdAndPaymentType(projectDetailId, ProjectPaymentType.DOI_THI_CONG);
		projectPaymentDto.setProjectDetailDto(projectDetailProgressDto);
		projectPaymentDto.setProjectBudget(projectBudget);
		projectPaymentDto.setListProductCost(listProductCost);
		projectPaymentDto.setListLabourCost(listLabourCost);
		projectPaymentDto.setListOtherCost(listOtherCost);
		projectPaymentDto.setListConstructionTeamCost(listConstructionTeamCost);

		return projectPaymentDto;
	}

	public ProjectPaymentCheckStatusDto projectPaymentStatusCheck(Long projectDetailId) {
		ProjectPaymentCheckStatusDto projectPaymentCheckStatusDto = new ProjectPaymentCheckStatusDto();
		List<ProjectCost> listProductCost = projectCostRepository.findByProjectDetailIdAndPaymentTypeAndStatus(
				projectDetailId, ProjectPaymentType.VAT_TU, ProjectCostStatus.CHUA_THANH_TOAN_DU);
		List<ProjectCost> listLabourCost = projectCostRepository.findByProjectDetailIdAndPaymentTypeAndStatus(
				projectDetailId, ProjectPaymentType.NHAN_CONG, ProjectCostStatus.CHUA_THANH_TOAN_DU);
		List<ProjectCost> listOtherCost = projectCostRepository.findByProjectDetailIdAndPaymentTypeAndStatus(
				projectDetailId, ProjectPaymentType.CHI_PHI_KHAC, ProjectCostStatus.CHUA_THANH_TOAN_DU);
		List<ProjectCost> listConstructionTeamCost = projectCostRepository.findByProjectDetailIdAndPaymentTypeAndStatus(
				projectDetailId, ProjectPaymentType.DOI_THI_CONG, ProjectCostStatus.CHUA_THANH_TOAN_DU);

		Boolean productCostPaid = true;
		Boolean labourCostPaid = true;
		Boolean otherCostPaid = true;
		Boolean constructionTeamPaid = true;
		if (!listProductCost.isEmpty()) {
			productCostPaid = false;
		}
		if (!listLabourCost.isEmpty()) {
			labourCostPaid = false;
		}
		if (!listOtherCost.isEmpty()) {
			otherCostPaid = false;
		}
		if (!listConstructionTeamCost.isEmpty()) {
			constructionTeamPaid = false;
		}
		projectPaymentCheckStatusDto.setProductCostPaid(productCostPaid);
		projectPaymentCheckStatusDto.setLabourCostPaid(labourCostPaid);
		projectPaymentCheckStatusDto.setOtherCostPaid(otherCostPaid);
		projectPaymentCheckStatusDto.setConstructionTeamPaid(constructionTeamPaid);

		return projectPaymentCheckStatusDto;
	}

//	

}
