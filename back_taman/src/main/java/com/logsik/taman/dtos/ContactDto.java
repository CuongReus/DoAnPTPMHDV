package com.logsik.taman.dtos;

import java.io.Serializable;

import com.logsik.taman.enums.ContactStatus;

public class ContactDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String taxNumber;
	private String address;
	private String note;
	private ContactStatus contactStatus;
	private Integer discountPercent;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTaxNumber() {
		return taxNumber;
	}
	public void setTaxNumber(String taxNumber) {
		this.taxNumber = taxNumber;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public ContactStatus getContactStatus() {
		return contactStatus;
	}
	public void setContactStatus(ContactStatus contactStatus) {
		this.contactStatus = contactStatus;
	}
	public Integer getDiscountPercent() {
		return discountPercent;
	}
	public void setDiscountPercent(Integer discountPercent) {
		this.discountPercent = discountPercent;
	}

	

}
