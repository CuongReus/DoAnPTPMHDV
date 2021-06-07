package com.logsik.taman.service.impl;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.EmployeeAttendance;
import com.logsik.taman.domain.EmployeeSalary;
import com.logsik.taman.domain.LeaveLetter;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.SumEmployeeAttendanceDto;
import com.logsik.taman.enums.AttendanceStatus;
import com.logsik.taman.enums.AttendanceType;
import com.logsik.taman.enums.LateStatus;
import com.logsik.taman.enums.TypeOfLeave;
import com.logsik.taman.repository.EmployeeAttendanceRepository;
import com.logsik.taman.repository.EmployeeSalaryRepository;
import com.logsik.taman.repository.LeaveLetterRepository;
import com.logsik.taman.repository.UserRepository;

@Service
@Transactional
public class EmployeeAbsentAttendanceService  {

	@Autowired 
 	private EmployeeAttendanceRepository employeeAttendanceRepository;
	
	@Autowired
	private LeaveLetterRepository leaveLetterRepository;
	
	@Autowired
	private UserRepository userRepository ;
	
	@Autowired
	private TimeService timeService;
	
	@Autowired
	private EmployeeSalaryService employeeSalaryService;
	
	@Autowired
	private EmployeeSalaryRepository employeeSalaryRepository;
	
//	Use for create annual leave  attendance from leave letter
	public void addEmployeeAttendanceFromLeaveLetter(LeaveLetter leaveLetter) throws ParseException {
		List<Date> dates = timeService.getDatesBetween(leaveLetter.getStartLeaveDate(), leaveLetter.getEndLeaveDate());
		String attendanceType = "PN";
		if(TypeOfLeave.ANNUAL_HOLIDAY_2.equals(leaveLetter.getLeaveType()) || TypeOfLeave.PN2.equals(leaveLetter.getLeaveType()) ) {
			attendanceType = "PN2";
		}

		for(Date date :dates ) {		
			Calendar startDate = Calendar.getInstance();
			startDate.setTime(date);
			
			if (startDate.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY) {
				createEmployeeAttendanceFromLeaveLetter(leaveLetter, "PN2", date);
			}else if (startDate.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
				continue;
			}else {
				createEmployeeAttendanceFromLeaveLetter(leaveLetter, attendanceType, date);
			}
		}
	}
	
