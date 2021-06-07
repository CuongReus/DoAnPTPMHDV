//package com.logsik.taman.repository;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.EntityGraph;
//
//import com.logsik.taman.domain.OutputStock;
//
//public interface OutputStockRepository extends BaseRepository<OutputStock, Long> {
//	@EntityGraph(attributePaths = { "product","storageLocation"})
//	Page<OutputStock> findAll(Pageable pageable);
//	@EntityGraph(attributePaths = { "product","storageLocation"})
//	OutputStock findById(Long id);
//
//}
