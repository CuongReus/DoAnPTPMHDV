package com.logsik.taman.dtos;

public class InvoiceRalationDTO {
	
	private Long id;
	private Long projectDetailId;
	private Long invoiceVer1Id;
	private Long invoiceVer2Id;
	private Long invoiceVer3Id;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getProjectDetailId() {
		return projectDetailId;
	}
	public void setProjectDetailId(Long projectDetailId) {
		this.projectDetailId = projectDetailId;
	}
	public Long getInvoiceVer1Id() {
		return invoiceVer1Id;
	}
	public void setInvoiceVer1Id(Long invoiceVer1Id) {
		this.invoiceVer1Id = invoiceVer1Id;
	}
	public Long getInvoiceVer2Id() {
		return invoiceVer2Id;
	}
	public void setInvoiceVer2Id(Long invoiceVer2Id) {
		this.invoiceVer2Id = invoiceVer2Id;
	}
	public Long getInvoiceVer3Id() {
		return invoiceVer3Id;
	}
	public void setInvoiceVer3Id(Long invoiceVer3Id) {
		this.invoiceVer3Id = invoiceVer3Id;
	}
	
}
