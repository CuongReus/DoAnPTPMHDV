package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.ProjectCost;
import com.logsik.taman.dtos.SumProjectCostTotalPaidDto;
import com.logsik.taman.dtos.SumMonthProjectCostDto;
import com.logsik.taman.enums.ProjectCostStatus;
import com.logsik.taman.enums.ProjectPaymentType;

public interface ProjectCostRepository extends BaseRepository<ProjectCost, Long> {
//	@EntityGraph(attributePaths = { ""})
	@EntityGraph(attributePaths = {"projectDetail","projectDetail.project","projectDetail.project.projectYear","projectDetail.project.projectYear.company","approvalBy","createdUser","lastedUpdateUser"})
	List<ProjectCost> findAll( Specification<ProjectCost> spec);
	@EntityGraph(attributePaths = {"projectDetail","projectDetail.project","projectDetail.project.projectYear","projectDetail.project.projectYear.company","approvalBy","createdUser","lastedUpdateUser"})
	Page<ProjectCost> findAll(Pageable pageable);
	
	@EntityGraph(attributePaths = {"projectDetail","projectDetail.project","projectDetail.project.projectYear","projectDetail.project.projectYear.company","approvalBy","createdUser","lastedUpdateUser"})
	Optional<ProjectCost> findById(Long id);
	
	@EntityGraph(attributePaths = {"projectDetail","projectDetail.project","projectDetail.project.projectYear","projectDetail.project.projectYear.company","approvalBy","createdUser","lastedUpdateUser"})
	List<ProjectCost>findByProjectDetailIdAndPaymentType(Long projectDetailId, ProjectPaymentType projectPaymentType);
	
	@EntityGraph(attributePaths = {"projectDetail","projectDetail.project","projectDetail.project.projectYear","projectDetail.project.projectYear.company","approvalBy","createdUser","lastedUpdateUser"})
	List<ProjectCost>findByProjectDetailIdAndPaymentTypeAndMonthAndYear(Long projectDetailId,
			ProjectPaymentType projectPaymentType,Integer month,Integer year);
	
	@EntityGraph(attributePaths = {"projectDetail","projectDetail.project","projectDetail.project.projectYear","projectDetail.project.projectYear.company","approvalBy","createdUser","lastedUpdateUser"})
	List<ProjectCost>findByProjectDetailId(Long projectDetailId);
	
	List<ProjectCost>findByProjectDetailIdAndPaymentTypeAndStatus(Long projectDetailId, ProjectPaymentType projectPaymentType,ProjectCostStatus projectCostStatus);
	
	@EntityGraph(attributePaths = {"projectDetail","projectDetail.project"})
	List<ProjectCost>findByProjectDetailProjectIdAndStatus(Long projectId,ProjectCostStatus projectCostStatus);
	
	@Query("select new com.logsik.taman.dtos.SumProjectCostTotalPaidDto(pc.projectDetail.id, "
			+ "SUM(CASE WHEN pc.totalPaid IS NOT NULL THEN pc.totalPaid ELSE 0 END)) "
			+ "from com.logsik.taman.domain.ProjectCost pc  WHERE  pc.projectDetail.id =?1 GROUP BY pc.projectDetail.id  ")
	SumProjectCostTotalPaidDto  sumProjectCostTotalPaidDto(Long projectDetailId);
	
	@Query("select new com.logsik.taman.dtos.SumMonthProjectCostDto(MONTH(createdDate), SUM(pc.totalMoney), "
			+ "SUM(CASE WHEN pc.totalPaid IS NOT NULL THEN pc.totalPaid ELSE 0 END)) "
			+ "from com.logsik.taman.domain.ProjectCost pc WHERE  YEAR(createdDate) =?1 GROUP BY MONTH(createdDate)")
	List<SumMonthProjectCostDto>  sumProjectCostTotalByYear(Integer year);
	
	@EntityGraph(attributePaths = {"projectDetail","projectDetail.project","projectDetail.project.projectYear","projectDetail.project.projectYear.company","approvalBy","createdUser","lastedUpdateUser"})
	List<ProjectCost>findByProjectDetailIdAndMonthAndYear(Long projectDetailId,Integer month,Integer year);
	
	@EntityGraph(attributePaths = {"projectDetail"})
	List<ProjectCost>findByProjectDetailIdOrderByLotNumber(Long projectDetailId);
	
}
