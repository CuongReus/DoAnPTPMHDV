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
	
	//Use These @Query Bellow when need to filter by Month and Year 
//	@Query("select new com.logsik.taman.dtos.LeaveDayManageDto(us, "
//			+ "SUM(ll.totalLeaveDays)) "
//			+ "from com.logsik.taman.domain.LeaveLetter ll left join ll.user us where (ll.month = ?1 AND ll.year = ?2) GROUP BY (us) ")
//	Page<LeaveDayManageDto> listLeaveLetter(Integer month, Integer year, Pageable pageable);
//
//	@Query("select new com.logsik.taman.dtos.LeaveDayManageDto(us, "
//			+ "SUM(ll.totalLeaveDays)) "
//			+ "from com.logsik.taman.domain.LeaveLetter ll left join ll.user us where (ll.month = ?1 AND ll.year = ?2 AND us.fullName like %?3%) GROUP BY (us) ")
//	Page<LeaveDayManageDto> listLeaveLetterWithFullName(Integer month, Integer year, String fullName,
//			Pageable pageable);
	
	
//	
	@EntityGraph(attributePaths = { "user","user.company","user.department","approvedBy"})
	Page<LeaveLetter> findByUserId(Long userId,Pageable pageable);
	
	
	@EntityGraph(attributePaths = { "user","user.company","user.department","approvedBy"})
	Page<LeaveLetter> findByUserIdAndLeaveTypeNotAndStartWorkDateBetween(Long userId,TypeOfLeave typeOfLeave ,Date dateToWorkStart,Date dateToWorkEnd,Pageable pageable);
	
	@Query("select new com.logsik.taman.dtos.UserLeaveDayDto(us.id,"
			+ "us.image,"
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
			+ "us.image,"
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
	
//	@Query("select new com.logsik.taman.dtos.UserLeaveDayDto(us.id,"
//			+ "us.image,"
//			+ "us.fullName,"
//			+ "us.company.name,"
//			+ "us.email,us.labourContract,"
//			+ "latestDateGroup.startWorkDate,"
//			+ "latestDateGroup.lastTotalAnnualLeave, "
//			+ "us.phone ) "
//			+ "from "
//			+ " ( SELECT ll.userId,ll.startWorkDate,ll.lastTotalAnnualLeave from com.logsik.taman.domain.LeaveLetter ll "
//			+ "	WHERE ll.startWorkDate IN "
//			+ "	  ( SELECT (  MAX(CASE WHEN (DATE_FORMAT(subLetter.startWorkDate,'%Y')=?1 ) THEN subLetter.startWorkDate ELSE NULL END)) from leave_letter subLetter group by subLetter.userId)  "
//			+ " ) latestDateGroup "
//			+ "from com.logsik.taman.domain.LeaveLetter ll RIGHT JOIN ll.user us where (us.fullName like %?2%)  GROUP BY (us) ")
//	Page<UserLeaveDayDto> listLeaveLetterWithFullName(String year,String fullName,
//			Pageable pageable);
	
	
	
	
			@Query(value = "SELECT * FROM leave_letter WHERE leave_letter.user_id = ?1 AND YEAR(?2)=YEAR(leave_letter.start_work_date) ORDER BY leave_letter.start_work_date DESC", nativeQuery = true)
			List<LeaveLetter> getTotaLeaveLetterThisYear(long userId, Date date);
			
			List<LeaveLetter> findByUserIdAndStartLeaveDate(long userId, Date startLeaveDate);
			
			List<LeaveLetter> findByUserIdAndStartLeaveDateBetween(long userId, Date startDayOfYear, Date endDayOfYear);
			
			
			
}
