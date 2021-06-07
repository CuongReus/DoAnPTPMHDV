package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.ProjectYear;
import com.logsik.taman.dtos.SumRevenueOfProjectYearDto;

public interface ProjectYearRepository extends BaseRepository<ProjectYear, Long> {
	@EntityGraph(attributePaths = { "company"})
	Page<ProjectYear> findById(Long id,Pageable pageable);
	@EntityGraph(attributePaths = { "company"})
	Page<ProjectYear> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "company"})
	Optional<ProjectYear> findById(Long id);
	@EntityGraph(attributePaths = { "company"})
	List<ProjectYear> findAll();
	
	@EntityGraph(attributePaths = { "company"})
	List<ProjectYear> findByCompanyId(Long companyId);
	
	@Query("select new com.logsik.taman.dtos.SumRevenueOfProjectYearDto("
			+ "SUM(CASE WHEN pj.totalRevenue != NULL THEN pj.totalRevenue ELSE 0 END),"
			+ "SUM(CASE WHEN pj.totalProfit != NULL THEN pj.totalProfit ELSE 0 END)) "
			+ "from com.logsik.taman.domain.Project pj Where pj.projectYear.id =?1")
	List<SumRevenueOfProjectYearDto> sumRevenueByProjectYearId(Long projectYearId);
	
}
