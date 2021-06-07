	package com.logsik.taman.dtos;
	
	import java.io.Serializable;
		
	public class StockMovementLocationDto implements Serializable {
		private static final long serialVersionUID = 1L;
		private Long id;
		private Long productId;
		private Long storageLocationId;
		private String storageLocationName;
		private Double totalInputStockQuantity;
		private Double totalOutputStockQuantity;
		private Double totalStockQuantity;
		private Double totalProductPrice;
//		private Double totalQuantityAllLocation;
//		private Long totalProductPriceAllLocation;
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
		public String getStorageLocationName() {
			return storageLocationName;
		}
		public void setStorageLocationName(String storageLocationName) {
			this.storageLocationName = storageLocationName;
		}
		public Double getTotalStockQuantity() {
			return totalStockQuantity;
		}
		public void setTotalStockQuantity(Double totalStockQuantity) {
			this.totalStockQuantity = totalStockQuantity;
		}
		public Double getTotalProductPrice() {
			return totalProductPrice;
		}
		public void setTotalProductPrice(Double totalProductPrice) {
			this.totalProductPrice = totalProductPrice;
		}
		public Double getTotalInputStockQuantity() {
			return totalInputStockQuantity;
		}
		public void setTotalInputStockQuantity(Double totalInputStockQuantity) {
			this.totalInputStockQuantity = totalInputStockQuantity;
		}
		public Double getTotalOutputStockQuantity() {
			return totalOutputStockQuantity;
		}
		public void setTotalOutputStockQuantity(Double totalOutputStockQuantity) {
			this.totalOutputStockQuantity = totalOutputStockQuantity;
		}
		
	
	
	}
