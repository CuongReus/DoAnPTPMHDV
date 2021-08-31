package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.ContactDetail;
import com.logsik.taman.domain.SwotUser;

public interface SwotUserRepository extends BaseRepository<SwotUser, Long> {
	@EntityGraph(attributePaths = { "swotItem","user","user.job"})
	Page<SwotUser> findById(Long id, Pageable pageable);
	@EntityGraph(attributePaths = { "swotItem","user","user.job"})
	Page<SwotUser> findAll(Pageable pageable);
	@EntityGraph(attributePaths= {"swotItem","user","user.job"})
	List<SwotUser>findBySwotItemId(Long swotItemId);
	@EntityGraph(attributePaths= {"swotItem","user","user.job"})
	List<SwotUser>findByUserId(Long userId);
	
	@EntityGraph(attributePaths= {"swotItem","user","user.job"})
	List<SwotUser> findAll();
	
	@EntityGraph(attributePaths= {"swotItem","user","user.job"})
	List<SwotUser> findByUserIdIn(List<Long> userIds);
}
