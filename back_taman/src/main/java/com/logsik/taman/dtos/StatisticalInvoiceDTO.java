package com.logsik.taman.dtos;

import java.util.List;

import com.logsik.taman.domain.InvoiceVer1;
import com.logsik.taman.domain.InvoiceVer2;
import com.logsik.taman.domain.InvoiceVer3;
import com.logsik.taman.domain.ProjectCost;
import com.logsik.taman.domain.Quotation;

public class StatisticalInvoiceDTO {

	private InvoiceVer1 invoicever1;
	private InvoiceVer2 invoicever2;
	private InvoiceVer3 invoicever3;
	private Quotation quotation;
	private List<ProjectCost> ProjectCosts;
	
	
	public InvoiceVer1 getInvoicever1() {
		return invoicever1;
	}
	public void setInvoicever1(InvoiceVer1 invoicever1) {
		this.invoicever1 = invoicever1;
	}
	public InvoiceVer2 getInvoicever2() {
		return invoicever2;
	}
	public void setInvoicever2(InvoiceVer2 invoicever2) {
		this.invoicever2 = invoicever2;
	}
	public InvoiceVer3 getInvoicever3() {
		return invoicever3;
	}
	public void setInvoicever3(InvoiceVer3 invoicever3) {
		this.invoicever3 = invoicever3;
	}
	public List<ProjectCost> getProjectCosts() {
		return ProjectCosts;
	}
	public void setProjectCosts(List<ProjectCost> projectCosts) {
		ProjectCosts = projectCosts;
	}
	public Quotation getQuotation() {
		return quotation;
	}
	public void setQuotation(Quotation quotation) {
		this.quotation = quotation;
	}

}
