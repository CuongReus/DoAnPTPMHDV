package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import com.logsik.taman.domain.CalenderType;

public interface CalenderTypeRepository extends BaseRepository<CalenderType, Long> {
	
	Optional<CalenderType> findById(Long id);

	List<CalenderType> findAll();

}
