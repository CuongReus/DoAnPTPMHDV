package com.logsik.taman.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.StockMovement;
import com.logsik.taman.dtos.StockMovementSumDto;
import com.logsik.taman.enums.MovementType;

public interface StockMovementRepository extends BaseRepository<StockMovement, Long>,JpaSpecificationExecutor<StockMovement> {
	@EntityGraph(attributePaths = { "product","createdUser","lastedUpdateUser","stock","stock.storageLocation","sale","sale.contact"})
	Page<StockMovement> findAll(Pageable pageable);

	@EntityGraph(attributePaths = { "product","createdUser","lastedUpdateUser","stock","stock.storageLocation","sale","sale.contact"})
	Optional<StockMovement> findById(Long id);

	@EntityGraph(attributePaths = { "product","createdUser","lastedUpdateUser","stock","stock.storageLocation","sale","sale.contact"})
	Page<StockMovement> findByMovementType(MovementType movementType, Pageable pageable);
	@EntityGraph(attributePaths = { "product","createdUser","lastedUpdateUser","stock","stock.storageLocation","sale","sale.contact"})
	List<StockMovement> findByProductIdAndMovementDateBetween(Long productId, Date startDateOfYear,Date endDateOfYear);
	@EntityGraph(attributePaths = { "product","createdUser","lastedUpdateUser","stock","stock.storageLocation","sale","sale.contact"})
	List<StockMovement> findByProductId(Long productId);
	@EntityGraph(attributePaths = { "product","product.productCategory","createdUser","lastedUpdateUser","stock","stock.storageLocation","sale","sale.contact"})
	List<StockMovement> findBySaleId (Long saleId);
	
	@Query("select new com.logsik.taman.dtos.StockMovementSumDto(stMv.stockId,SUM(stMv.quantity),SUM(stMv.totalPrice)) "
			+ "from com.logsik.taman.domain.StockMovement stMv where stMv.stockId =?1 GROUP BY stMv.stockId ")
	StockMovementSumDto getSumQuantityAndTotalPriceByStock(Long stockId);
	
	@EntityGraph(attributePaths = { "product","createdUser","lastedUpdateUser","stock","stock.storageLocation","sale","sale.contact"})
	Page<StockMovement> findAll(Specification<StockMovement> spec,Pageable pageable);
	
	@EntityGraph(attributePaths = { "product","createdUser","lastedUpdateUser","stock","stock.storageLocation","sale","sale.contact"})
	List<StockMovement> findAll(Specification<StockMovement> spec);
	
}
	