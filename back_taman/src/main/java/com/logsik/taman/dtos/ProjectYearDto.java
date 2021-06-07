package com.logsik.taman.dtos;

import java.io.Serializable;

public class ProjectYearDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long companyId;
	private Integer year;
	private String note;
	private Long totalRevenue;
	private Long totalProfit;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Long getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(Long totalRevenue) {
		this.totalRevenue = totalRevenue;
	}

	public Long getTotalProfit() {
		return totalProfit;
	}

	public void setTotalProfit(Long totalProfit) {
		this.totalProfit = totalProfit;
	}

}
