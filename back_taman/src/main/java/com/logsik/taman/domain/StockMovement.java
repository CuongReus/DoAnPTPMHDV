package com.logsik.taman.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.logsik.taman.enums.MovementType;

@Entity(name = "stock_movement")
public class StockMovement implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", insertable = false, updatable = false)
	private Product product;

	@Column(name = "product_id")
	private Long productId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "stock_id", insertable = false, updatable = false)
	private Stock stock;

	@Column(name = "stock_id")
	private Long stockId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sale_id", insertable = false, updatable = false)
	private Sale sale;

	@Column(name = "sale_id")
	private Long saleId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_user_id", updatable = false,insertable = false)
	private User createdUser;
	
	
	@Column(name="created_user_id")
	private Long createdUserId;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "lasted_update_user_id", updatable = false,insertable = false)
	private User lastedUpdateUser;

	@Column(name="lasted_update_user_id")
	private Long lastedUpdateUserId;
	@Column
	@Temporal(TemporalType.DATE)
	private Date createdDate;

	@Column
	@Temporal(TemporalType.DATE)
	private Date lastedUpdateDate;
	@Column
	@Temporal(TemporalType.DATE)
	private Date movementDate;

	@Column
	private String movementStockReport;

	@Column
	private Float quantity;
	
	@Column
	private Float shotQuantity;

	@Column
	private Long movementItemPrice;

	@Column
	private Long totalPrice;

	@Column
	private String invoiceNumber;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private MovementType movementType;

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

	public Date getMovementDate() {
		return movementDate;
	}

	public void setMovementDate(Date movementDate) {
		this.movementDate = movementDate;
	}

	public String getMovementStockReport() {
		return movementStockReport;
	}

	public void setMovementStockReport(String movementStockReport) {
		this.movementStockReport = movementStockReport;
	}

	public Float getQuantity() {
		return quantity;
	}

	public void setQuantity(Float quantity) {
		this.quantity = quantity;
	}

	public Long getMovementItemPrice() {
		return movementItemPrice;
	}

	public void setMovementItemPrice(Long movementItemPrice) {
		this.movementItemPrice = movementItemPrice;
	}

	public Long getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public MovementType getMovementType() {
		return movementType;
	}

	public void setMovementType(MovementType movementType) {
		this.movementType = movementType;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public User getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}

	public User getLastedUpdateUser() {
		return lastedUpdateUser;
	}

	public void setLastedUpdateUser(User lastedUpdateUser) {
		this.lastedUpdateUser = lastedUpdateUser;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getLastedUpdateDate() {
		return lastedUpdateDate;
	}

	public void setLastedUpdateDate(Date lastedUpdateDate) {
		this.lastedUpdateDate = lastedUpdateDate;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Long getStockId() {
		return stockId;
	}

	public void setStockId(Long stockId) {
		this.stockId = stockId;
	}

	public Long getCreatedUserId() {
		return createdUserId;
	}

	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}

	public Long getLastedUpdateUserId() {
		return lastedUpdateUserId;
	}

	public void setLastedUpdateUserId(Long lastedUpdateUserId) {
		this.lastedUpdateUserId = lastedUpdateUserId;
	}

	public Long getSaleId() {
		return saleId;
	}

	public void setSaleId(Long saleId) {
		this.saleId = saleId;
	}

	public Sale getSale() {
		return sale;
	}

	public Float getShotQuantity() {
		return shotQuantity;
	}

	public void setShotQuantity(Float shotQuantity) {
		this.shotQuantity = shotQuantity;
	}
	
	
	

}
