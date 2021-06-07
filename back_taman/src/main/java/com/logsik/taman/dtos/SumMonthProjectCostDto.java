package com.logsik.taman.dtos;

import java.io.Serializable;

public class SumMonthProjectCostDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long totalMoneyProjectCost; // total cost
	private Long totalPaidProjectCost; // paid
	private Integer year;
	private Integer month;
	public SumMonthProjectCostDto(Integer month, Long totalMoneyProjectCost, Long totalPaidProjectCost) {
		setMonth(month);
		setTotalMoneyProjectCost(totalMoneyProjectCost);
		setTotalPaidProjectCost(totalPaidProjectCost);
//		this.year = year;
	}
	public Long getTotalMoneyProjectCost() {
		return totalMoneyProjectCost;
	}
	
	public void setTotalMoneyProjectCost(Long totalMoneyProjectCost) {
		this.totalMoneyProjectCost = totalMoneyProjectCost;
	}
	public Long getTotalPaidProjectCost() {
		return totalPaidProjectCost;
	}
	public void setTotalPaidProjectCost(Long totalPaidProjectCost) {
		this.totalPaidProjectCost = totalPaidProjectCost;
	}
	public Integer getYear() {
		return year;
	}
	public void setYear(Integer year) {
		this.year = year;
	}
	public Integer getMonth() {
		return month;
	}
	public void setMonth(Integer month) {
		this.month = month;
	} 
	
}
