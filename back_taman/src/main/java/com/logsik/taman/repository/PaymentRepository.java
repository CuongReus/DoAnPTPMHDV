package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.Payment;
import com.logsik.taman.dtos.SumTotalPaidDto;

public interface PaymentRepository extends BaseRepository<Payment, Long> {
	@EntityGraph(attributePaths = { "projectCost","projectCost.projectDetail","projectCost.projectDetail.project.projectYear","projectCost.projectDetail.project.projectYear.company","labour","approvalBy","createdUser","lastedUpdateUser"})
	Page<Payment> findAll(Pageable pageable);
	@EntityGraph(attributePaths = { "projectCost","projectCost.projectDetail","projectCost.projectDetail.project.projectYear","projectCost.projectDetail.project.projectYear.company","labour","approvalBy","createdUser","lastedUpdateUser"})
	Optional<Payment> findById(Long id);
	@EntityGraph(attributePaths = { "projectCost","projectCost.projectDetail","projectCost.projectDetail.project.projectYear","projectCost.projectDetail.project.projectYear.company","labour","approvalBy","createdUser","lastedUpdateUser"})
	List<Payment>findByProjectCostId(Long projectCostId);
	@EntityGraph(attributePaths = { "projectCost","projectCost.projectDetail","projectCost.projectDetail.project.projectYear","projectCost.projectDetail.project.projectYear.company","labour","approvalBy","createdUser","lastedUpdateUser"})
	Payment findByLabourIdAndProjectCostId(Long labourId,Long projectCostId);
	
	
	@Query("select new com.logsik.taman.dtos.SumTotalPaidDto("
			+ "SUM(CASE WHEN pm.status ='DA_DUYET_THANH_TOAN' THEN pm.moneyPaid ELSE 0 END)) "
			+ "from com.logsik.taman.domain.Payment pm  WHERE  pm.projectCost.id =?1 GROUP BY pm.projectCost.id  ")
	SumTotalPaidDto sumTotalPaidByProjectCostId(Long projectCostId);
}
