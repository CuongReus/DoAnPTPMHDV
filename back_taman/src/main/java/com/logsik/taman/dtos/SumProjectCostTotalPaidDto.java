package com.logsik.taman.dtos;

public class SumProjectCostTotalPaidDto {
	private Long projectDetailId;
	private Long totalPaid;
	
	
	public SumProjectCostTotalPaidDto(Long projectDetailId, Long totalPaid) {
		super();
		this.projectDetailId = projectDetailId;
		this.totalPaid = totalPaid;
	}
	public Long getProjectDetailId() {
		return projectDetailId;
	}
	public void setProjectDetailId(Long projectDetailId) {
		this.projectDetailId = projectDetailId;
	}
	public Long getTotalPaid() {
		return totalPaid;
	}
	public void setTotalPaid(Long totalPaid) {
		this.totalPaid = totalPaid;
	}
	
}
