package com.logsik.taman.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.SwotJob;

public interface SwotJobRepository extends BaseRepository<SwotJob, Long> {
	@EntityGraph(attributePaths = { "swotItem","job" })
	Page<SwotJob> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "swotItem","job" })
	Page<SwotJob> findAll(Pageable pageable);
	@EntityGraph(attributePaths= {"swotItem","job"})
	List<SwotJob>findBySwotItemId(Long swotItemId);
	@EntityGraph(attributePaths= {"swotItem","job"})
	List<SwotJob>findByJobId(Long jobId);
	@EntityGraph(attributePaths= {"swotItem","job"})
	List<SwotJob> findAll();
}
