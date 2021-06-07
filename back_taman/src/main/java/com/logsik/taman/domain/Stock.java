
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

@Entity(name = "stock")
public class Stock implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", updatable = false, insertable = false)
	private Product product;

	@Column(name = "product_id")
	private Long productId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "storage_location_id", updatable = false, insertable = false)
	private StorageLocation storageLocation;

	@Column(name = "storage_location_id")
	private Long storageLocationId;

	@Column
	private Float quantity;

	@Column
	private Long latestProductPrice;

	@Lob
	@Column(columnDefinition = "longtext")
	private String note;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public StorageLocation getStorageLocation() {
		return storageLocation;
	}

	public void setStorageLocation(StorageLocation storageLocation) {
		this.storageLocation = storageLocation;
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
	

}
