package com.logsik.taman.service.impl;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.Department;
import com.logsik.taman.domain.EmployeeAttendance;
import com.logsik.taman.domain.EmployeeSalary;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.EmployeeSalaryDto;
import com.logsik.taman.dtos.SumEmployeeAttendanceDto;
import com.logsik.taman.enums.AttendanceType;
import com.logsik.taman.enums.PaymentStatus;
import com.logsik.taman.repository.EmployeeAttendanceRepository;
import com.logsik.taman.repository.EmployeeSalaryRepository;
import com.logsik.taman.repository.UserRepository;

@Service
@Transactional
public class EmployeeSalaryService {
	
	@Autowired
	private EmployeeSalaryRepository employeeSalaryRepository;
	@Autowired
	private EmployeeAttendanceRepository employeeAttendanceRepository;
	
	@Autowired 
	private UserRepository userRepository;

	@Autowired
	private TimeService timeService;

	public EmployeeSalary createNewEmployeeSalaryFromEmployeeAttendance(EmployeeAttendance employeeAttendance) {
		EmployeeSalary employeeSalary = new EmployeeSalary();
		User user = userRepository.findById(employeeAttendance.getUserId()).get();
//			Those are money from user.
		Long salaryPerMonth = 0L;
		Long normalOvertimeFee = 0L;
		Long weekendOvertimeFee = 0L;
		Long holidayOvertimeFee = 0L;
		Long insuranceSalary = 0L;
		Long personalDeduction = 0L;
		Long familyCircumstanceDeduction = 0L;
		Long responsibilityAllowance = 0L;
		Long  lunchFee = 0L;
		Long  petrolFee =0L;
		Long  phoneFee=0L;
		Long  distanceSupportFee=0L; 
		Float attendanceCoefficient = 0F;
//			End money from user
		if (user.getSalaryLevel() != null) {
			salaryPerMonth = user.getSalaryLevel();
		}
		
		
		if (user.getLunchFee() != null) {
			lunchFee = user.getLunchFee();
		}
		if (user.getPetrolFee() != null) {
			petrolFee = user.getPetrolFee();
		}
		if (user.getPhoneFee() != null) {
			phoneFee = user.getPhoneFee();
		}
		if (user.getDistanceSupportFee() != null) {
			distanceSupportFee = user.getDistanceSupportFee();
		}
		if (user.getNormalOvertimeFee() != null) {
			normalOvertimeFee = user.getNormalOvertimeFee();
		}

		if (user.getWeekendOvertimeFee() != null) {
			weekendOvertimeFee = user.getWeekendOvertimeFee();
		}

		if (user.getHolidayOvertimeFee() != null) {
			holidayOvertimeFee = user.getHolidayOvertimeFee();
		}

		if (user.getInsuranceSalary() != null) {
			insuranceSalary = user.getInsuranceSalary();
		}
		if(user.getDepartment() != null && user.getDepartment().getAttendanceCoefficient() != null) {
			attendanceCoefficient = user.getDepartment().getAttendanceCoefficient();
		}

		if (user.getPersonalDeduction() != null) {
			personalDeduction = user.getPersonalDeduction();
		}
		if (user.getFamilyCircumstanceDeduction() != null) {
			familyCircumstanceDeduction = user.getFamilyCircumstanceDeduction();
		}
		if (user.getResponsibilityAllowance() != null) {
			responsibilityAllowance = user.getResponsibilityAllowance();
		}
		employeeSalary.setMonth(timeService.getMonth(employeeAttendance.getDateToWork()));
		employeeSalary.setYear(timeService.getYear(employeeAttendance.getDateToWork()));
		employeeSalary.setUserId(user.getId());
		employeeSalary.setSalaryPerMonth(salaryPerMonth);
		employeeSalary.setLunchFee(lunchFee);
		employeeSalary.setPetrolFee(petrolFee);
		employeeSalary.setPhoneFee(phoneFee);
		employeeSalary.setDistanceSupportFee(distanceSupportFee);
		employeeSalary.setNormalOvertimeFee(normalOvertimeFee);
		employeeSalary.setWeekendOvertimeFee(weekendOvertimeFee);
		employeeSalary.setHolidayOvertimeFee(holidayOvertimeFee);
		employeeSalary.setAttendanceCoefficient(attendanceCoefficient);
		employeeSalary.setHolidayFee(0L);
		employeeSalary.setDiligenceFee(0L);
		employeeSalary.setInsuranceSalary(insuranceSalary);
		employeeSalary.setUnionFee(0L);
		employeeSalary.setBirthdayFee(0L);
		employeeSalary.setOtherSupportFee(0L);
		employeeSalary.setPenaltyFee(0L);
		employeeSalary.setTaxPayable(0L);
		employeeSalary.setTaxableIncome(0L);
		employeeSalary.setAssessableIncome(0L);
		employeeSalary.setOtherMinusFee(0L);
		employeeSalary.setTotalSalary(0L);
		employeeSalary.setTotalPersonalInsuranceFee(0L);
		employeeSalary.setTotalCompanyInsuranceFee(0L);
		employeeSalary.setActualSalary(0L);
		employeeSalary.setPersonalDeduction(personalDeduction);
		employeeSalary.setFamilyCircumstanceDeduction(familyCircumstanceDeduction);
		employeeSalary.setHolidayLeave(0F);
		employeeSalary.setAbsentWithoutLeave(0F);
		employeeSalary.setLeaveYear(0F);
		employeeSalary.setNormalAttendance(0F);
		employeeSalary.setNormalOvertimeAttendance(0F); 
		employeeSalary.setWeekendAttendance(0F);
		employeeSalary.setHolidayAttendance(0F);
		employeeSalary.setActualAttendance(0F);
		employeeSalary.setAbsentWithoutSalary(0F);
		employeeSalary.setCompensatoryLeave(0F);
		employeeSalary.setResponsibilityAllowance(responsibilityAllowance);
		employeeSalary.setPaymentStatus(PaymentStatus.CHUA_DUYET_THANH_TOAN);
		employeeSalary.setNote(null);
//		Check Absent Calculate LeaveDay and set attendance if leaveDay greaterThan 0
//		  {
//			CalcAbsentDay("ADD_NEW",employeeAttendance,employeeSalary);
//	
			reloadEmployeeAttendanceSalary(employeeAttendance, employeeSalary);
		
		EmployeeSalary result = employeeSalaryRepository.save(employeeSalary);
		return result;

	}

