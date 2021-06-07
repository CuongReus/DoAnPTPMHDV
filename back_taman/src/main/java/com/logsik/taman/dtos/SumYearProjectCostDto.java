package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class SumYearProjectCostDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long totalMoneyProjectCost = 0L; // total cost
	private Long totalPaidProjectCost = 0L; // paid
	private Integer year;
	private List<SumMonthProjectCostDto> listMonthProjectCosts = new ArrayList<>();
	
	public SumYearProjectCostDto(Integer year) {
		this.year = year;
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
	public List<SumMonthProjectCostDto> getListMonthProjectCosts() {
		return listMonthProjectCosts;
	}
	public void setListMonthProjectCosts(List<SumMonthProjectCostDto> listMonthProjectCosts) {
		this.listMonthProjectCosts = listMonthProjectCosts;
	} 
	
}
