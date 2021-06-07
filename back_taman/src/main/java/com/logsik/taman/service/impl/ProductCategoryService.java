package com.logsik.taman.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.Product;
import com.logsik.taman.domain.ProductCategory;
import com.logsik.taman.repository.ProductCategoryRepository;
import com.logsik.taman.repository.ProductRepository;

@Service
@Transactional
public class ProductCategoryService {
	
	@Autowired
	private ProductRepository productRepository; 
	
	@Autowired
	private ProductCategoryRepository productCategoryRepository; 
	
	
	public void updateMinDiscountProductByPC(Long productCategoryId) {
		ProductCategory productCategory = productCategoryRepository.findById(productCategoryId).get();
		List<Product> listFindByProductCategory = productRepository.findByProductCategoryId(productCategoryId); 
		for(Product p : listFindByProductCategory) {
			Long minDiscountPrice  = 0L;
			minDiscountPrice = p.getPrice() -  (p.getPrice()  * productCategory.getSalesMargin()/100);
			p.setMinDiscountPrice(minDiscountPrice);
			productRepository.save(p);
		}
		
	}
	
	public void updateMinDiscountForAllProduct() {
		List<ProductCategory> listAllProductCategory = productCategoryRepository.findAll();
		for(ProductCategory pc : listAllProductCategory) {
			List<Product> listFindByProductCategory = productRepository.findByProductCategoryId(pc.getId()); 
			for(Product p : listFindByProductCategory) {
				Long minDiscountPrice  = 0L;
				Long productPrice = 0L;
				Integer salesMarginPercent = 0;
				if(p.getPrice() != null) {
					productPrice = p.getPrice(); 
				}
				if(pc.getSalesMargin() !=null) {
					salesMarginPercent = pc.getSalesMargin();
				}
			
				minDiscountPrice = productPrice -  (productPrice  *salesMarginPercent/100);
				p.setMinDiscountPrice(minDiscountPrice);
				productRepository.save(p);
			}
		}
		
		
	}
}
