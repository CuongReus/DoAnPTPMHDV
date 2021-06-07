package com.logsik.taman.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.logsik.taman.domain.User;
import com.logsik.taman.enums.UserRole;
public interface UserRepository extends BaseRepository<User, Long>, JpaSpecificationExecutor<User> {
	@EntityGraph(attributePaths = { "company", "roles","department"})
	List<User> findByEmail(String email);
	@EntityGraph(attributePaths = { "company","roles","department"})
	Page<User> findByEmailContaining(String email, Pageable pageable);
	
	@EntityGraph(attributePaths = { "company","roles","department"})
	Page<User> findByFullNameContainingOrEmailContainingOrPhoneContainingOrAddressContaining(String fullName,String email,String phone,String address, Pageable pageable);
	
	@EntityGraph(attributePaths = { "company","roles","department"})
	Page<User> findByRole(UserRole role, Pageable pageable);
	@EntityGraph(attributePaths = { "company","roles","department"})
	List<User> findByFullName(String fullName);
	@EntityGraph(attributePaths = { "company","roles","department"})
	Page<User> findByRoleAndEmailContaining(UserRole role, String email, Pageable pageable);
	@EntityGraph(attributePaths = { "company","roles","department"})
	Page<User> findAll(Specification<User> spec,Pageable pageable);
	
	@EntityGraph(attributePaths = { "company","roles","department"})
	List<User> findAll();

	@EntityGraph(attributePaths = { "company","roles","department"})
	List<User> findByIsActive(Boolean isActive);
	//Load Data on form
	@EntityGraph(attributePaths = { "company","roles","department"})
	Optional<User> findById(Long id);

}
