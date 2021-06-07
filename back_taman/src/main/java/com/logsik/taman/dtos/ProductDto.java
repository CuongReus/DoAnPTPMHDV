
package com.logsik.taman.dtos;

import java.io.Serializable;

public class ProductDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long productCategoryId;
	private String name;
	private String code;
	private String unit;
	private Long minDiscountPrice;
	private String size;
	private Long price;
	private String note;
	private Long supplierId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProductCategoryId() {
		return productCategoryId;
	}

	public void setProductCategoryId(Long productCategoryId) {
		this.productCategoryId = productCategoryId;
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

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public Long getMinDiscountPrice() {
		return minDiscountPrice;
	}

	public void setMinDiscountPrice(Long minDiscountPrice) {
		this.minDiscountPrice = minDiscountPrice;
	}

}
