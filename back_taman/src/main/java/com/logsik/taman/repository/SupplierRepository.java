package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.logsik.taman.domain.Supplier;
import com.logsik.taman.domain.User;
import com.logsik.taman.enums.SupplierType;

public interface SupplierRepository extends BaseRepository<Supplier, Long>, JpaSpecificationExecutor<Supplier>  {

	Page<Supplier> findById(Long id, Pageable pageable);

	Page<Supplier> findAll(Specification<Supplier> spec,Pageable pageable);
	
	Page<Supplier> findByNameOrProductProvideNameContainingOrderByTypeAsc(String name,String productProvideName,Pageable pageable);

	Optional<Supplier> findById(Long id);

	List<Supplier> findAll(Specification<Supplier> spec);
	
	List<Supplier> findByType(SupplierType supplierType);
	
//	List<Supplier> findByProductProvideNameContaining(String productProvideName);


}
