package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.taman.domain.StorageLocation;

public interface StorageLocationRepository extends BaseRepository<StorageLocation, Long> {

	Page<StorageLocation> findAll(Pageable pageable);

	Optional<StorageLocation> findById(Long id);
	List<StorageLocation> findAll();

}
