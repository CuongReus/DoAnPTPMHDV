package com.logsik.taman.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.logsik.taman.domain.PaymentSalary;

public interface PaymentSalaryRepository extends BaseRepository<PaymentSalary, Long> {
//	@EntityGraph(attributePaths = { ""})
	Page<PaymentSalary> findAll(Pageable pageable);
//	@EntityGraph(attributePaths = { ""})
	Optional<PaymentSalary> findById(Long id);
}