	public void reloadEmployeeAttendanceSalary(EmployeeAttendance employeeAttendance, EmployeeSalary employeeSalary) {
		Long userId = employeeAttendance.getUserId();
		Date firstDayOfMonth = timeService.getFirstDayOfMonth(employeeAttendance.getDateToWork());
		Date lastDayOfMonth = timeService.getLastDayOfMonth(employeeAttendance.getDateToWork());
		List<SumEmployeeAttendanceDto> sumEmployeeAttendance = employeeAttendanceRepository
				.sumEmployeeAttendance(userId, firstDayOfMonth, lastDayOfMonth);
		
		List<EmployeeAttendance> listEmployeeAttendance = employeeAttendanceRepository.findByUserIdAndDateToWorkBetween(userId, firstDayOfMonth, lastDayOfMonth);
		
		float totalAbsentValid = 0F;
		for( EmployeeAttendance emp  : listEmployeeAttendance) {
			if(emp.getAttendanceType().equals(AttendanceType.PN)) {
				totalAbsentValid += 1F;
			}
			if(emp.getAttendanceType().equals(AttendanceType.PN2)) {
				totalAbsentValid += 0.5F;
			}
			if(emp.getAttendanceType().equals(AttendanceType.NB)) {
				totalAbsentValid += 1;
			}
			if(emp.getAttendanceType().equals(AttendanceType.NB2)) {
				totalAbsentValid += 0.5F;
			}
			if(emp.getAttendanceType().equals(AttendanceType.NL)) {
				totalAbsentValid += 1;
			}
			if(emp.getAttendanceType().equals(AttendanceType.NL2)) {
				totalAbsentValid += 0.5F;
			}
		}
		
		Float normalAttendance = 0F;
		Float normalOvertimeAttendance  = 0F;
		Float weekendAttendance = 0F;
		Float holidayAttendance = 0F;
		Float totalAttendance = 0F;
		if(sumEmployeeAttendance.get(0).getTotalNormalAttendance() != null
			&& 	sumEmployeeAttendance.get(0).getTotalNormalOvertimeAttendance() != null
			&& sumEmployeeAttendance.get(0).getTotalSatOvertimeAttendance() !=null
			&& sumEmployeeAttendance.get(0).getTotalSunOvertimeAttendance() !=null
			&& sumEmployeeAttendance.get(0).getTotalHolidayOvertimeAttendance() !=null
				) {
		normalAttendance = (float) (sumEmployeeAttendance.get(0).getTotalNormalAttendance() *1f);
		normalOvertimeAttendance = (float) (sumEmployeeAttendance.get(0).getTotalNormalOvertimeAttendance() *1);
		weekendAttendance = (float) ((sumEmployeeAttendance.get(0).getTotalSatOvertimeAttendance()
				+ sumEmployeeAttendance.get(0).getTotalSunOvertimeAttendance()));
		holidayAttendance = (float) (sumEmployeeAttendance.get(0).getTotalHolidayOvertimeAttendance() * 1);
		
		totalAttendance = (float) (normalAttendance + totalAbsentValid);
		}
		employeeSalary.setNormalAttendance(normalAttendance);
		employeeSalary.setNormalOvertimeAttendance(normalOvertimeAttendance);
		employeeSalary.setWeekendAttendance(weekendAttendance);
		employeeSalary.setHolidayAttendance(holidayAttendance);
		employeeSalary.setActualAttendance(totalAttendance);
		reCalculateTotalPrices(employeeSalary);
		employeeSalaryRepository.save(employeeSalary);
	}
	
//	That is function to update or add new department to get attendance coefficient for group employeeSalary
	public void updateAttendanceCoefficient (Department department,Integer month,Integer year) {
		
		List<EmployeeSalary> listFindByUserDepartmentIdAndMonthAndYear =  employeeSalaryRepository.findByUserDepartmentIdAndMonthAndYear(department.getId(),month,year);
		 
		 for(EmployeeSalary employeeSalary :listFindByUserDepartmentIdAndMonthAndYear ) {
			 employeeSalary.setAttendanceCoefficient(department.getAttendanceCoefficient());
			 reCalculateTotalPrices(employeeSalary);
		 }
	}
	
