package com.logsik.taman.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.LeaveLetter;
import com.logsik.taman.dtos.UserLeaveDayDto;
import com.logsik.taman.enums.TypeOfLeave;

public interface LeaveLetterRepository extends BaseRepository<LeaveLetter, Long> {
	@EntityGraph(attributePaths = { "user","user.company","user.department","approvedBy"})
	Optional<LeaveLetter> findById(Long id);
	
//	
	@EntityGraph(attributePaths = { "user","user.company","user.department","approvedBy"})
	Page<LeaveLetter> findByUserId(Long userId,Pageable pageable);
	
	
	@EntityGraph(attributePaths = { "user","user.company","user.department","approvedBy"})
	Page<LeaveLetter> findByUserIdAndLeaveTypeNotAndStartWorkDateBetween(Long userId,TypeOfLeave typeOfLeave ,Date dateToWorkStart,Date dateToWorkEnd,Pageable pageable);
	
	@Query("select new com.logsik.taman.dtos.UserLeaveDayDto(us.id,"
			+ "us.fullName,"
			+ "us.company.name,"
			+ "us.email,"
			+ "us.labourContract,"
			+ "ll.startWorkDate,"
			+ "ll.lastTotalAnnualLeave, "
			+ "us.phone) "
			+ " FROM com.logsik.taman.domain.LeaveLetter ll "
			+ " RIGHT JOIN ll.user us "
			+ "	WHERE ll.startWorkDate IN "
			+ "	  ( SELECT  MAX(CASE WHEN (DATE_FORMAT(subLetter.startWorkDate,'%Y')=?1 ) THEN subLetter.startWorkDate ELSE NULL END) from leave_letter subLetter WHERE ll.userId = subLetter.userId group by subLetter.userId)  "
			+ "  ")
	List<UserLeaveDayDto> listLeaveLetter(String year);
	
	@Query("select new com.logsik.taman.dtos.UserLeaveDayDto(us.id,"
			+ "us.fullName,"
			+ "us.company.name,"
			+ "us.email,"
			+ "us.labourContract,"
			+"ll.id,"
			+ "ll.startWorkDate,"
			+ "ll.lastTotalAnnualLeave, "
			+ "us.phone) "
			+ " FROM com.logsik.taman.domain.LeaveLetter ll "
			+ " RIGHT JOIN ll.user us "
			+ "	WHERE ll.startWorkDate IN "
			+ "	  ( SELECT  MAX(CASE WHEN (DATE_FORMAT(subLetter.startWorkDate,'%Y')=?1 ) THEN subLetter.startWorkDate ELSE NULL END) from leave_letter subLetter WHERE ll.userId = subLetter.userId AND  subLetter.userId = ?2 group by subLetter.userId)  "
			+ " ")
	List<UserLeaveDayDto> lastestLeaveLetterByUser ( String year,Long userId);

	
	LeaveLetter findByUserIdAndLeaveTypeAndStartLeaveDateAndEndLeaveDate(Long userId,TypeOfLeave typeOfLeave , Date startLeaveDate , Date endLeaveDate);
	
			@Query(value = "SELECT * FROM leave_letter WHERE leave_letter.user_id = ?1 AND YEAR(?2)=YEAR(leave_letter.start_work_date) ORDER BY leave_letter.start_work_date DESC", nativeQuery = true)
			List<LeaveLetter> getTotaLeaveLetterThisYear(long userId, Date date);
			
			List<LeaveLetter> findByUserIdAndStartLeaveDate(long userId, Date startLeaveDate);
			
			List<LeaveLetter> findByUserIdAndStartLeaveDateBetween(long userId, Date startDayOfYear, Date endDayOfYear);
			
			
			
}
