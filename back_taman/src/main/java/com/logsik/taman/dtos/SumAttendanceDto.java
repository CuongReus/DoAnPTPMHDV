package com.logsik.taman.dtos;

import java.io.Serializable;

public class SumAttendanceDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long labourId;
	private Double totalTime;
	
	public SumAttendanceDto(Long labourId, Double totalTime) {
		super();
		this.labourId = labourId;
		this.totalTime = totalTime;
	}
	public Long getLabourId() {
		return labourId;
	}
	public void setLabourId(Long labourId) {
		this.labourId = labourId;
	}
	public Double getTotalTime() {
		return totalTime;
	}
	public void setTotalTime(Double totalTime) {
		this.totalTime = totalTime;
	}
	
	
	
}
