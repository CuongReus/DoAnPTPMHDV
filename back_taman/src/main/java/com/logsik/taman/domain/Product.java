
package com.logsik.taman.domain;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity(name = "product")
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_category_id",updatable=false,insertable=false)
	private ProductCategory productCategory;
	
	@Column(name="product_category_id")
	private Long productCategoryId;
	
	
	@Column
	private String name;

	@Column
	private String code;

	@Column
	private String unit;

	@Column
	private String size;
	
	@Column
	private Long minDiscountPrice;

	@Column
	private Long price;

	@Lob
	@Column(columnDefinition = "longtext")
	private String note;
	
//	supplier_id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "supplier_id",updatable=false,insertable=false)
	private Supplier  supplier; 
	
	@Column(name="supplier_id")
	private Long supplierId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

	public ProductCategory getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(ProductCategory productCategory) {
		this.productCategory = productCategory;
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

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	

	public Long getProductCategoryId() {
		return productCategoryId;
	}

	public void setProductCategoryId(Long productCategoryId) {
		this.productCategoryId = productCategoryId;
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
