package com.logsik.taman.dtos;

import java.io.Serializable;

public class StockWithSumDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Object stockObject;
	private Double sumStockQuantity;
	private Long sumStockMoney;

	public Object getStockObject() {
		return stockObject;
	}

	public void setStockObject(Object stockObject) {
		this.stockObject = stockObject;
	}



	public Double getSumStockQuantity() {
		return sumStockQuantity;
	}

	public void setSumStockQuantity(Double sumStockQuantity) {
		this.sumStockQuantity = sumStockQuantity;
	}

	public Long getSumStockMoney() {
		return sumStockMoney;
	}

	public void setSumStockMoney(Long sumStockMoney) {
		this.sumStockMoney = sumStockMoney;
	}

}
