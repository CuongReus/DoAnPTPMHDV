package com.logsik.taman.dtos;

public class ProjectPaymentCheckStatusDto {
	private Boolean productCostPaid;
	private Boolean labourCostPaid;
	private Boolean constructionTeamPaid;
	private Boolean otherCostPaid;
	
	public Boolean getProductCostPaid() {
		return productCostPaid;
	}
	public void setProductCostPaid(Boolean productCostPaid) {
		this.productCostPaid = productCostPaid;
	}
	public Boolean getLabourCostPaid() {
		return labourCostPaid;
	}
	public void setLabourCostPaid(Boolean labourCostPaid) {
		this.labourCostPaid = labourCostPaid;
	}
	public Boolean getConstructionTeamPaid() {
		return constructionTeamPaid;
	}
	public void setConstructionTeamPaid(Boolean constructionTeamPaid) {
		this.constructionTeamPaid = constructionTeamPaid;
	}
	public Boolean getOtherCostPaid() {
		return otherCostPaid;
	}
	public void setOtherCostPaid(Boolean otherCostPaid) {
		this.otherCostPaid = otherCostPaid;
	}
	
	
}
