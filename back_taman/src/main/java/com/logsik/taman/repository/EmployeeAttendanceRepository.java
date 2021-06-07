package com.logsik.taman.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;

import com.logsik.taman.domain.EmployeeAttendance;
import com.logsik.taman.dtos.SumEmployeeAttendanceDto;
import com.logsik.taman.enums.AttendanceType;

public interface EmployeeAttendanceRepository extends BaseRepository<EmployeeAttendance, Long> {

	@EntityGraph(attributePaths = { "user","user.department" })
	Optional<EmployeeAttendance> findById(Long id);

	@EntityGraph(attributePaths = { "user","user.department" })
	Page<EmployeeAttendance> findAll(Pageable pageable);

	@EntityGraph(attributePaths = { "user","user.department" })
	List<EmployeeAttendance> findAll();

	@EntityGraph(attributePaths = { "user","user.department"})
	List<EmployeeAttendance> findDistinctByDateToWork(Date dateToWork);
	
	List<EmployeeAttendance> findByLeaveLetterId(long leaveLetterId);

	@EntityGraph(attributePaths = { "user","user.department" })
	List<EmployeeAttendance> findByUserIdAndDateToWorkBetween(Long userId, Date dateToWorkStart,
			Date dateToWorkEnd);
	
	
	@EntityGraph(attributePaths = { "user","user.department" })
	EmployeeAttendance findByDateToWorkAndUserId(Date dateToWork , Long userId);
	
	
	@EntityGraph(attributePaths = { "user","user.department" })
	List<EmployeeAttendance> findByUserIdAndDateToWorkBetweenAndAttendanceType(Long userId, Date dateToWorkStart,
			Date dateToWorkEnd,AttendanceType attendanceType);
	
	EmployeeAttendance findByUserIdAndDateToWorkAndAttendanceType(Long userId, Date dateToWork, AttendanceType attendanceType);

//	@EntityGraph(attributePaths = { "user","user.department" })
//	List<EmployeeAttendance> findByDateToWorkBetween(Date dateToWorkStart, Date dateToWorkEnd);
//	@Query("select new com.logsik.taman.dtos.SumEmployeeAttendanceDto(us.id, "
//			+ "SUM(CASE WHEN ea.attendanceType = 'X' THEN 1.0 WHEN ea.attendanceType = 'X2' THEN 0.5 ELSE 0 END), "
//			+ "SUM(CASE WHEN ea.attendanceType = 'NG_X' THEN 1.0 WHEN ea.attendanceType = 'NG_X2' THEN 1 ELSE 0 END), "
//			+ "SUM(CASE WHEN ea.attendanceType = 'NG_7' THEN 1.0 WHEN ea.attendanceType = 'NG_72' THEN 1 ELSE 0 END), "
//			+ "SUM(CASE WHEN ea.attendanceType = 'NG_CN' THEN 1.0 WHEN ea.attendanceType = 'NG_CN2' THEN 1 ELSE 0 END), "
//			+ "SUM(CASE WHEN ea.attendanceType = 'NG_L' THEN 1.0 WHEN ea.attendanceType = 'NG_L2' THEN 1 ELSE 0 END), "
//			+ "SUM(CASE WHEN ea.attendanceType = 'NL' THEN 1.0 WHEN ea.attendanceType = 'NL2' THEN 0.5 ELSE 0 END), "
//			+ "SUM(CASE WHEN ea.attendanceType = 'PN' THEN 1.0 WHEN ea.attendanceType = 'PN2' THEN 0.5 ELSE 0 END), "
//			+ "SUM(CASE WHEN ea.attendanceType = 'KP' THEN 1.0 WHEN ea.attendanceType = 'KP2' THEN 0.5 ELSE 0 END), "
//			+ "SUM(CASE WHEN ea.attendanceType = 'NB' THEN 1.0 WHEN ea.attendanceType = 'NB2' THEN 0.5 ELSE 0 END)) "
//            + "from com.logsik.taman.domain.EmployeeAttendance ea LEFT JOIN ea.user us where us.id = ?1 AND ea.dateToWork BETWEEN ?2 AND ?3")
//	List<SumEmployeeAttendanceDto> sumEmployeeAttendance(Long userId,Date startDate ,Date endDate);

	
	@EntityGraph(attributePaths = { "user","user.department" })
	List<EmployeeAttendance> findByDateToWorkBetween(Date dateToWorkStart, Date dateToWorkEnd);
	@Query("select new com.logsik.taman.dtos.SumEmployeeAttendanceDto(us.id, "
			+ "SUM(CASE WHEN ea.attendanceType = 'X' THEN 1.0 WHEN ea.attendanceType = 'X2' THEN 0.5 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_X' THEN 1.0 WHEN ea.attendanceType = 'NG_X2' THEN 1 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_7' THEN 1.0 WHEN ea.attendanceType = 'NG_72' THEN 1 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_CN' THEN 1.0 WHEN ea.attendanceType = 'NG_CN2' THEN 1 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_L' THEN 1.0 WHEN ea.attendanceType = 'NG_L2' THEN 1 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NL' THEN 1.0 WHEN ea.attendanceType = 'NL2' THEN 0.5 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'PN' THEN 1.0 WHEN ea.attendanceType = 'PN2' THEN 0.5 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'KP' THEN 1.0 WHEN ea.attendanceType = 'KP2' THEN 0.5 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NB' THEN 1.0 WHEN ea.attendanceType = 'NB2' THEN 0.5 ELSE 0 END)) "
            + "from com.logsik.taman.domain.EmployeeAttendance ea LEFT JOIN ea.user us where us.id = ?1 AND ea.dateToWork BETWEEN ?2 AND ?3")
	List<SumEmployeeAttendanceDto> sumEmployeeAttendance(Long userId,Date startDate ,Date endDate);
	
