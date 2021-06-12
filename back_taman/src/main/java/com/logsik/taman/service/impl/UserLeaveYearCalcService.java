package com.logsik.taman.service.impl;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.controller.AbstractController;
import com.logsik.taman.domain.LeaveLetter;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.SumEmployeeAttendanceDto;
import com.logsik.taman.dtos.UserLeaveDayDto;
import com.logsik.taman.enums.LeaveLetterStatus;
import com.logsik.taman.enums.TypeOfLeave;
import com.logsik.taman.repository.EmployeeAttendanceRepository;
import com.logsik.taman.repository.LeaveLetterRepository;
import com.logsik.taman.repository.UserRepository;

@Service
@Transactional
public class UserLeaveYearCalcService  extends AbstractController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private LeaveLetterRepository leaveLetterRepository;
	@Autowired
	private EmployeeAttendanceRepository employeeAttendanceRepository;
	
	@Autowired
	private TimeService timeService;
	
	public void updateAllUserTotalAnnualLeaveByYear(Float annualLeaveNumber,Integer year){
		Date startDateOfYear= timeService.getFirstDayOfYear(year);
		Date endDateOfYear = timeService.getLastDayOfYear(year) ;
		List<User> listUser = userRepository.findByIsActive(true);
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
			for(User user : listUser) {
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
	                
					
					totalBonusOvertimeAttendance = bonusNormalOvertimeAttendance+bonusSatOvertimeAttendance+bonusSunOvertimeAttendance+bonusHolidayOvertimeAttendance;
					totalAbsentDayPerYear = leaveYear+absentWithoutLeave+compensatoryLeave;
					totalAnnualLeaveNumberRemaining = (annualLeaveNumber +totalBonusOvertimeAttendance)-totalAbsentDayPerYear;
				
					
					
					List<UserLeaveDayDto> listLastestLeaveLetterByUser = leaveLetterRepository.lastestLeaveLetterByUser(year.toString(),user.getId());
					UserLeaveDayDto lastestLeaveLetterByUser = null;
					if(listLastestLeaveLetterByUser.size() > 0) {
						lastestLeaveLetterByUser = listLastestLeaveLetterByUser.get(listLastestLeaveLetterByUser.size() -1);
						
					}
			if(getCurrentUser() !=null ) {
			if(lastestLeaveLetterByUser !=null) {
				LeaveLetter leaveLetter = leaveLetterRepository.findById(lastestLeaveLetterByUser.getLeaveLetterId()).get();
				leaveLetter.setLastTotalAbsentDay(totalAbsentDayPerYear);
				leaveLetter.setLastTotalAnnualLeave(annualLeaveNumber);
				leaveLetter.setLastTotalBonusLeaveDay(totalBonusOvertimeAttendance);
				leaveLetter.setLastTotalAnnualLeaveRemaining(totalAnnualLeaveNumberRemaining);
				user.setAnnualLeaveYear(annualLeaveNumber);
				userRepository.save(user);
				leaveLetterRepository.save(leaveLetter);
			}else {
				LeaveLetter newLeaveLetter = new LeaveLetter(); 
				newLeaveLetter.setUserId(user.getId());
				newLeaveLetter.setStartLeaveDate(startDateOfYear);
				newLeaveLetter.setEndLeaveDate(startDateOfYear);
				newLeaveLetter.setStartWorkDate(startDateOfYear);
				newLeaveLetter.setLeaveType(TypeOfLeave.CHECK_ANNUAL_LEAVE);
				newLeaveLetter.setApprovedById(getCurrentUser().getId());
				newLeaveLetter.setCreatedDate(new Date());
				newLeaveLetter.setTotalLeaveDays(0F);
				newLeaveLetter.setHoliday(0F);
				newLeaveLetter.setLeaveDays(0F);
				newLeaveLetter.setStatus(LeaveLetterStatus.DA_DUYET);	
				newLeaveLetter.setLastTotalAbsentDay(totalAbsentDayPerYear);
				newLeaveLetter.setLastTotalAnnualLeave(annualLeaveNumber);
				newLeaveLetter.setLastTotalBonusLeaveDay(totalBonusOvertimeAttendance);
				newLeaveLetter.setLastTotalAnnualLeaveRemaining(totalAnnualLeaveNumberRemaining);
				user.setAnnualLeaveYear(annualLeaveNumber);
				userRepository.save(user);
				leaveLetterRepository.save(newLeaveLetter);
			}
			
			}
			
		}
	}
			
			public void updateTotalAnnualLeaveByYearAndUserId(Float annualLeaveNumber,Long userId,Integer year){
				Date startDateOfYear= timeService.getFirstDayOfYear(year);
				Date endDateOfYear = timeService.getLastDayOfYear(year) ;
				User user = userRepository.findById(userId).get();
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
			                
							
							totalBonusOvertimeAttendance = bonusNormalOvertimeAttendance+bonusSatOvertimeAttendance+bonusSunOvertimeAttendance+bonusHolidayOvertimeAttendance;
							totalAbsentDayPerYear = leaveYear+absentWithoutLeave+compensatoryLeave;
							totalAnnualLeaveNumberRemaining = (annualLeaveNumber +totalBonusOvertimeAttendance)-totalAbsentDayPerYear;
						
							
							
						List<UserLeaveDayDto> listLastestLeaveLetterByUser = leaveLetterRepository.lastestLeaveLetterByUser(year.toString(),user.getId());
						UserLeaveDayDto lastestLeaveLetterByUser = null;
						if(listLastestLeaveLetterByUser.size() > 0) {
							lastestLeaveLetterByUser = listLastestLeaveLetterByUser.get(listLastestLeaveLetterByUser.size() -1);
							
						}
						
					if(getCurrentUser() !=null ) {
					
					if(lastestLeaveLetterByUser !=null) {
						LeaveLetter leaveLetter = leaveLetterRepository.findById(lastestLeaveLetterByUser.getLeaveLetterId()).get();
						leaveLetter.setLastTotalAbsentDay(totalAbsentDayPerYear);
						leaveLetter.setLastTotalAnnualLeave(annualLeaveNumber);
						leaveLetter.setLastTotalBonusLeaveDay(totalBonusOvertimeAttendance);
						leaveLetter.setLastTotalAnnualLeaveRemaining(totalAnnualLeaveNumberRemaining);
						leaveLetterRepository.save(leaveLetter);
					}else {
						LeaveLetter newLeaveLetter = new LeaveLetter(); 
						newLeaveLetter.setUserId(user.getId());
						newLeaveLetter.setStartLeaveDate(startDateOfYear);
						newLeaveLetter.setEndLeaveDate(startDateOfYear);
						newLeaveLetter.setStartWorkDate(startDateOfYear);
						newLeaveLetter.setLeaveType(TypeOfLeave.CHECK_ANNUAL_LEAVE);
						newLeaveLetter.setApprovedById(getCurrentUser().getId());
						newLeaveLetter.setCreatedDate(new Date());
						newLeaveLetter.setTotalLeaveDays(0F);
						newLeaveLetter.setHoliday(0F);
						newLeaveLetter.setLeaveDays(0F);
						newLeaveLetter.setStatus(LeaveLetterStatus.DA_DUYET);	
						newLeaveLetter.setLastTotalAbsentDay(totalAbsentDayPerYear);
						newLeaveLetter.setLastTotalAnnualLeave(annualLeaveNumber);
						newLeaveLetter.setLastTotalBonusLeaveDay(totalBonusOvertimeAttendance);
						newLeaveLetter.setLastTotalAnnualLeaveRemaining(totalAnnualLeaveNumberRemaining);
						leaveLetterRepository.save(newLeaveLetter);
					}
					
					
				}
	
	}
}

	
