package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.ResourceItem;

public interface ResourceItemRepository extends BaseRepository<ResourceItem, Long> {
	
	
	@EntityGraph(attributePaths = { "responsibleUser" })
	Page<ResourceItem> findAll(Specification<ResourceItem> spec, Pageable pageable);
	
	Optional<ResourceItem> findById(Long id);
	
}
