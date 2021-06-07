package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.Stock;
import com.logsik.taman.dtos.SumStockQuantityAndPrice;

public interface StockRepository extends BaseRepository<Stock, Long>, JpaSpecificationExecutor<Stock> {
	@EntityGraph(attributePaths = { "product", "product.productCategory","product.supplier", "storageLocation" })
	Page<Stock> findAll(Pageable pageable);


	@EntityGraph(attributePaths = { "product", "product.productCategory","product.supplier", "storageLocation" })
	Optional<Stock> findById(Long id);

	@EntityGraph(attributePaths = { "product", "product.productCategory","product.supplier", "storageLocation" })
	List<Stock> findByProductId(Long productId);

	@EntityGraph(attributePaths = { "product", "product.productCategory","product.supplier", "storageLocation" })
	List<Stock> findAll();

//	@EntityGraph(attributePaths = { "product", "product.productCategory", "storageLocation" })
//	Page<Stock> findAll(Specification<Stock> spec, Pageable pageable);

	Page<Stock> findAll(Specification<Stock> spec, Pageable pageable);
	
	@EntityGraph(attributePaths = { "product", "product.productCategory","product.supplier", "storageLocation" })
	List<Stock> findAll(Specification<Stock> spec);

	@EntityGraph(attributePaths = { "product", "product.productCategory","product.supplier", "storageLocation" })
	List<Stock> findByProductIdIn(List<Long> productIds);
	
	
	@Query("select st.productId "
			+ "from com.logsik.taman.domain.Stock st GROUP BY st.productId ORDER BY SUM(st.quantity) DESC ")
	Page<Long> findProductIdOrderByQuantityDesc(Pageable pageable);
	
	@Query("select new com.logsik.taman.dtos.SumStockQuantityAndPrice(SUM(st.quantity),SUM(st.latestProductPrice)) "
			+ "from com.logsik.taman.domain.Stock st")
	List<SumStockQuantityAndPrice> sumQuantityAndPrice();
	
	
	
	Page<Long> findProductIdOrderByQuantity(Specification<Stock> spec, Pageable pageable);
}