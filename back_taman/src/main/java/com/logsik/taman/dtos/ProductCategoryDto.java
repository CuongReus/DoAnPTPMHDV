package com.logsik.taman.dtos;

import java.io.Serializable;

public class ProductCategoryDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String code;
	private Long supplierId;
	private String note;
	private Integer salesMargin;

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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	


	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Integer getSalesMargin() {
		return salesMargin;
	}

	public void setSalesMargin(Integer salesMargin) {
		this.salesMargin = salesMargin;
	}
	

}
