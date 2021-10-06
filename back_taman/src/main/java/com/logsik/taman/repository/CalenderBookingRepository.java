package com.logsik.taman.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.CalenderBooking;

public interface CalenderBookingRepository extends BaseRepository<CalenderBooking, Long> {
	
	@EntityGraph(attributePaths = { "responsible", "calenderType", "contacts", "users"})
	Optional<CalenderBooking> findById(Long id);

	@EntityGraph(attributePaths = { "responsible", "calenderType", "contacts", "users"})
	List<CalenderBooking> findAll();
	
	@EntityGraph(attributePaths = { "responsible", "calenderType", "contacts", "users"})
	List<CalenderBooking> findByOrderByCalenderTypeIdAsc();
	
	@EntityGraph(attributePaths = { "responsible", "calenderType", "contacts", "users"})
	List<CalenderBooking> findBy();
	
	@EntityGraph(attributePaths = { "responsible", "calenderType", "contacts", "users"})
	List<CalenderBooking> findAll(Specification<CalenderBooking> spec);
	
	@EntityGraph(attributePaths = { "responsible", "calenderType", "contacts", "users"})
	@Query("select cb from com.logsik.taman.domain.CalenderBooking cb join com.logsik.taman.domain.UserCalender uc"
			+" on cb.id = uc.calenderBookingId "
			+ "WHERE uc.userId = ?1 and cb.startDate BETWEEN ?2 and ?3")
	List<CalenderBooking> listCalenderBookingByUserIdAndStartDate(Long userId, Date startDate, Date endDate);
	
	@EntityGraph(attributePaths = { "responsible", "calenderType", "contacts", "users"})
	@Query("select cb from com.logsik.taman.domain.CalenderBooking cb join com.logsik.taman.domain.ContactCalender uc"
			+" on cb.id = uc.calenderBookingId "
			+ "WHERE uc.contactId = ?1 and cb.startDate BETWEEN ?2 and ?3")
	List<CalenderBooking> listCalenderBookingByContactIdAndStartDate(Long contactId, Date startDate, Date endDate);
	
}
