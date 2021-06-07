package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.Efficiency;

public interface EfficiencyRepository extends BaseRepository<Efficiency, Long> {
	@EntityGraph(attributePaths = { "curator","constructionTeam","projectDetail",
			"projectDetail.project",
			"projectDetail.project.projectYear","projectDetail.project.projectYear.company","createdUser","lastedUpdateUser" })
	Page<Efficiency> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "curator","constructionTeam","projectDetail",
			"projectDetail.project",
			"projectDetail.project.projectYear","projectDetail.project.projectYear.company","createdUser","lastedUpdateUser" })
	Page<Efficiency> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "curator","constructionTeam","projectDetail",
			"projectDetail.project",
			"projectDetail.project.projectYear",
			"projectDetail.project.projectYear.company","createdUser","lastedUpdateUser" })
	Optional<Efficiency> findById(Long id);
	@EntityGraph(attributePaths = { "curator","constructionTeam","projectDetail",
			"projectDetail.project",
			"projectDetail.project.projectYear","projectDetail.project.projectYear.company","createdUser","lastedUpdateUser" })
	Efficiency findByProjectDetailId(Long projectDetailId);
	
	@EntityGraph(attributePaths = { "curator","constructionTeam","projectDetail",
			"projectDetail.project",
			"projectDetail.project.projectYear","projectDetail.project.projectYear.company","createdUser","lastedUpdateUser" })
	List<Efficiency> findAll();


}
