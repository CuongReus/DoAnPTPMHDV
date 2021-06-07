package com.logsik.taman.dtos;

import java.io.Serializable;

public class SumRevenueOfProjectYearDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long totalProjectYearRevenue;
	private Long totalProjectYearProfit;
	public SumRevenueOfProjectYearDto(Long totalProjectYearRevenue,Long totalProjectYearProfit ) {
		setTotalProjectYearRevenue(totalProjectYearRevenue);
		setTotalProjectYearProfit(totalProjectYearProfit);
	}
	public Long getTotalProjectYearRevenue() {
		return totalProjectYearRevenue;
	}
	
	public void setTotalProjectYearRevenue(Long totalProjectYearRevenue) {
		this.totalProjectYearRevenue = totalProjectYearRevenue;
	}
	public Long getTotalProjectYearProfit() {
		return totalProjectYearProfit;
	}
	public void setTotalProjectYearProfit(Long totalProjectYearProfit) {
		this.totalProjectYearProfit = totalProjectYearProfit;
	} 
	
}
