package com.logsik.taman.dtos;

import java.io.Serializable;

public class SumStockQuantityAndPrice implements Serializable {
	private static final long serialVersionUID = 1L;
	private Double totalQuantity;
	private Long totalPrice;
	
	
	
	public SumStockQuantityAndPrice(Double totalQuantity, Long totalPrice) {
		super();
		this.totalQuantity = totalQuantity;
		this.totalPrice = totalPrice;
	}
	public Double getTotalQuantity() {
		return totalQuantity;
	}
	public void setTotalQuantity(Double totalQuantity) {
		this.totalQuantity = totalQuantity;
	}
	public Long getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}
	
}
