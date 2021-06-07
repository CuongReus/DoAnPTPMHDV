package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.logsik.taman.domain.Product;

public interface ProductRepository extends BaseRepository<Product, Long>, JpaSpecificationExecutor<Product> {
	@EntityGraph(attributePaths = { "productCategory","supplier" })
	Page<Product> findAll(Specification<Product> spec, Pageable pageable);

	@EntityGraph(attributePaths = { "productCategory", "supplier" })
	Optional<Product> findById(Long id);
	
	List<Product> findByProductCategoryId(Long productCategoryId);

	List<Product> findAll();

}
