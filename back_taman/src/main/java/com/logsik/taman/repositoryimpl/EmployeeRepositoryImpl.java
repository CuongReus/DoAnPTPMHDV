//package com.logsik.taman.repositoryimpl;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Repository;
//
//import com.logsik.taman.domain.LeaveLetter;
//import com.logsik.taman.repository.EmployeeRepositoryCustom;
//
//@Repository
//public class EmployeeRepositoryImpl implements EmployeeRepositoryCustom {
//	@PersistenceContext
//    private EntityManager em;
//
//	@Deprecated
//	@Override
//	public Page<LeaveLetter> findByQueryParams(String district, String skill, String day, Pageable pageable) {
////		Not compatible with Pageable interface - Build pagination manually
////		em.createNamedQuery("select * from employee", LeaveLetter.class).getResultList();
//		return null;
//	}
//
//	
//
//}
