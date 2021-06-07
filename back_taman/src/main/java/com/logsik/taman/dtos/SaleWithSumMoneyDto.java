package com.logsik.taman.dtos;

import java.io.Serializable;

public class SaleWithSumMoneyDto implements Serializable{
	private static final long serialVersionUID = 1L;
	private Object saleObject;
	private Long totalMoneyPaid;
	private Long totalMoneyUnPaid;
	private Long totalMoneyConsignment;
	public SaleWithSumMoneyDto() {
		
	}
	
	public SaleWithSumMoneyDto(Long totalMoneyPaid, Long totalMoneyUnPaid, Long totalMoneyConsignment) {
		super();
		this.totalMoneyPaid = totalMoneyPaid;
		this.totalMoneyUnPaid = totalMoneyUnPaid;
		this.totalMoneyConsignment = totalMoneyConsignment;
	}
	
	
	public Object getSaleObject() {
		return saleObject;
	}
	public void setSaleObject(Object saleObject) {
		this.saleObject = saleObject;
	}
	public Long getTotalMoneyPaid() {
		return totalMoneyPaid;
	}
	public void setTotalMoneyPaid(Long totalMoneyPaid) {
		this.totalMoneyPaid = totalMoneyPaid;
	}
	public Long getTotalMoneyUnPaid() {
		return totalMoneyUnPaid;
	}
	public void setTotalMoneyUnPaid(Long totalMoneyUnPaid) {
		this.totalMoneyUnPaid = totalMoneyUnPaid;
	}

	public Long getTotalMoneyConsignment() {
		return totalMoneyConsignment;
	}

	public void setTotalMoneyConsignment(Long totalMoneyConsignment) {
		this.totalMoneyConsignment = totalMoneyConsignment;
	}
	
	
	

}
