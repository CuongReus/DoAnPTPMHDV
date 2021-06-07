
package com.logsik.taman.dtos;

import java.io.Serializable;

public class StockDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private Long productId;
	private Long storageLocationId;
	private Float quantity;
	private Long latestProductPrice;
	private String note;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Long getStorageLocationId() {
		return storageLocationId;
	}

	public void setStorageLocationId(Long storageLocationId) {
		this.storageLocationId = storageLocationId;
	}

	

	public Float getQuantity() {
		return quantity;
	}

	public void setQuantity(Float quantity) {
		this.quantity = quantity;
	}

	public Long getLatestProductPrice() {
		return latestProductPrice;
	}

	public void setLatestProductPrice(Long latestProductPrice) {
		this.latestProductPrice = latestProductPrice;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
