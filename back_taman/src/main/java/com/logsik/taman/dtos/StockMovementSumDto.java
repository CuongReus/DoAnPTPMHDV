package com.logsik.taman.dtos;

public class StockMovementSumDto {
		private Long stockId;
		private Double sumQuantity;
		private Long sumTotalPrice;
		
		public StockMovementSumDto(Long stockId, Double sumQuantity, Long sumTotalPrice) {
			super();
			this.stockId = stockId;
			this.sumQuantity = sumQuantity;
			this.sumTotalPrice = sumTotalPrice;
		}
		public Long getStockId() {
			return stockId;
		}
		public void setStockId(Long stockId) {
			this.stockId = stockId;
		}
		public Double getSumQuantity() {
			return sumQuantity;
		}
		public void setSumQuantity(Double sumQuantity) {
			this.sumQuantity = sumQuantity;
		}
		public Long getSumTotalPrice() {
			return sumTotalPrice;
		}
		public void setSumTotalPrice(Long sumTotalPrice) {
			this.sumTotalPrice = sumTotalPrice;
		}
		
		
}
