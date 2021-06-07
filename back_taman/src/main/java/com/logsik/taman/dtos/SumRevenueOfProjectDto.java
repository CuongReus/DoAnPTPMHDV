package com.logsik.taman.dtos;

import java.io.Serializable;

public class SumRevenueOfProjectDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long totalProjectRevenue;
	private Long totalProjectProfit;
	
	public SumRevenueOfProjectDto(Long totalProjectRevenue,Long totalProjectProfit) {
		setTotalProjectRevenue(totalProjectRevenue);
		setTotalProjectProfit(totalProjectProfit);
	}

	public Long getTotalProjectRevenue() {
		return totalProjectRevenue;
	}

	public void setTotalProjectRevenue(Long totalProjectRevenue) {
		this.totalProjectRevenue = totalProjectRevenue;
	}

	public Long getTotalProjectProfit() {
		return totalProjectProfit;
	}

	public void setTotalProjectProfit(Long totalProjectProfit) {
		this.totalProjectProfit = totalProjectProfit;
	}
	
	

}