	public void reCalculateTotalPrices(EmployeeSalary employeeSalary) {
		Long totalSupportFee = 0l;
		Long totalSalary = 0l;
		Long totalPersonalInsuranceFee = 0l;
		Long totalCompanyInsuranceFee = 0l;
		Long actualsalary = 0L;
		Long insuranceSalary = 0L;
//		Long extraFee = 0L;
//		Long otherMinus = 0L;
		Long totalTaxableIncome = 0L;
		Long totalAssessableIncome = 0L;
		Long totalTaxPayable = 0L;
		Long totalNormalOvertimeSalary = 0L;
		Long totalWeekendSalary=0L;
		Long totalHolidaySalary = 0L;
		Float attendanceCoefficient = 0F;
		if(employeeSalary.getAttendanceCoefficient() != null) {
			attendanceCoefficient = employeeSalary.getAttendanceCoefficient();
		}
		
		totalSupportFee = (employeeSalary.getLunchFee() + employeeSalary.getPhoneFee() + employeeSalary.getPetrolFee()
				+ employeeSalary.getDistanceSupportFee());
		totalNormalOvertimeSalary = Math.round(employeeSalary.getNormalOvertimeFee() *employeeSalary.getNormalOvertimeAttendance()*1.0);
		totalWeekendSalary = Math.round(employeeSalary.getWeekendOvertimeFee()*employeeSalary.getWeekendAttendance()*1.0);
		totalHolidaySalary =Math.round(employeeSalary.getHolidayOvertimeFee()* employeeSalary.getHolidayAttendance()* 1.0);
		
//		If value divide 0 system error
		if(attendanceCoefficient> 0) {
			totalSalary = Math.round(( employeeSalary.getSalaryPerMonth()
					+ employeeSalary.getResponsibilityAllowance()
					+ totalSupportFee)* 
					(employeeSalary.getActualAttendance()/ (attendanceCoefficient)))    
					+totalNormalOvertimeSalary+totalWeekendSalary+totalHolidaySalary;
		}
		insuranceSalary = employeeSalary.getSalaryPerMonth() + employeeSalary.getResponsibilityAllowance();
		employeeSalary.setInsuranceSalary(insuranceSalary);
		// TODO CHECK department to calculate TOTAL SALARY
		employeeSalary.setTotalSalary(totalSalary);
		totalPersonalInsuranceFee = Math.round(insuranceSalary * 0.105);
		totalCompanyInsuranceFee = Math.round(insuranceSalary * 0.215);
		// in 2019 -2020 taxableIncome = totalSalary - LunchFee		
		totalTaxableIncome = totalSalary - employeeSalary.getLunchFee();
//		OLD totalTaxableIncome = totalSalary - employeeSalary.getLunchFee() - employeeSalary.getPhoneFee();
		if(totalTaxableIncome >=0) {
			employeeSalary.setTaxableIncome(totalTaxableIncome);
		}else if(totalTaxableIncome < 0) {
			employeeSalary.setTaxableIncome(0L);
		}
		
		employeeSalary.setTotalPersonalInsuranceFee(totalPersonalInsuranceFee);
		employeeSalary.setTotalCompanyInsuranceFee(totalCompanyInsuranceFee);
//		employeeSalary.setUnionFee(Math.round(employeeSalary.getInsuranceSalary() * 0.01));
//		employeeSalary.setBirthdayFee(employeeSalary.getBirthdayFee());
		employeeSalary.setDistanceSupportFee(employeeSalary.getDistanceSupportFee());
		employeeSalary.setOtherSupportFee(employeeSalary.getOtherSupportFee());
		employeeSalary.setPersonalDeduction(employeeSalary.getPersonalDeduction());
		employeeSalary.setFamilyCircumstanceDeduction(employeeSalary.getFamilyCircumstanceDeduction());
		totalAssessableIncome= totalTaxableIncome -
				totalPersonalInsuranceFee - 
				employeeSalary.getPersonalDeduction() - employeeSalary.getFamilyCircumstanceDeduction();
//		extraFee = employeeSalary.getBirthdayFee() + employeeSalary.getDistanceSupportFee()
//				+ employeeSalary.getOtherSupportFee();

//		employeeSalary.setPenaltyFee(employeeSalary.getPenaltyFee());
//		employeeSalary.setOtherMinusFee(employeeSalary.getOtherMinusFee());

//		otherMinus = employeeSalary.getPenaltyFee() + employeeSalary.getOtherMinusFee();

		
		if(totalAssessableIncome>=0) {
			employeeSalary.setAssessableIncome(totalAssessableIncome);
		}else if(totalAssessableIncome<0) {
			employeeSalary.setAssessableIncome(0L);
		}
		totalTaxPayable = Math.round(totalAssessableIncome*0.05);
		if(totalTaxPayable>= 0) {
			employeeSalary.setTaxPayable(totalTaxPayable);
		}else if(totalTaxPayable <0) {
			employeeSalary.setTaxPayable(0L);
		}
		
		actualsalary = totalSalary - employeeSalary.getTotalPersonalInsuranceFee() - employeeSalary.getTaxPayable();
		if(actualsalary>=0) {
			employeeSalary.setActualSalary(actualsalary);
		}else if(actualsalary<0) {
			employeeSalary.setActualSalary(0L);
		}
		

		return;
	}
	
	
	public void loadUserSalaryConfig(EmployeeSalaryDto employeeSalaryDto) {
		User user = userRepository.findById(employeeSalaryDto.getUserId()).get();
		EmployeeSalary employeeSalary = employeeSalaryRepository.findById(employeeSalaryDto.getId()).get();
		Long salaryPerMonth = 0L;
		Long normalOvertimeFee = 0L;
		Long weekendOvertimeFee = 0L;
		Long holidayOvertimeFee = 0L;
		Long insuranceSalary = 0L;
		Long personalDeduction = 0L;
		Long familyCircumstanceDeduction = 0L;
		Long responsibilityAllowance = 0L;
		Long  lunchFee = 0L;
		Long  petrolFee =0L;
		Long  phoneFee=0L;
		Long  distanceSupportFee=0L; 
		Float attendanceCoefficient = 0F;
//			End money from user
		if (user.getSalaryLevel() != null) {
			salaryPerMonth = user.getSalaryLevel();
		}
		
		
		if (user.getLunchFee() != null) {
			lunchFee = user.getLunchFee();
		}
		if (user.getPetrolFee() != null) {
			petrolFee = user.getPetrolFee();
		}
		if (user.getPhoneFee() != null) {
			phoneFee = user.getPhoneFee();
		}
		if (user.getDistanceSupportFee() != null) {
			distanceSupportFee = user.getDistanceSupportFee();
		}
		if (user.getNormalOvertimeFee() != null) {
			normalOvertimeFee = user.getNormalOvertimeFee();
		}

		if (user.getWeekendOvertimeFee() != null) {
			weekendOvertimeFee = user.getWeekendOvertimeFee();
		}

		if (user.getHolidayOvertimeFee() != null) {
			holidayOvertimeFee = user.getHolidayOvertimeFee();
		}

		if (user.getInsuranceSalary() != null) {
			insuranceSalary = user.getInsuranceSalary();
		}
		if(user.getDepartment() != null && user.getDepartment().getAttendanceCoefficient() != null) {
			attendanceCoefficient = user.getDepartment().getAttendanceCoefficient();
		}

		if (user.getPersonalDeduction() != null) {
			personalDeduction = user.getPersonalDeduction();
		}
		if (user.getFamilyCircumstanceDeduction() != null) {
			familyCircumstanceDeduction = user.getFamilyCircumstanceDeduction();
		}
		if (user.getResponsibilityAllowance() != null) {
			responsibilityAllowance = user.getResponsibilityAllowance();
		}
		employeeSalary.setSalaryPerMonth(salaryPerMonth);
		employeeSalary.setLunchFee(lunchFee);
		employeeSalary.setPetrolFee(petrolFee);
		employeeSalary.setPhoneFee(phoneFee);
		employeeSalary.setDistanceSupportFee(distanceSupportFee);
		employeeSalary.setNormalOvertimeFee(normalOvertimeFee);
		employeeSalary.setWeekendOvertimeFee(weekendOvertimeFee);
		employeeSalary.setHolidayOvertimeFee(holidayOvertimeFee);
		employeeSalary.setAttendanceCoefficient(attendanceCoefficient);
		employeeSalary.setInsuranceSalary(insuranceSalary);
		employeeSalary.setPersonalDeduction(personalDeduction);
		employeeSalary.setFamilyCircumstanceDeduction(familyCircumstanceDeduction);
		employeeSalary.setResponsibilityAllowance(responsibilityAllowance);
		EmployeeSalary updatedEmployeeSalary= employeeSalaryRepository.save(employeeSalary);
		reCalculateTotalPrices(updatedEmployeeSalary);
	}

}
