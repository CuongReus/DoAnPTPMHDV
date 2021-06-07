package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.EmployeeSalary;

public interface EmployeeSalaryRepository extends BaseRepository<EmployeeSalary, Long>{
	
	@EntityGraph(attributePaths = { "user","user.department"})
	Optional<EmployeeSalary> findById(Long id);
	
	@EntityGraph(attributePaths = { "user","user.department"})
	List<EmployeeSalary> findAll();
	
	@EntityGraph(attributePaths = { "user","user.department"})
	Page<EmployeeSalary> findAll(Pageable pageable);
	
//	@EntityGraph(attributePaths = { "user","user.department"})
//	Page<EmployeeSalary> findSalaryPerMonthContaining(Integer name,Pageable pageable);
	
	@EntityGraph(attributePaths = { "user","user.department"})
	Page<EmployeeSalary> findAll(Specification<EmployeeSalary> spec, Pageable pageable);
	
	@EntityGraph(attributePaths = { "user","user.department"})
	List<EmployeeSalary> findAll(Specification<EmployeeSalary> spec);
	
	@EntityGraph(attributePaths = { "user","user.department"})
	List<EmployeeSalary> findByMonthAndYear(Integer month, Integer year);

	@EntityGraph(attributePaths = { "user","user.department"})
	List<EmployeeSalary> findByUserIdAndMonthAndYear(Long userId,Integer month, Integer year);
	
	@EntityGraph(attributePaths = { "user","user.department"})
	List<EmployeeSalary> findByUserDepartmentIdAndMonthAndYear(Long departmentId,Integer month, Integer year);
	
	@EntityGraph(attributePaths = { "user","user.department"})
	List<EmployeeSalary> findByUserIsActive(boolean isActive);
	
}
