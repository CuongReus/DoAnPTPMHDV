package com.logsik.taman.dtos;

import java.io.Serializable;

public class SumLabourSupportAndAwareDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long labourId;
	private Long totalSupportFarConstructionStatus;
	private Long totalSupportTransportFeeStatus;
	private Long totalLateStatus;
	public SumLabourSupportAndAwareDto(Long labourId, Long totalSupportFarConstructionStatus,
			Long totalSupportTransportFeeStatus, Long totalLateStatus) {
		super();
		this.labourId = labourId;
		this.totalSupportFarConstructionStatus = totalSupportFarConstructionStatus;
		this.totalSupportTransportFeeStatus = totalSupportTransportFeeStatus;
		this.totalLateStatus = totalLateStatus;
	}
	public Long getLabourId() {
		return labourId;
	}
	public void setLabourId(Long labourId) {
		this.labourId = labourId;
	}
	public Long getTotalSupportFarConstructionStatus() {
		return totalSupportFarConstructionStatus;
	}
	public void setTotalSupportFarConstructionStatus(Long totalSupportFarConstructionStatus) {
		this.totalSupportFarConstructionStatus = totalSupportFarConstructionStatus;
	}
	public Long getTotalSupportTransportFeeStatus() {
		return totalSupportTransportFeeStatus;
	}
	public void setTotalSupportTransportFeeStatus(Long totalSupportTransportFeeStatus) {
		this.totalSupportTransportFeeStatus = totalSupportTransportFeeStatus;
	}
	public Long getTotalLateStatus() {
		return totalLateStatus;
	}
	public void setTotalLateStatus(Long totalLateStatus) {
		this.totalLateStatus = totalLateStatus;
	}
	
	
	

}