	private void createEmployeeAttendanceFromLeaveLetter(LeaveLetter leaveLetter, String attendanceType, Date date) {
		EmployeeAttendance employeeAttendance = new EmployeeAttendance();
		employeeAttendance.setAttendanceType(AttendanceType.valueOf(attendanceType));
		employeeAttendance.setWorkPlace(leaveLetter.getWorkPlace());
		employeeAttendance.setDateToWork(date);
		employeeAttendance.setStatus(AttendanceStatus.VANG_MAT);
		employeeAttendance.setLateStatus(LateStatus.KHONG);
		employeeAttendance.setUserId(leaveLetter.getUserId());
		employeeAttendance.setNote(leaveLetter.getNote());
		employeeAttendance.setLeaveLetterId(leaveLetter.getId());
		employeeAttendance.setWorkPlace(leaveLetter.getWorkPlace());
		employeeAttendanceRepository.save(employeeAttendance);
		
		List<EmployeeSalary> currentEmployeeSalary = employeeSalaryRepository.findByUserIdAndMonthAndYear(
				employeeAttendance.getUserId(),
				timeService.getMonth(employeeAttendance.getDateToWork()), timeService.getYear(employeeAttendance.getDateToWork()));
		
		if (!currentEmployeeSalary.isEmpty()) {
			employeeSalaryService.reloadEmployeeAttendanceSalary(employeeAttendance,currentEmployeeSalary.get(0));
		}
		
	}
//	Use for create all leave day (holidayLeave,compensatory leave and absent without leave )  letter from employeeAttendance
	public void addLeaveLetterFromEmployeeAttendanceFrom(EmployeeAttendance employeeAttendance) {
		
		
		Date startDateOfYear= timeService.getFirstDayOfYear(timeService.getYear(employeeAttendance.getDateToWork()));
		Date endDateOfYear = timeService.getLastDayOfYear(timeService.getYear(employeeAttendance.getDateToWork())) ;
		Float bonusNormalOvertimeAttendance = 0F;
		Float bonusSatOvertimeAttendance = 0F;
		Float bonusSunOvertimeAttendance = 0F;
		Float bonusHolidayOvertimeAttendance = 0F;
		Float holidayLeave=  0F;
		Float leaveYear=  0F;
		Float absentWithoutLeave=  0F;
		Float compensatoryLeave= 0F;
		Float totalBonusOvertimeAttendance =  0F;
		Float totalAbsentDayPerYear = 0F;
		Float totalAnnualLeaveNumberRemaining =  0F;
		Float totalLeaveDay = 0F;
		User user = userRepository.findById(employeeAttendance.getUserId()).get();
		
		SumEmployeeAttendanceDto sumEmployeeAttendanceLeaveYearDto =  employeeAttendanceRepository.sumEmployeeAttendanceLeaveDayCalc(user.getId(), startDateOfYear, endDateOfYear);
		if(sumEmployeeAttendanceLeaveYearDto.getBonusNormalOvertimeAttendance()!=null) {
           				bonusNormalOvertimeAttendance =(float) (sumEmployeeAttendanceLeaveYearDto.getBonusNormalOvertimeAttendance()*1); 
        }
		if(sumEmployeeAttendanceLeaveYearDto.getBonusSatOvertimeAttendance()!=null) {
           				bonusSatOvertimeAttendance =(float) (sumEmployeeAttendanceLeaveYearDto.getBonusSatOvertimeAttendance()*1); 
        }
        if(sumEmployeeAttendanceLeaveYearDto.getBonusSunOvertimeAttendance()!=null) {
          				bonusSunOvertimeAttendance =(float) (sumEmployeeAttendanceLeaveYearDto.getBonusSunOvertimeAttendance()*1);  
        }
        if(sumEmployeeAttendanceLeaveYearDto.getBonusHolidayOvertimeAttendance()!=null) {
          				bonusHolidayOvertimeAttendance =(float) (sumEmployeeAttendanceLeaveYearDto.getBonusHolidayOvertimeAttendance()*1);  
        }
        if(sumEmployeeAttendanceLeaveYearDto.getBonusHolidayOvertimeAttendance()!=null) {
           				holidayLeave= (float) (sumEmployeeAttendanceLeaveYearDto.getBonusHolidayOvertimeAttendance()*1); 
        }
        if(sumEmployeeAttendanceLeaveYearDto.getLeaveYear()!=null) {
          				leaveYear= (float) (sumEmployeeAttendanceLeaveYearDto.getLeaveYear()*1);  
        }
        if(sumEmployeeAttendanceLeaveYearDto.getAbsentWithoutLeave()!=null) {
            				absentWithoutLeave= (float) (sumEmployeeAttendanceLeaveYearDto.getAbsentWithoutLeave()*1);
        }
        if(sumEmployeeAttendanceLeaveYearDto.getCompensatoryLeave()!=null) {
            				compensatoryLeave= (float) (sumEmployeeAttendanceLeaveYearDto.getCompensatoryLeave()*1);
        }
        if(employeeAttendance.getAttendanceType() == AttendanceType.KP ||  employeeAttendance.getAttendanceType() == AttendanceType.NB || employeeAttendance.getAttendanceType() == AttendanceType.NL ) {
        	totalLeaveDay =1F;
        }else if(employeeAttendance.getAttendanceType() == AttendanceType.KP2 || employeeAttendance.getAttendanceType() == AttendanceType.NB2 ||  employeeAttendance.getAttendanceType() == AttendanceType.NL2  ) {
        	totalLeaveDay = 0.5F;
        }
        
        
		totalBonusOvertimeAttendance = bonusNormalOvertimeAttendance+bonusSatOvertimeAttendance+bonusSunOvertimeAttendance+bonusHolidayOvertimeAttendance;
		totalAbsentDayPerYear = leaveYear+absentWithoutLeave+compensatoryLeave;
		totalAnnualLeaveNumberRemaining = (user.getAnnualLeaveYear() +totalBonusOvertimeAttendance)-totalAbsentDayPerYear;
		Date today = new Date(); 
		LeaveLetter leaveLetterExist = leaveLetterRepository.findByUserIdAndLeaveTypeAndStartLeaveDateAndEndLeaveDate(user.getId(),TypeOfLeave.valueOf(employeeAttendance.getAttendanceType().toString()),employeeAttendance.getDateToWork(),employeeAttendance.getDateToWork());
		if(leaveLetterExist == null) {
			LeaveLetter newLeaveLetter  = new LeaveLetter();
//			newLeaveLetter.setApprovedBy();
			newLeaveLetter.setLeaveType(TypeOfLeave.valueOf(employeeAttendance.getAttendanceType().toString()));
			newLeaveLetter.setUserId(employeeAttendance.getUserId());
			newLeaveLetter.setCreatedDate(today);
			newLeaveLetter.setStartLeaveDate(employeeAttendance.getDateToWork());
			newLeaveLetter.setEndLeaveDate(employeeAttendance.getDateToWork());
			newLeaveLetter.setTotalLeaveDays(totalLeaveDay);
			newLeaveLetter.setLeaveDays(totalLeaveDay);
			newLeaveLetter.setWorkPlace(employeeAttendance.getWorkPlace());
			newLeaveLetter.setHoliday(0F);
//			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(employeeAttendance.getDateToWork());
			c.add(Calendar.DAY_OF_MONTH, 1); 
			newLeaveLetter.setStartWorkDate(c.getTime());
			newLeaveLetter.setLastTotalAnnualLeave(user.getAnnualLeaveYear());
			newLeaveLetter.setLastTotalAbsentDay(totalAbsentDayPerYear);
			newLeaveLetter.setLastTotalBonusLeaveDay(totalBonusOvertimeAttendance);
			newLeaveLetter.setLastTotalAnnualLeaveRemaining(totalAnnualLeaveNumberRemaining);
			
//			LeaveLetter leaveLetterBefor = leaveLetterRepository.getTotaLeaveLatterBefor(employeeAttendance.getUserId(), new Date()).get(0);
//			
//			if(newLeaveLetter.getLeaveType().equals(TypeOfLeave.NB)) {
//				newLeaveLetter.setLastTotalAbsentDay(leaveLetterBefor.getLastTotalAbsentDay());
//				newLeaveLetter.setLastTotalBonusLeaveDay(leaveLetterBefor.getLastTotalBonusLeaveDay());
//				newLeaveLetter.setLastTotalAnnualLeave(leaveLetterBefor.getLastTotalAnnualLeave() - 1f );
//				newLeaveLetter.setLastTotalAnnualLeaveRemaining(leaveLetterBefor.getLastTotalAnnualLeaveRemaining() - 1f);
//			}
//			if(newLeaveLetter.getLeaveType().equals(TypeOfLeave.NB2)) {
//				newLeaveLetter.setLastTotalAbsentDay(leaveLetterBefor.getLastTotalAbsentDay());
//				newLeaveLetter.setLastTotalBonusLeaveDay(leaveLetterBefor.getLastTotalBonusLeaveDay());
//				newLeaveLetter.setLastTotalAnnualLeave(leaveLetterBefor.getLastTotalAnnualLeave() - 0.5f );
//				newLeaveLetter.setLastTotalAnnualLeaveRemaining(leaveLetterBefor.getLastTotalAnnualLeaveRemaining() - 0.5f);
//			}
			
			LeaveLetter leaveLetterTmp = leaveLetterRepository.save(newLeaveLetter);
			employeeAttendance.setLeaveLetterId(leaveLetterTmp.getId());
			employeeAttendanceRepository.save(employeeAttendance);
		}else {
			employeeAttendance.setLeaveLetterId(leaveLetterExist.getId());
			employeeAttendanceRepository.save(employeeAttendance);
		}
//		newLeaveLetter.setasLastTotalBonusLeaveDay(lastTotalBonusLeaveDay);
	}
//	this function use to delete leaveletter from employee attendance screen
	public void deleteLeaveLetterFromEmpAttendance(EmployeeAttendance employeeAttendance ) {
		LeaveLetter leaveLetterExist = leaveLetterRepository.findByUserIdAndLeaveTypeAndStartLeaveDateAndEndLeaveDate(employeeAttendance.getUserId(),TypeOfLeave.valueOf(employeeAttendance.getAttendanceType().toString()),employeeAttendance.getDateToWork(),employeeAttendance.getDateToWork());
		if(leaveLetterExist !=null) {
			leaveLetterRepository.deleteById(leaveLetterExist.getId());
		}
	}
	
	
	
	public void deleteListEmployeeLeaveAttendance(LeaveLetter leaveLetter) {
		String attendanceType = "PN";
		if(TypeOfLeave.ANNUAL_HOLIDAY_2.equals(leaveLetter.getLeaveType())) {
			attendanceType = "PN2";
		}
		List<EmployeeAttendance> attendances = employeeAttendanceRepository.findByUserIdAndDateToWorkBetweenAndAttendanceType(
				leaveLetter.getUserId(),
				leaveLetter.getStartLeaveDate(),
				leaveLetter.getEndLeaveDate(),
				AttendanceType.valueOf(attendanceType));
		
		for(EmployeeAttendance empAttendance: attendances) {
			employeeAttendanceRepository.deleteById(empAttendance.getId());
		}
	}
	
	public void deleteEmployeeLeaveAttendance(LeaveLetter leaveLetter) {
		EmployeeAttendance employeeAttendance = 	employeeAttendanceRepository.findByUserIdAndDateToWorkAndAttendanceType(leaveLetter.getUserId(),
				leaveLetter.getStartLeaveDate(),
				AttendanceType.valueOf(leaveLetter.getLeaveType().toString()));
		employeeAttendanceRepository.deleteById(employeeAttendance.getId());
	}
	
}
