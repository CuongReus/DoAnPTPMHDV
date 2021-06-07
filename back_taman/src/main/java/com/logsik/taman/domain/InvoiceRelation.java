package com.logsik.taman.domain;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "invoice_relation")
public class InvoiceRelation implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_detail_id", updatable = false,insertable= false)
	private ProjectDetail projectDetail;
	
	@Column(name= "project_detail_id")
	private Long projectDetailId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "invoice_ver1_id", updatable = false,insertable= false)
	private InvoiceVer1 invoiceVer1;
	
	@Column(name= "invoice_ver1_id")
	private Long invoiceVer1Id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "invoice_ver2_id", updatable = false,insertable= false)
	private InvoiceVer2 invoiceVer2;
	
	@Column(name= "invoice_ver2_id")
	private Long invoiceVer2Id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "invoice_ver3_id", updatable = false,insertable= false)
	private InvoiceVer3 invoiceVer3;
	
	@Column(name= "invoice_ver3_id")
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

	public ProjectDetail getProjectDetail() {
		return projectDetail;
	}

	public InvoiceVer1 getInvoiceVer1() {
		return invoiceVer1;
	}

	public InvoiceVer2 getInvoiceVer2() {
		return invoiceVer2;
	}

	public InvoiceVer3 getInvoiceVer3() {
		return invoiceVer3;
	}
	
	
}
