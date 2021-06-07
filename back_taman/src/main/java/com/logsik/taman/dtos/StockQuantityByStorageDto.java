package com.logsik.taman.dtos;

import java.io.Serializable;

public class StockQuantityByStorageDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long stockId;
	private Long storageLocationId;
	private Float totalQuantity;
	private Long totalPrice;
	
	public Long getStockId() {
		return stockId;
	}
	public void setStockId(Long stockId) {
		this.stockId = stockId;
	}
	public Long getStorageLocationId() {
		return storageLocationId;
	}
	public void setStorageLocationId(Long storageLocationId) {
		this.storageLocationId = storageLocationId;
	}
	public Float getTotalQuantity() {
		return totalQuantity;
	}
	public void setTotalQuantity(Float totalQuantity) {
		this.totalQuantity = totalQuantity;
	}
	public Long getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	
	

}
