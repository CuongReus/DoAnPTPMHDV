package com.logsik.taman.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.LabourAttendance;
import com.logsik.taman.dtos.SumLabourAttendanceDto;
import com.logsik.taman.dtos.SumLabourSupportAndAwareDto;

public interface LabourAttendanceRepository extends BaseRepository<LabourAttendance, Long> {
	@EntityGraph(attributePaths = { "labour", "labour.companies","project","project.projectYear","project.projectYear.company","projectDetail","createdUser","lastedUpdateUser" })
	Page<LabourAttendance> findAll(Pageable pageable);

	@EntityGraph(attributePaths = { "labour", "labour.companies","project","project.projectYear","project.projectYear.company","projectDetail","createdUser","lastedUpdateUser" })
	Optional<LabourAttendance> findById(Long id);

	@EntityGraph(attributePaths = { "labour", "labour.companies","project","project.projectYear","project.projectYear.company","projectDetail","createdUser","lastedUpdateUser" })
	List<LabourAttendance> findDistinctByLabourIdAndDateToWorkBetween(Long labourId, Date dateToWorkStart, Date dateToWorkEnd);
	@EntityGraph(attributePaths = { "labour", "labour.companies","project","project.projectYear","project.projectYear.company","projectDetail","createdUser","lastedUpdateUser" })
	List<LabourAttendance> findDistinctByDateToWorkBetween(Date dateToWorkStart, Date dateToWorkEnd);

	List<LabourAttendance> findDistinctByLabourIdAndDateToWork(Long labourId, Date dateToWork);
	@EntityGraph(attributePaths = { "labour", "labour.companies","project","projectDetail","createdUser","lastedUpdateUser" })
	List<LabourAttendance> findAll();
	
	@EntityGraph(attributePaths = { "labour", "labour.companies","project","project.projectYear","project.projectYear.company","projectDetail","createdUser","lastedUpdateUser" })
	List<LabourAttendance> findByLabourId(Long labourId);
	
	@EntityGraph(attributePaths = { "labour", "labour.companies","project","projectDetail","createdUser","lastedUpdateUser" })
	List<LabourAttendance> findDistinctByCreatedUserIdAndDateToWorkBetween(Long createdUserId, Date dateToWorkStart, Date dateToWorkEnd);
	
	@EntityGraph(attributePaths = { "labour", "labour.companies","project","projectDetail","createdUser","lastedUpdateUser" })
	List<LabourAttendance> findDistinctByLabourIdAndCreatedUserIdAndDateToWorkBetween(Long labourId,Long createdUserId, Date dateToWorkStart, Date dateToWorkEnd);
	@EntityGraph(attributePaths = { "labour","labour.companies","project","projectDetail","createdUser","lastedUpdateUser" })
	List<LabourAttendance> findDistinctByDateToWork(Date dateToWork);
	
	
	
	
//	@Query("select new com.logsik.taman.dtos.SumLabourAttendanceDto(la.labour,"
//			+ "la.projectDetail.id,"
//			+ "SUM(la.totalDatetime),"
//			+ "SUM(CASE WHEN la.overtimeStatus = 'TANG_CA_THUONG_TOI' THEN la.totalOvertime ELSE 0 END),"
//			+ "SUM(CASE WHEN la.overtimeStatus = 'TANG_CA_KHUYA' THEN la.totalOvertime ELSE 0 END)) "
//			+ "from com.logsik.taman.domain.LabourAttendance la  WHERE la.labour.id =?1 AND la.projectDetail.id =?2 AND la.dateToWork BETWEEN ?3 AND ?4 ")
//	SumLabourAttendanceDto sumAttendanceByProjectDetail(Long labourId,Long projectDetailId,Date startDate, Date endDate);
//	
	@Query("select new com.logsik.taman.dtos.SumLabourAttendanceDto(la.labour,"
			+ "SUM(la.totalDatetime),"
			+ "SUM(CASE WHEN la.overtimeStatus = 'TANG_CA_THUONG_TOI' THEN la.totalOvertime ELSE 0 END),"
			+ "SUM(CASE WHEN la.overtimeStatus = 'TANG_CA_KHUYA' THEN la.totalOvertime ELSE 0 END)) "
			+ "from com.logsik.taman.domain.LabourAttendance la  WHERE la.labour.id =?1  AND la.dateToWork BETWEEN ?2 AND ?3 GROUP BY la.labour")
	SumLabourAttendanceDto sumAttendance(Long labourId,Date startDate, Date endDate);
	
	
	@Query("select new com.logsik.taman.dtos.SumLabourSupportAndAwareDto(lb.id, "
			+ "SUM(CASE WHEN la.supportFarConstructionStatus = 'CO' THEN 1 ELSE 0 END), "
			+ "SUM(CASE WHEN la.supportTransportFeeStatus = 'CO' THEN 1 ELSE 0 END), "
			+ "SUM(CASE WHEN la.lateStatus = 'CO' THEN 1 ELSE 0 END)) "
			+ "from com.logsik.taman.domain.LabourAttendance la LEFT JOIN la.labour lb "
			+ "where la.labour.id = ?1 AND la.dateToWork BETWEEN ?2 AND ?3 GROUP BY lb.id")
	SumLabourSupportAndAwareDto sumLabourSupportAndAwareByLabourId(Long labourId, Date startDate, Date endDate);
	
	@Query("select new com.logsik.taman.dtos.SumLabourAttendanceDto(la.labour,"
			+ "la.projectDetail.id,"
			+ "SUM(la.totalDatetime),"
			+ "SUM(CASE WHEN la.overtimeStatus = 'TANG_CA_THUONG_TOI' THEN la.totalOvertime ELSE 0 END),"
			+ "SUM(CASE WHEN la.overtimeStatus = 'TANG_CA_KHUYA' THEN la.totalOvertime ELSE 0 END)) "
			+ "from com.logsik.taman.domain.LabourAttendance la  WHERE  la.projectDetail.id =?1 AND la.dateToWork BETWEEN ?2 AND ?3 GROUP BY la.labour ")
	List<SumLabourAttendanceDto> listSumLabourAttendanceByProjectDetailId(Long projectDetailId,Date startDate, Date endDate);

	@Query("select distinct(la.projectDetailId) "
			+ "FROM  com.logsik.taman.domain.LabourAttendance la "
			+ "WHERE la.dateToWork BETWEEN ?1 AND ?2 ")
	List<Long> getAllProjectDetailIdOfLabourAttendanceInMonth(Date startOfMonth, Date endOfMonth);
}
