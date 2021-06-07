package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.List;

import com.logsik.taman.domain.ProductCategory;
import com.logsik.taman.domain.Supplier;

public class StockDetailDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long productId;
	private ProductCategory productCategory;
	private Supplier supplier;
	private String productSize;
	private String productCode;
	private String productUnit;
	private Long productPrice;
	private String productName;
	private Float totalQuantityAllStorage;
	private Long totalProductPriceAllStorage;
	private List<StockQuantityByStorageDto> listQuantityByStorage;
	
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

	public ProductCategory getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(ProductCategory productCategory) {
		this.productCategory = productCategory;
	}

	public String getProductSize() {
		return productSize;
	}

	public void setProductSize(String productSize) {
		this.productSize = productSize;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getProductUnit() {
		return productUnit;
	}

	public void setProductUnit(String productUnit) {
		this.productUnit = productUnit;
	}

	public Long getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(Long productPrice) {
		this.productPrice = productPrice;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	

	public List<StockQuantityByStorageDto> getListQuantityByStorage() {
		return listQuantityByStorage;
	}

	public void setListQuantityByStorage(List<StockQuantityByStorageDto> listQuantityByStorage) {
		this.listQuantityByStorage = listQuantityByStorage;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public Float getTotalQuantityAllStorage() {
		return totalQuantityAllStorage;
	}

	public void setTotalQuantityAllStorage(Float totalQuantityAllStorage) {
		this.totalQuantityAllStorage = totalQuantityAllStorage;
	}

	public Long getTotalProductPriceAllStorage() {
		return totalProductPriceAllStorage;
	}

	public void setTotalProductPriceAllStorage(Long totalProductPriceAllStorage) {
		this.totalProductPriceAllStorage = totalProductPriceAllStorage;
	}

	

	

}
