package com.logsik.taman.service.impl;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.logsik.taman.dtos.SumLabourSupportAndAwareDto;
import com.logsik.taman.domain.Labour;
import com.logsik.taman.domain.LabourAttendance;
import com.logsik.taman.domain.LabourSalary;
import com.logsik.taman.dtos.SumLabourAttendanceDto;
import com.logsik.taman.dtos.SumLabourSupportAndAwareDto;
import com.logsik.taman.enums.PaymentStatus;
import com.logsik.taman.repository.LabourAttendanceRepository;
import com.logsik.taman.repository.LabourRepository;
import com.logsik.taman.repository.LabourSalaryRepository;

@Service
@Transactional
public class LabourSalaryService {

	@Autowired
	private LabourSalaryRepository labourSalaryRepository;
	
	@Autowired
	private LabourAttendanceRepository labourAttendanceRepository;
	
	@Autowired
	private LabourRepository labourRepository;

	@Autowired
	private TimeService timeService;

	public LabourSalary createNewLabourSalaryFromLabourAttendance(LabourAttendance labourAttendance) {
		LabourSalary labourSalary = new LabourSalary();
		Labour labour = labourRepository.findById(labourAttendance.getLabourId()).get();
		labourSalary.setLabourId(labourAttendance.getLabourId());
		labourSalary.setMonth(timeService.getMonth(labourAttendance.getDateToWork()));
		labourSalary.setYear(timeService.getYear(labourAttendance.getDateToWork()));
		labourSalary.setSalaryPerDay(labour.getSalaryPerDay());
		labourSalary.setSalaryMidnight(labour.getSalaryMidnight());
		// Start Check Level Attendance
		if (labourAttendance.getOvertimeStatus() == null) {
			labourSalary.setAttendanceLv0(labourAttendance.getTotalDatetime());
		} else {
			labourSalary.setAttendanceLv0(0f);
		}
//		Check Attendance LV1

		if (labourAttendance.getOvertimeStatus() != null && "TANG_CA_THUONG_TOI".equals(labourAttendance.getOvertimeStatus().toString())) {
				labourSalary.setAttendanceLv1(labourAttendance.getTotalOvertime());
		}else {
			labourSalary.setAttendanceLv1(0f);
		}
			
		
//		Check Attendance LV2 (that is midnight attendance)
		if (labourAttendance.getOvertimeStatus() != null
				&& "TANG_CA_KHUYA".equals(labourAttendance.getOvertimeStatus().toString())) {
			labourSalary.setAttendanceLv2(labourAttendance.getTotalOvertime());
		} 
		else {
			labourSalary.setAttendanceLv2(0f);
		}
//		Check Attendance LV3
//		if (labourAttendance.getOvertimeStatus() != null
//				&& "TANG_CA_CN_TOI".equals(labourAttendance.getOvertimeStatus().toString())) {
//			labourSalary.setAttendanceLv3(labourAttendance.getTotalOvertime() * 3f);
//		} 
//		else {
			labourSalary.setAttendanceLv3(0f);
//		}

		// End Check Level Attendance
		labourSalary.setTotalAttendanceCalc(labourSalary.getAttendanceLv0() + labourSalary.getAttendanceLv1());
		
		if ("CO".equals(labourAttendance.getSupportFarConstructionStatus().toString())) {
			labourSalary.setNumberOfDistanceDay(1);
		} else {
			labourSalary.setNumberOfDistanceDay(0);
		}
		if ("CO".equals(labourAttendance.getSupportTransportFeeStatus().toString())) {
			labourSalary.setNumberOfTransport(1);
		} else {
			labourSalary.setNumberOfTransport(0);
		}
		if ("CO".equals(labourAttendance.getLateStatus().toString())) {
			labourSalary.setNumberOfLateDay(1);
		} else {
			labourSalary.setNumberOfLateDay(0);
		}

		labourSalary.setTotalMidnightSalary(0l);
		labourSalary.setTotalNormalSalary(0l);
		labourSalary.setTotalSalary(0l);
		labourSalary.setLabourSupportFee(labour.getAdditionSalary());
		labourSalary.setOtherSupportFee(0l);
		labourSalary.setTotalSupportFee(0l);
		labourSalary.setBirthdayFee(0l);
		labourSalary.setHolidayFee(0l);
		labourSalary.setDiligenceFee(0l);
		labourSalary.setOtherExtraFee(0l);
		labourSalary.setTotalExtraFee(0l);
		labourSalary.setUnionFee(0l);
		labourSalary.setTaxFee(0l);
		labourSalary.setSocialInsuranceFee(0l);
		labourSalary.setPenaltyFee(0l);
		labourSalary.setAdvanceFee(0l);
		labourSalary.setTotalMinusFee(0l);
		labourSalary.setActualSalary(0l);
		labourSalary.setNote(null);
		labourSalary.setPaymentStatus(PaymentStatus.CHUA_DUYET_THANH_TOAN);
		reloadLabourAttendanceToLabourSalary(labourAttendance,labourSalary);
		LabourSalary result = labourSalaryRepository.save(labourSalary);
		return result;

	}
	public void reloadLabourAttendanceToLabourSalary(LabourAttendance labourAttendance,LabourSalary labourSalary) {
		Long labourId = labourAttendance.getLabourId();
		Date firstDayOfMonth =  timeService.getFirstDayOfMonth(labourAttendance.getDateToWork());
		Date lastDayOfMonth=  timeService.getLastDayOfMonth(labourAttendance.getDateToWork());
		Float totalAttendanceLv0 = 0F;
		Float totalAttendanceLv1 = 0F;
		Float totalAttendanceLv2 = 0F;
		Integer totalSupportFarConstructionStatus = 0;
		Integer totalSupportTransportFeeStatus = 0;
		Integer totalLateStatus = 0;
		SumLabourAttendanceDto sumAttendance = labourAttendanceRepository.sumAttendance(labourId, firstDayOfMonth, lastDayOfMonth);
		SumLabourSupportAndAwareDto sumLabourSupportAndAwareByLabourId = labourAttendanceRepository.sumLabourSupportAndAwareByLabourId(labourId, firstDayOfMonth, lastDayOfMonth);
		if(sumAttendance != null) {
			totalAttendanceLv0 =  (float) (sumAttendance.getTotalAttendanceLv0()*1);
			totalAttendanceLv1 =  (float) (sumAttendance.getTotalAttendanceLv01()*1);
			totalAttendanceLv2 =  (float) (sumAttendance.getTotalAttendanceLv02()*1);
		}
	
		labourSalary.setAttendanceLv0((float)(totalAttendanceLv0));
		labourSalary.setAttendanceLv1((float)(totalAttendanceLv1));
		labourSalary.setAttendanceLv2((float)(totalAttendanceLv2));
		if(sumLabourSupportAndAwareByLabourId !=null) {
			totalSupportFarConstructionStatus = (int) (sumLabourSupportAndAwareByLabourId.getTotalSupportFarConstructionStatus()*1);
			totalSupportTransportFeeStatus = (int) (sumLabourSupportAndAwareByLabourId.getTotalSupportTransportFeeStatus()*1);
			totalLateStatus = (int) (sumLabourSupportAndAwareByLabourId.getTotalLateStatus()*1);
			
		}
		
	
		labourSalary.setNumberOfDistanceDay(totalSupportFarConstructionStatus);
		labourSalary.setNumberOfTransport(totalSupportTransportFeeStatus);
		labourSalary.setNumberOfLateDay(totalLateStatus);
	
			reCalculateTotalPrices(labourSalary);
			labourSalaryRepository.save(labourSalary);
		}
//	public void addLabourAttendanceToLabourSalary(LabourSalary labourSalary, LabourAttendance labourAttendance) {
//		labourSalary.setAttendanceLv0(labourSalary.getAttendanceLv0() + labourAttendance.getTotalDatetime());
//		if (labourAttendance.getOvertimeStatus() != null) {
////		Check Attendance LV1
//			if ( "TANG_CA_THUONG_TOI".equals(labourAttendance.getOvertimeStatus().toString())) {
//				labourSalary.setAttendanceLv1(
//						labourSalary.getAttendanceLv1() + (labourAttendance.getTotalOvertime()));
//			}
////		Check Attendance LV2 that is midnight attendance
//			if ("TANG_CA_KHUYA".equals(labourAttendance.getOvertimeStatus().toString())) {
//				labourSalary
//						.setAttendanceLv2(labourSalary.getAttendanceLv2() + (labourAttendance.getTotalOvertime()));
//			}
//////		Check Attendance LV3
////			if ("TANG_CA_CN_TOI".equals(labourAttendance.getOvertimeStatus().toString())) {
////				labourSalary
////						.setAttendanceLv3(labourSalary.getAttendanceLv3() + (labourAttendance.getTotalOvertime() * 3f));
////			}
//		}
//		if ("CO".equals(labourAttendance.getSupportFarConstructionStatus().toString())) {
//			labourSalary.setNumberOfDistanceDay(labourSalary.getNumberOfDistanceDay() + 1);
//		}
//		if ("CO".equals(labourAttendance.getSupportTransportFeeStatus().toString())) {
//			labourSalary.setNumberOfTransport(labourSalary.getNumberOfTransport() + 1);
//		}
//		if ("CO".equals(labourAttendance.getLateStatus().toString())) {
//			labourSalary.setNumberOfLateDay(labourSalary.getNumberOfLateDay() + 1);
//		}
//		reCalculateTotalPrices(labourSalary);
//	}

