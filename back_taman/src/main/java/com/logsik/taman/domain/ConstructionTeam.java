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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
@Entity(name = "construction_team")
public class ConstructionTeam implements Serializable {
	private static final long serialVersionUID = 1L; 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="company_id",updatable = false, insertable =false)
	private Company company;
	
	@Column(name="company_id")
	private Long companyId;
	
	@Column
	private String teamLeaderName;
	
	@Column
	private String specialize;
	
	@Column
	private String leaderPhoneNumber;
	
	@Column 
	private String bankAccountNumber;
	
	@Lob
	@Column(columnDefinition = "longtext")
	private String note;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public String getTeamLeaderName() {
		return teamLeaderName;
	}

	public void setTeamLeaderName(String teamLeaderName) {
		this.teamLeaderName = teamLeaderName;
	}

	public String getSpecialize() {
		return specialize;
	}

	public void setSpecialize(String specialize) {
		this.specialize = specialize;
	}

	public String getLeaderPhoneNumber() {
		return leaderPhoneNumber;
	}

	public void setLeaderPhoneNumber(String leaderPhoneNumber) {
		this.leaderPhoneNumber = leaderPhoneNumber;
	}

	public String getBankAccountNumber() {
		return bankAccountNumber;
	}

	public void setBankAccountNumber(String bankAccountNumber) {
		this.bankAccountNumber = bankAccountNumber;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	
	
	
	
}
