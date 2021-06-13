package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.ProjectDetail;

public interface ProjectDetailRepository extends BaseRepository<ProjectDetail, Long> {
	@EntityGraph(attributePaths = { "project", "project.projectYear", "createdUser", "lastedUpdateUser" })
	ProjectDetail findDistinctById(Long id);

	@EntityGraph(attributePaths = { "project", "project.projectYear", "createdUser", "lastedUpdateUser"})
	Page<ProjectDetail> findAll(Pageable pageable);

	@EntityGraph(attributePaths = { "project", "project.projectYear", "createdUser", "lastedUpdateUser" })
	Optional<ProjectDetail> findById(Long id);

	@EntityGraph(attributePaths = { "project", "project.projectYear", "createdUser", "lastedUpdateUser"})
	List<ProjectDetail> findAll();

	@EntityGraph(attributePaths = { "project", "project.projectYear", "createdUser", "lastedUpdateUser"})
	List<ProjectDetail> findDistinctByProjectIdOrderByIdAsc(Long projectId);
//	@EntityGraph(attributePaths = { "project", "project.projectYear"})
//	List<ProjectDetail>	findAll(Specification<ProjectDetail> spec);

}
