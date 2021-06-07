package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.CloseProject;

public interface CloseProjectRepository extends BaseRepository<CloseProject, Long> {
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","projectDetail.project.projectYear","createdUser","lastedUpdateUser" })
	Page<CloseProject> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","projectDetail.project.projectYear","createdUser","lastedUpdateUser" })
	Page<CloseProject> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","projectDetail.project.projectYear","createdUser","lastedUpdateUser" })
	Optional<CloseProject> findById(Long id);
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","projectDetail.project.projectYear","createdUser","lastedUpdateUser" })
	CloseProject findByProjectDetailId(Long projectDetailId);
	
	@EntityGraph(attributePaths = { "projectDetail","projectDetail.project","projectDetail.project.projectYear","createdUser","lastedUpdateUser" })
	List<CloseProject> findByProjectDetailProjectId(Long projectId);

}
