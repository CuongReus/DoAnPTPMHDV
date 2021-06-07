package com.logsik.taman.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.Product;
import com.logsik.taman.domain.Stock;
import com.logsik.taman.domain.StorageLocation;
import com.logsik.taman.repository.ProductRepository;
import com.logsik.taman.repository.StockRepository;

@Service
public class StorageLocationService {
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private StockRepository stockRepository;
	
	public void addProductToStock(StorageLocation storageLocation ) {
		List<Product> listAllProduct = productRepository.findAll();
		for(Product p :listAllProduct) {
			Stock stock = new Stock();
			stock.setProductId(p.getId());
			stock.setStorageLocationId(storageLocation.getId());
			stock.setQuantity(0F);
			stock.setLatestProductPrice(0L);
			stockRepository.save(stock);
		}
		
	}
	
}
