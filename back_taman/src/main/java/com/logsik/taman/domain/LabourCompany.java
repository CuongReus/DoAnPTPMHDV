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

@Entity(name = "labour_company")
public class LabourCompany implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "labour_id",updatable=false,insertable=false)
	private Labour labour;
	
	@Column(name="labour_id")
	private Long labourId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "company_id",updatable=false,insertable=false)
	private Company company;
	
	@Column(name="company_id")
	private Long companyId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Labour getLabour() {
		return labour;
	}

	public void setLabour(Labour labour) {
		this.labour = labour;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}



	public Long getLabourId() {
		return labourId;
	}

	public void setLabourId(Long labourId) {
		this.labourId = labourId;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	

}
