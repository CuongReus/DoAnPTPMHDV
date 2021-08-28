package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.taman.domain.SwotItem;



public interface SwotItemRepository extends BaseRepository<SwotItem, Long> {
	
	Optional<SwotItem> findById(Long id);
	
	Page<SwotItem> findByTitleContaining(String name, Pageable pageable);
	
	List <SwotItem> findAll();
	
}
