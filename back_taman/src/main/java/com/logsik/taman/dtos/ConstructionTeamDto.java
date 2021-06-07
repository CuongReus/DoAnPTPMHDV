package com.logsik.taman.dtos;

import java.io.Serializable;

public class ConstructionTeamDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long companyId;
	private String teamLeaderName;
	private String specialize;
	private String leaderPhoneNumber;
	private String bankAccountNumber;
	private String note;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
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
	
	

}
