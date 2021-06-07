package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.logsik.taman.domain.Contact;
import com.logsik.taman.domain.Supplier;
import com.logsik.taman.domain.User;
import com.logsik.taman.enums.ContactStatus;
import com.logsik.taman.enums.SupplierType;


public interface ContactRepository extends BaseRepository<Contact, Long> {
	
	Page<Contact> findById(Long id, Pageable pageable);

	Page<Contact> findAllByOrderByNameAsc(Pageable pageable);
	
	Page<Contact> findByNameContainingOrTaxNumberContaining(String name, String taxNumber, Pageable pageable);

	Optional<Contact> findById(Long id);
	
	Page<Contact> findAll(Specification<Contact> spec,Pageable pageable);
	
//	List<Contact> findByStatus(ContactStatus contactStatus);

	List<Contact> findAll();

}
