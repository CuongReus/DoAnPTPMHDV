package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.Project;
import com.logsik.taman.dtos.SumRevenueOfProjectDto;

public interface ProjectRepository extends BaseRepository<Project, Long> {
	@EntityGraph(attributePaths = { "projectYear","createdUser","lastedUpdateUser"})
	Page<Project> findById(Long id,Pageable pageable);
	@EntityGraph(attributePaths = { "projectYear","createdUser","lastedUpdateUser"})
	Page<Project> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "projectYear","createdUser","lastedUpdateUser"})
	Optional<Project> findById(Long id);
	@EntityGraph(attributePaths = { "projectYear","projectYear.company","createdUser","lastedUpdateUser"})
	List<Project> findAll();
	
	@EntityGraph(attributePaths = { "projectYear","createdUser","lastedUpdateUser"})
	List<Project> findByProjectYearId(Long projectYearId);
	@Query("select new com.logsik.taman.dtos.SumRevenueOfProjectDto("
			+ "SUM(CASE WHEN pd.totalRevenue != NULL THEN pd.totalRevenue ELSE 0 END),"
			+ "SUM(CASE WHEN pd.totalProfit != NULL THEN pd.totalProfit ELSE 0 END)) "
			+ "from com.logsik.taman.domain.ProjectDetail pd Where pd.project.id =?1")
	List<SumRevenueOfProjectDto> sumProjectRevenueByProjectId(Long projectId);
	@EntityGraph(attributePaths = { "projectYear","projectYear.company","createdUser","lastedUpdateUser"})
	List<Project> findAll(Specification<Project> spec);
}
