package com.logsik.taman.dtos;

import java.io.Serializable;

public class AnnualLeaveYearDto implements Serializable{
	private static final long serialVersionUID = 1L;
	private Long userId;
	private Float annualLeaveYear;
	private Integer year;
	
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Integer getYear() {
		return year;
	}
	public void setYear(Integer year) {
		this.year = year;
	}
	public Float getAnnualLeaveYear() {
		return annualLeaveYear;
	}
	public void setAnnualLeaveYear(Float annualLeaveYear) {
		this.annualLeaveYear = annualLeaveYear;
	}
	
	
	

}
