package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.ProductCategory;

public interface ProductCategoryRepository extends BaseRepository<ProductCategory, Long> {
	@EntityGraph(attributePaths = { "supplier"})
	Page<ProductCategory> findAllByOrderBySupplierIdAsc(Pageable pageable);
	@EntityGraph(attributePaths = { "supplier"})
	Page<ProductCategory> findByNameContainingOrCodeContainingOrderBySupplierIdAsc(String name,String code,Pageable pageable);
	@EntityGraph(attributePaths = { "supplier"})
	Optional<ProductCategory> findById(Long id);
	@EntityGraph(attributePaths = { "supplier"})
	List<ProductCategory> findAll();

}
