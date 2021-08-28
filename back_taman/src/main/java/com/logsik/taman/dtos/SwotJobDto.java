package com.logsik.taman.dtos;

import java.io.Serializable;

import com.logsik.taman.enums.SwotType;

public class SwotJobDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private Long swotItemId;
	private Long jobId;
	private String description;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getSwotItemId() {
		return swotItemId;
	}
	public void setSwotItemId(Long swotItemId) {
		this.swotItemId = swotItemId;
	}
	public Long getJobId() {
		return jobId;
	}
	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
