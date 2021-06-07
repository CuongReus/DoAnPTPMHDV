package com.logsik.taman.dtos;

import java.io.Serializable;

import com.logsik.taman.enums.PaymentStatus;

public class SumTotalPaidDto  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long projectCostId;
	private Long totalPaid;
	private PaymentStatus status;
	
	
	
	public SumTotalPaidDto() {
		super();
	}
	public SumTotalPaidDto(Long totalPaid) {
		super();
//		this.projectCostId = projectCostId;
		this.totalPaid = totalPaid;
//		this.status = status;
	}
	public Long getProjectCostId() {
		return projectCostId;
	}
	public void setProjectCostId(Long projectCostId) {
		this.projectCostId = projectCostId;
	}
	public Long getTotalPaid() {
		return totalPaid;
	}
	public void setTotalPaid(Long totalPaid) {
		this.totalPaid = totalPaid;
	}
	public PaymentStatus getStatus() {
		return status;
	}
	public void setStatus(PaymentStatus status) {
		this.status = status;
	}
	
	
	

}
