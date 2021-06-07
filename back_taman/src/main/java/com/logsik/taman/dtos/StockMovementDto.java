package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.logsik.taman.enums.MovementType;

public class StockMovementDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long productId;
	private	Long stockId;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private Date movementDate;
	private String movementStockReport;
	private Long saleId;
	private Float quantity;
	private Float shotQuantity;
	private Long movementItemPrice;
	private Long totalPrice;
	private String invoiceNumber;
	private MovementType movementType;
	private String note;
	private List<UploadFileResponse> movementStockInputReportFile = new ArrayList<>();
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
	public List<UploadFileResponse> getMovementStockInputReportFile() {
		return movementStockInputReportFile;
	}
	public void setMovementStockInputReportFile(List<UploadFileResponse> movementStockInputReportFile) {
		this.movementStockInputReportFile = movementStockInputReportFile;
	}
	public Long getSaleId() {
		return saleId;
	}
	public void setSaleId(Long saleId) {
		this.saleId = saleId;
	}
	public Float getShotQuantity() {
		return shotQuantity;
	}
	public void setShotQuantity(Float shotQuantity) {
		this.shotQuantity = shotQuantity;
	}
	
	
	
}
