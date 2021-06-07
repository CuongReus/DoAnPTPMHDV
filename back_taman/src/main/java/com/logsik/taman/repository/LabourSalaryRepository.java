package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.LabourSalary;

public interface LabourSalaryRepository extends BaseRepository<LabourSalary, Long> {
	@EntityGraph(attributePaths = { "labour"})
	Page<LabourSalary> findAll(Pageable pageable);

	@EntityGraph(attributePaths = { "labour","lastedUpdateUser"})
	Optional<LabourSalary> findById(Long id);

	@EntityGraph(attributePaths = { "labour","lastedUpdateUser"})
	List<LabourSalary> findByLabourIdAndMonthAndYear(Long labourId, Integer month, Integer year);
	@EntityGraph(attributePaths = { "labour","lastedUpdateUser"})
	List<LabourSalary> findByMonthAndYear(Integer month, Integer year);
	
	
}
