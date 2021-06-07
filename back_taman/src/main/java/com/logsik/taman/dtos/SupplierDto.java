package com.logsik.taman.dtos;

import java.io.Serializable;

import com.logsik.taman.enums.SupplierType;

public class SupplierDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String productProvideName;
	private String address;
	private String email;
	private String phoneNumber;
	private String bankAccountNumber;
	private String note;
	private SupplierType type;

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

	public String getProductProvideName() {
		return productProvideName;
	}

	public void setProductProvideName(String productProvideName) {
		this.productProvideName = productProvideName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
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

	public SupplierType getType() {
		return type;
	}

	public void setType(SupplierType type) {
		this.type = type;
	}

}