	public void reCalculateTotalPrices(LabourSalary labourSalary) {
//			*BE CAREFUL when calculate Float type, remember use Math.Round to avoid wrong values :
			labourSalary.setTotalAttendanceCalc((float)(labourSalary.getAttendanceLv0()/8.0f) + (labourSalary.getAttendanceLv1()/6.0f));
			labourSalary.setAttendanceLv2(labourSalary.getAttendanceLv2()) ;
			labourSalary.setTotalMidnightSalary(Math.round((labourSalary.getAttendanceLv2()/6.0)*labourSalary.getSalaryMidnight()));
			labourSalary.setTotalNormalSalary(
					(long) Math.round((labourSalary.getTotalAttendanceCalc()) * labourSalary.getSalaryPerDay()));
			labourSalary.setTotalSalary(labourSalary.getTotalMidnightSalary() + labourSalary.getTotalNormalSalary());
			labourSalary.setTotalSupportFee(((labourSalary.getNumberOfDistanceDay() + labourSalary.getNumberOfTransport())
					* labourSalary.getLabourSupportFee()) + labourSalary.getOtherSupportFee());
			labourSalary.setTotalExtraFee(labourSalary.getBirthdayFee() + labourSalary.getHolidayFee()
					+ labourSalary.getOtherExtraFee() + labourSalary.getDiligenceFee());
			labourSalary.setTotalMinusFee(labourSalary.getUnionFee() + labourSalary.getTaxFee()
					+ labourSalary.getSocialInsuranceFee() + labourSalary.getPenaltyFee() + labourSalary.getAdvanceFee());
			labourSalary.setActualSalary(
					(labourSalary.getTotalSalary()+ labourSalary.getTotalSupportFee() + labourSalary.getTotalExtraFee())
							- labourSalary.getTotalMinusFee());
		
		
	}

//	public void updateLabourAttendanceOnLabourSalary(LabourSalary labourSalary, LabourAttendance oldLabourAttendance,
//			LabourAttendance newLabourAttendance) {
////		*BE CAREFUL when calculate Float type, remember use Math.Round to avoid wrong values :
//		labourSalary.setAttendanceLv0(
//				labourSalary.getAttendanceLv0() - oldLabourAttendance.getTotalDatetime()
//				+ newLabourAttendance.getTotalDatetime()) ;
//
//		if (oldLabourAttendance.getOvertimeStatus() != null) {
//			if ( "TANG_CA_THUONG_TOI".equals(newLabourAttendance.getOvertimeStatus().toString())) {
//				labourSalary.setAttendanceLv1((labourSalary.getAttendanceLv1() - (oldLabourAttendance.getTotalOvertime()))
//								+ (newLabourAttendance.getTotalOvertime())) ;
//			}
////		Check Attendance LV2 that is midnight attendance
//			if ("TANG_CA_KHUYA".equals(newLabourAttendance.getOvertimeStatus().toString())) {
//				labourSalary.setAttendanceLv2(
//						(labourSalary.getAttendanceLv2() - (oldLabourAttendance.getTotalOvertime())
//								+ (newLabourAttendance.getTotalOvertime())));
//			}
//////		Check Attendance LV3
////			if ("TANG_CA_CN_TOI".equals(newLabourAttendance.getOvertimeStatus().toString())) {
////				labourSalary.setAttendanceLv3(
////						(labourSalary.getAttendanceLv3() - (oldLabourAttendance.getTotalOvertime() * 3f))
////								+ (newLabourAttendance.getTotalOvertime() * 3f));
////			}
//		}
//
//		if ("CO".equals(newLabourAttendance.getSupportFarConstructionStatus().toString())
//				&& "KHONG".equals(oldLabourAttendance.getSupportFarConstructionStatus().toString())) {
//			labourSalary.setNumberOfDistanceDay(labourSalary.getNumberOfDistanceDay() + 1);
//		} else if ("KHONG".equals(newLabourAttendance.getSupportFarConstructionStatus().toString())
//				&& "CO".equals(oldLabourAttendance.getSupportFarConstructionStatus().toString())) {
//			labourSalary.setNumberOfDistanceDay(labourSalary.getNumberOfDistanceDay() - 1);
//		}
//		if ("CO".equals(newLabourAttendance.getSupportTransportFeeStatus().toString())
//				&& "KHONG".equals(oldLabourAttendance.getSupportTransportFeeStatus().toString())) {
//			labourSalary.setNumberOfTransport(labourSalary.getNumberOfTransport() + 1);
//		} else if ("KHONG".equals(newLabourAttendance.getSupportTransportFeeStatus().toString())
//				&& "CO".equals(oldLabourAttendance.getSupportTransportFeeStatus().toString())) {
//			labourSalary.setNumberOfTransport(labourSalary.getNumberOfTransport() - 1);
//		}
//		if ("CO".equals(newLabourAttendance.getLateStatus().toString())
//				&& "KHONG".equals(oldLabourAttendance.getLateStatus().toString())) {
//			labourSalary.setNumberOfLateDay(labourSalary.getNumberOfLateDay() + 1);
//		} else if ("KHONG".equals(newLabourAttendance.getLateStatus().toString())
//				&& "CO".equals(oldLabourAttendance.getLateStatus().toString())) {
//			labourSalary.setNumberOfLateDay(labourSalary.getNumberOfLateDay() - 1);
//		}
//		reCalculateTotalPrices(labourSalary);
//		labourSalaryRepository.save(labourSalary);
//	}

