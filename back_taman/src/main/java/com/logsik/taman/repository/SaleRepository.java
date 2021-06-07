package com.logsik.taman.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.Sale;
import com.logsik.taman.dtos.SaleWithSumMoneyDto;
import com.logsik.taman.enums.ApprovalStatus;
import com.logsik.taman.enums.PaymentStatus;

public interface SaleRepository extends BaseRepository<Sale, Long>{
	
	@EntityGraph(attributePaths= {"contact","supplier", "createdUser", "lastedUpdateUser"})
	Page<Sale> findAll(Pageable pageable);
	
	@EntityGraph(attributePaths= {"contact","supplier", "createdUser", "lastedUpdateUser"})
	Optional<Sale> findById(Long id);
	
	@EntityGraph(attributePaths= {"contact","supplier" ,"createdUser", "lastedUpdateUser"})
	List<Sale> findByContactId(Long id);
	
	@EntityGraph(attributePaths= {"contact","supplier", "createdUser", "lastedUpdateUser"})
	List<Sale> findAll();
	@EntityGraph(attributePaths= {"contact","supplier", "createdUser", "lastedUpdateUser"})
	List<Sale> findAll(Specification<Sale> spec);
	
	@EntityGraph(attributePaths= {"contact","supplier", "createdUser", "lastedUpdateUser"})
	Page<Sale> findAll(Specification<Sale> spec,Pageable pageable);
	
	
//	@Query("select new com.logsik.taman.dtos.SaleWithSumMoneyDto("
//			+ "SUM(CASE WHEN sl.paymentStatus ='DA_DUYET_THANH_TOAN' THEN sl.totalMoney ELSE 0 END),"
//			+ "SUM(CASE WHEN sl.paymentStatus ='CHUA_DUYET_THANH_TOAN' THEN sl.totalMoney ELSE 0 END)) "
//			+ "from com.logsik.taman.domain.Sale sl where sl.purchasedDate BETWEEN ?1 AND ?2 AND sl.approvalStatus = ?3 AND sl.paymentStatus =?4 ")
//	SaleWithSumMoneyDto sumSaleMoney(Date startDate, Date endDate, ApprovalStatus  approvalStatus, PaymentStatus paymentStatus );
//	
//
//	@Query("select new com.logsik.taman.dtos.SaleWithSumMoneyDto("
//			+ "SUM(CASE WHEN sl.paymentStatus ='DA_DUYET_THANH_TOAN' THEN sl.totalMoney ELSE 0 END),"
//			+ "SUM(CASE WHEN sl.paymentStatus ='CHUA_DUYET_THANH_TOAN' THEN sl.totalMoney ELSE 0 END)) "
//			+ "from com.logsik.taman.domain.Sale sl where sl.purchasedDate BETWEEN ?1 AND ?2  AND sl.paymentStatus =?3  ")
//	SaleWithSumMoneyDto sumSaleMoneyWithApprovalStatusALL(Date startDate, Date endDate, PaymentStatus paymentStatus );
//	
//	@Query("select new com.logsik.taman.dtos.SaleWithSumMoneyDto("
//			+ "SUM(CASE WHEN sl.paymentStatus ='DA_DUYET_THANH_TOAN' THEN sl.totalMoney ELSE 0 END),"
//			+ "SUM(CASE WHEN sl.paymentStatus ='CHUA_DUYET_THANH_TOAN' THEN sl.totalMoney ELSE 0 END)) "
//			+ "from com.logsik.taman.domain.Sale sl where sl.purchasedDate BETWEEN ?1 AND ?2 AND sl.approvalStatus = ?3 ")
//	SaleWithSumMoneyDto sumSaleMoneyWithPaymentStatusALL(Date startDate, Date endDate, ApprovalStatus  approvalStatus);
//	
//	@Query("select new com.logsik.taman.dtos.SaleWithSumMoneyDto("
//			+ "SUM(CASE WHEN sl.paymentStatus ='DA_DUYET_THANH_TOAN' THEN sl.totalMoney ELSE 0 END),"
//			+ "SUM(CASE WHEN sl.paymentStatus ='CHUA_DUYET_THANH_TOAN' THEN sl.totalMoney ELSE 0 END)) "
//			+ "from com.logsik.taman.domain.Sale sl where sl.purchasedDate BETWEEN ?1 AND ?2 ")
//	SaleWithSumMoneyDto sumSaleMoneyWithALLStatus(Date startDate, Date endDate);
//	
}
