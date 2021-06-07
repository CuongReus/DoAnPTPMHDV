package com.logsik.taman.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;

import com.logsik.taman.domain.ContactDetail;



public interface ContactDetailRepository extends BaseRepository<ContactDetail, Long> {
	@EntityGraph(attributePaths= {"contact"})
	Page<ContactDetail> findAll(Pageable pageable);
	@EntityGraph(attributePaths= {"contact"})
	List<ContactDetail>findByContactId(Long contactId);
	@EntityGraph(attributePaths= {"contact"})
	List<ContactDetail> findAll();
}