	public void removeLabourAttendanceOnLabourSalary(LabourSalary labourSalary, LabourAttendance source) {

		labourSalary.setAttendanceLv0(labourSalary.getAttendanceLv0() - source.getTotalDatetime());
		if (source.getOvertimeStatus() != null) {
		if ("TANG_CA_THUONG_TOI".equals(source.getOvertimeStatus().toString())) {
			labourSalary.setAttendanceLv1(labourSalary.getAttendanceLv1() - (source.getTotalOvertime()));
		}
//		Check Attendance LV2 that is midnight attendance
		if ("TANG_CA_KHUYA".equals(source.getOvertimeStatus().toString())) {
			labourSalary.setAttendanceLv2((labourSalary.getAttendanceLv2() - (source.getTotalOvertime())));
		}
////		Check Attendance LV3
//		if ("TANG_CA_CN_TOI".equals(source.getOvertimeStatus().toString())) {
//			labourSalary.setAttendanceLv3((labourSalary.getAttendanceLv3() - (source.getTotalOvertime() * 3f)));
//		}
		}
		if ("CO".equals(source.getSupportFarConstructionStatus().toString())) {
			labourSalary.setNumberOfDistanceDay(labourSalary.getNumberOfDistanceDay() - 1);
		}
		if ("CO".equals(source.getSupportTransportFeeStatus().toString())) {
			labourSalary.setNumberOfTransport(labourSalary.getNumberOfTransport() - 1);
		}
		if ("CO".equals(source.getLateStatus().toString())) {
			labourSalary.setNumberOfLateDay(labourSalary.getNumberOfLateDay() - 1);
		}
		reCalculateTotalPrices(labourSalary);
		labourSalaryRepository.save(labourSalary);
	}
}