	@Query("select new com.logsik.taman.dtos.SumEmployeeAttendanceDto(us.id,"
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_X' AND ea.overtimeType = 'TREN_5H_30' THEN 1.0 ELSE 0 END),"
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_7' AND ea.overtimeType = 'TREN_5H_30' THEN 1.0 ELSE 0 END),"
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_CN' AND ea.overtimeType = 'TREN_5H_30' THEN 2.0 ELSE 0 END),"
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_L' AND ea.overtimeType = 'TREN_5H_30' THEN 3.0 ELSE 0 END),"
			+ "SUM(CASE WHEN ea.attendanceType = 'NL' THEN 1.0 WHEN ea.attendanceType = 'NL2' THEN 0.5 ELSE 0 END),"
			+ "SUM(CASE WHEN ea.attendanceType = 'PN' THEN 1.0  WHEN ea.attendanceType = 'PN2' THEN 0.5 ELSE 0 END ),"
			+ "SUM(CASE WHEN ea.attendanceType = 'KP' THEN 1.0  WHEN ea.attendanceType = 'KP2' THEN 0.5 ELSE 0 END ),"
			+ "SUM(CASE WHEN ea.attendanceType = 'NB' THEN 1.0 WHEN ea.attendanceType = 'NB2' THEN 0.5  ELSE 0 END )) "
			+ "from com.logsik.taman.domain.EmployeeAttendance ea LEFT JOIN ea.user us where us.id = ?1 AND ea.dateToWork BETWEEN ?2 AND ?3")
	SumEmployeeAttendanceDto sumEmployeeAttendanceLeaveDayCalc(Long userId,Date startDate ,Date endDate);
	
	@Query("select new com.logsik.taman.dtos.SumEmployeeAttendanceDto(us.id,"
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_X' AND ea.overtimeType = 'TREN_5H_30' THEN 1.0 ELSE 0 END),"
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_7' AND ea.overtimeType = 'TREN_5H_30' THEN 1.0 ELSE 0 END),"
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_CN' AND ea.overtimeType = 'TREN_5H_30' THEN 2.0 ELSE 0 END),"
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_L' AND ea.overtimeType = 'TREN_5H_30' THEN 3.0 ELSE 0 END),"
			+ "SUM(CASE WHEN ea.attendanceType = 'NL' THEN 1.0 WHEN ea.attendanceType = 'NL2' THEN 0.5 ELSE 0 END),"
			+ "SUM(CASE WHEN ea.attendanceType = 'PN' THEN 1.0  WHEN ea.attendanceType = 'PN2' THEN 0.5 ELSE 0 END ),"
			+ "SUM(CASE WHEN ea.attendanceType = 'KP' THEN 1.0  WHEN ea.attendanceType = 'KP2' THEN 0.5 ELSE 0 END ),"
			+ "SUM(CASE WHEN ea.attendanceType = 'NB' THEN 1.0 WHEN ea.attendanceType = 'NB2' THEN 0.5  ELSE 0 END )) "
			+ "from com.logsik.taman.domain.EmployeeAttendance ea LEFT JOIN ea.user us where  ea.dateToWork BETWEEN ?1 AND ?2 GROUP BY (us)")
	List<SumEmployeeAttendanceDto> listSumEmployeeAttendanceLeaveDayCalc(Date startDate ,Date endDate);
	
			
	@Query("select new com.logsik.taman.dtos.SumEmployeeAttendanceDto(us.id, "
			+ "SUM(CASE WHEN ea.attendanceType = 'X' THEN 1.0 WHEN ea.attendanceType = 'X2' THEN 0.5 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_X' THEN 1.0 WHEN ea.attendanceType = 'NG_X2' THEN 1 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_7' THEN 1.0 WHEN ea.attendanceType = 'NG_72' THEN 1 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_CN' THEN 1.0 WHEN ea.attendanceType = 'NG_CN2' THEN 1 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NG_L' THEN 1.0 WHEN ea.attendanceType = 'NG_L2' THEN 1 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NL' THEN 1.0 WHEN ea.attendanceType = 'NL2' THEN 0.5 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'PN' THEN 1.0 WHEN ea.attendanceType = 'PN2' THEN 0.5 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'KP' THEN 1.0 WHEN ea.attendanceType = 'KP2' THEN 0.5 ELSE 0 END), "
			+ "SUM(CASE WHEN ea.attendanceType = 'NB' THEN 1.0 WHEN ea.attendanceType = 'NB2' THEN 0.5 ELSE 0 END)) "
            + "from com.logsik.taman.domain.EmployeeAttendance ea LEFT JOIN ea.user us where  ea.dateToWork BETWEEN ?1 AND ?2 GROUP BY us ")
	List<SumEmployeeAttendanceDto> listSumEmployeeAttendance(Date startDate, Date endDate);
	
	List<EmployeeAttendance> findByUserIdAndAttendanceTypeOrAttendanceTypeAndDateToWorkBetween(long userId,AttendanceType typePN, AttendanceType typePN2, Date startDate ,Date endDate );
}
