package com.logsik.taman.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.Acceptance;
import com.logsik.taman.domain.Approval;
import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.domain.Complete;
import com.logsik.taman.domain.Contract;
import com.logsik.taman.domain.Efficiency;
import com.logsik.taman.domain.Incurred;
import com.logsik.taman.domain.InvoiceVer1;
import com.logsik.taman.domain.InvoiceVer2;
import com.logsik.taman.domain.InvoiceVer3;
import com.logsik.taman.domain.ProjectCost;
import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.domain.Quotation;
import com.logsik.taman.dtos.ProjectDetailProgressDto;
import com.logsik.taman.repository.AcceptanceRepository;
import com.logsik.taman.repository.ApprovalRepository;
import com.logsik.taman.repository.CloseProjectRepository;
import com.logsik.taman.repository.CompleteRepository;
import com.logsik.taman.repository.ContractRepository;
import com.logsik.taman.repository.EfficiencyRepository;
import com.logsik.taman.repository.IncurredRepository;
import com.logsik.taman.repository.InvoiceVer1Repository;
import com.logsik.taman.repository.InvoiceVer2Repository;
import com.logsik.taman.repository.InvoiceVer3Repository;
import com.logsik.taman.repository.ProjectCostRepository;
import com.logsik.taman.repository.ProjectDetailRepository;
import com.logsik.taman.repository.QuotationRepository;

@Service
@Transactional
public class ProjectDetailService {

	@Autowired
	AcceptanceRepository acceptanceRepository;
	@Autowired
	ApprovalRepository approvalRepository;
	@Autowired
	CloseProjectRepository closeProjectRepository;
	@Autowired
	CompleteRepository completeRepository;
	@Autowired
	ContractRepository contractRepository;
	@Autowired
	EfficiencyRepository efficiencyRepository;
	@Autowired
	IncurredRepository incurredRepository;
	@Autowired
	InvoiceVer1Repository invoiceVer1Repository;
	@Autowired
	InvoiceVer2Repository invoiceVer2Repository;
	@Autowired
	InvoiceVer3Repository invoiceVer3Repository;
	@Autowired
	QuotationRepository quotationRepository;

	@Autowired
	ProjectDetailRepository projectDetailRepository;

	@Autowired
	ProjectCostRepository projectCostRepository;

	@Autowired
	ProjectCostService projectCostService;

	@Autowired
	TotalRevenueService totalRevenueService;

	public ProjectDetailProgressDto findDtoById(Long projectDetailId) {
		ProjectDetailProgressDto projectDetailProgressDto = new ProjectDetailProgressDto();
		ProjectDetail projectDetail = projectDetailRepository.findDistinctById(projectDetailId);
		Acceptance acceptance = acceptanceRepository.findByProjectDetailId(projectDetailId);
		Approval approval = approvalRepository.findByProjectDetailId(projectDetailId);
		CloseProject closeProject = closeProjectRepository.findByProjectDetailId(projectDetailId);
		Complete complete = completeRepository.findByProjectDetailId(projectDetailId);
		Contract contract = contractRepository.findByProjectDetailId(projectDetailId);
		Efficiency efficiency = efficiencyRepository.findByProjectDetailId(projectDetailId);
		Incurred incurred = incurredRepository.findByProjectDetailId(projectDetailId);
		InvoiceVer1 invoiceVer1 = invoiceVer1Repository.findByProjectDetailId(projectDetailId);
		InvoiceVer2 invoiceVer2 = invoiceVer2Repository.findByProjectDetailId(projectDetailId);
		InvoiceVer3 invoiceVer3 = invoiceVer3Repository.findByProjectDetailId(projectDetailId);
		Quotation quotation = quotationRepository.findByProjectDetailId(projectDetailId);

		projectDetailProgressDto.setAcceptance(acceptance);
		projectDetailProgressDto.setApproval(approval);
		projectDetailProgressDto.setCloseProject(closeProject);
		projectDetailProgressDto.setComplete(complete);
		projectDetailProgressDto.setContract(contract);
		projectDetailProgressDto.setEfficiency(efficiency);
		projectDetailProgressDto.setIncurred(incurred);
		projectDetailProgressDto.setInvoiceVer1(invoiceVer1);
		projectDetailProgressDto.setInvoiceVer2(invoiceVer2);
		projectDetailProgressDto.setInvoiceVer3(invoiceVer3);
		projectDetailProgressDto.setQuotation(quotation);
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
		projectDetailProgressDto.setUserBudgetPermissions(projectDetail.getUserBudgetPermissions());
		return projectDetailProgressDto;

	}

	public void deleteAllItemInProjectDetailId(Long projectDetailId) {
//		ProjectDetail projectDetail = projectDetailRepository.findById(projectDetailId);
		Acceptance acceptance = acceptanceRepository.findByProjectDetailId(projectDetailId);
		Approval approval = approvalRepository.findByProjectDetailId(projectDetailId);
		CloseProject closeProject = closeProjectRepository.findByProjectDetailId(projectDetailId);
		Complete complete = completeRepository.findByProjectDetailId(projectDetailId);
		Contract contract = contractRepository.findByProjectDetailId(projectDetailId);
		Efficiency efficiency = efficiencyRepository.findByProjectDetailId(projectDetailId);
		Incurred incurred = incurredRepository.findByProjectDetailId(projectDetailId);
		InvoiceVer1 invoiceVer1 = invoiceVer1Repository.findByProjectDetailId(projectDetailId);
		InvoiceVer2 invoiceVer2 = invoiceVer2Repository.findByProjectDetailId(projectDetailId);
		InvoiceVer3 invoiceVer3 = invoiceVer3Repository.findByProjectDetailId(projectDetailId);
		Quotation quotation = quotationRepository.findByProjectDetailId(projectDetailId);
		List<ProjectCost> listProjectCostByProjectDetailId = projectCostRepository
				.findByProjectDetailId(projectDetailId);
		for (ProjectCost projectCost : listProjectCostByProjectDetailId) {
			projectCostService.deleteAllPaymentFollowByProjectCostId(projectCost.getId());
			projectCostRepository.deleteById(projectCost.getId());
		}
		if (acceptance != null) {
			acceptanceRepository.deleteById(acceptance.getId());
		}
		if (approval != null) {
			approvalRepository.deleteById(approval.getId());
		}
		if (closeProject != null) {
			closeProjectRepository.deleteById(closeProject.getId());
		}
		if (complete != null) {
			completeRepository.deleteById(complete.getId());
		}
		if (contract != null) {
			contractRepository.deleteById(contract.getId());
		}
		if (efficiency != null) {
			efficiencyRepository.deleteById(efficiency.getId());
		}
		if (incurred != null) {
			incurredRepository.deleteById(incurred.getId());
		}
		if (invoiceVer1 != null) {
			invoiceVer1Repository.deleteById(invoiceVer1.getId());
		}
		if (invoiceVer2 != null) {
			invoiceVer2Repository.deleteById(invoiceVer2.getId());
		}
		if (invoiceVer3 != null) {
			invoiceVer3Repository.deleteById(invoiceVer3.getId());
		}
		if (quotation != null) {
			quotationRepository.deleteById(quotation.getId());
		}

	}

}
