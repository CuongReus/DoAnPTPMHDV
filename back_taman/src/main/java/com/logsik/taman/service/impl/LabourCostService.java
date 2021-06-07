package com.logsik.taman.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.LabourSalary;
import com.logsik.taman.domain.Payment;
import com.logsik.taman.domain.ProjectCost;
import com.logsik.taman.dtos.SumLabourAttendanceDto;
import com.logsik.taman.enums.PaymentStatus;
import com.logsik.taman.repository.LabourAttendanceRepository;
import com.logsik.taman.repository.LabourSalaryRepository;
import com.logsik.taman.repository.PaymentRepository;

@Service
@Transactional
public class LabourCostService {

	@Autowired
	private LabourAttendanceRepository labourAttendanceRepository;
	@Autowired
	private LabourSalaryRepository labourSalaryRepository;

	@Autowired
	private PaymentRepository paymentRepository;
	@Autowired
	private TimeService timeService;

	public ProjectCost getAllPaymentFollowByProjectCost(ProjectCost projectCost, Date dateToWorkStart,
			Date dateToWorkEnd) {
		Integer month = timeService.getMonth(dateToWorkStart);
		Integer year = timeService.getYear(dateToWorkEnd);
		Long salaryPerDay = 0L;
		Long salaryMidnight = 0L;
		Integer lotNumber = 0;
		Long totalPaid = 0L;
		Long sumTotalPaymentPaid = 0L; // that is money paid
		Long sumTotalMoney = 0l; // that is money have to pay
		Long totalNormalSalary;
		Long totalMidNightSalary;
		List<SumLabourAttendanceDto> listSumLabourAttendanceByProjectDetailId = labourAttendanceRepository
				.listSumLabourAttendanceByProjectDetailId(projectCost.getProjectDetailId(), dateToWorkStart,
						dateToWorkEnd);
		if (!listSumLabourAttendanceByProjectDetailId.isEmpty()) {
			for (SumLabourAttendanceDto sumLabourAttendanceDto : listSumLabourAttendanceByProjectDetailId) {
				List<LabourSalary> labourSalaryByLabourAndMonthAndYear = labourSalaryRepository
						.findByLabourIdAndMonthAndYear(sumLabourAttendanceDto.getLabour().getId(), month, year);
				if (labourSalaryByLabourAndMonthAndYear.get(0).getSalaryPerDay() != null) {
					salaryPerDay = labourSalaryByLabourAndMonthAndYear.get(0).getSalaryPerDay();
				}
				if (labourSalaryByLabourAndMonthAndYear.get(0).getSalaryMidnight() != null) {
					salaryMidnight = labourSalaryByLabourAndMonthAndYear.get(0).getSalaryMidnight();
				}

				lotNumber++;
				Payment payment = new Payment();
				Float totalAttendanceLv0 = 0F;
				Float totalAttendanceLv1 = 0F;
				Float totalAttendanceLv2 = 0F;
				payment.setProjectCostId(projectCost.getId());
				payment.setLotNumber(lotNumber);
				payment.setLabourId(sumLabourAttendanceDto.getLabour().getId());
				payment.setCreatedUserId(projectCost.getCreatedUserId());
				payment.setApprovalById(projectCost.getApprovalById());
				payment.setCreatedDate(projectCost.getCreatedDate());
				payment.setLbSalaryMidNight(salaryMidnight);
				payment.setLbSalaryPerDay(salaryPerDay);
//			Calculate Attendance
				totalAttendanceLv0 = (float) (sumLabourAttendanceDto.getTotalAttendanceLv0() / 8.0F);
				totalAttendanceLv1 = (float) (sumLabourAttendanceDto.getTotalAttendanceLv01() / 6.0F);
				totalAttendanceLv2 = (float) (sumLabourAttendanceDto.getTotalAttendanceLv02() / 6.0F);
//			Calculate Salary Follow By Attendance
				totalNormalSalary = (long) ((totalAttendanceLv0 + totalAttendanceLv1) * salaryPerDay);
				totalMidNightSalary = (long) (totalAttendanceLv2 * salaryMidnight);
//			get totalPaid
				totalPaid = totalNormalSalary + totalMidNightSalary;
				payment.setLbNormalAttendance(totalAttendanceLv0);
				payment.setLbOvertimeAttendance(totalAttendanceLv1);
				payment.setLbMidnightAttendance(totalAttendanceLv2);
				payment.setMoneyPaid(totalPaid);

				if ("DA_THANH_TOAN_DU".equals(projectCost.getStatus().toString())) {
					payment.setStatus(PaymentStatus.DA_DUYET_THANH_TOAN);
					payment.setPaymentDate(projectCost.getCloseDate());
				} else {
					payment.setStatus(PaymentStatus.CHUA_DUYET_THANH_TOAN);
				}

				paymentRepository.save(payment);
				sumTotalMoney += totalPaid;
				if ("DA_DUYET_THANH_TOAN".equals(payment.getStatus().toString())) {
					sumTotalPaymentPaid += totalPaid;
				}
//		
			}
		}
		projectCost.setTotalMoney(sumTotalMoney);
		projectCost.setTotalPaid(sumTotalPaymentPaid);
		return projectCost;
	}
//	public ProjectCost updateAllPaymentFollowByProjectCost(List<Payment> listLabourPaymentByProjectCostId) {
//		
//		
//	}

	public void deleteAllPaymentByProjectCost(List<Payment> currentLabourPaymentByProjectCostId) {
		for (Payment payment : currentLabourPaymentByProjectCostId) {
			paymentRepository.deleteById(payment.getId());
		}
	}

	public ProjectCost updateAllPaymentFollowByProjectCost(ProjectCost projectCost, Date dateToWorkStart,
			Date dateToWorkEnd) {
//		NOTE: That list use to check contains attendance between start work date and end work date of projectCost
		List<Long> listLabourId = new ArrayList<>();
		List<SumLabourAttendanceDto> listSumLabourAttendanceByProjectDetailId = labourAttendanceRepository
				.listSumLabourAttendanceByProjectDetailId(projectCost.getProjectDetailId(), dateToWorkStart,
						dateToWorkEnd);
		List<Payment> currentLabourPaymentByProjectCostId = paymentRepository.findByProjectCostId(projectCost.getId());
		if (listSumLabourAttendanceByProjectDetailId.isEmpty()) {
			deleteAllPaymentByProjectCost(currentLabourPaymentByProjectCostId);
			projectCost.setTotalMoney(0L);
			projectCost.setTotalPaid(0L);
//		NOTE:Check if new listLabour(labour attendance) is not contains currentLabourPaymentByProjectCost, delete it.
		} else if (!listSumLabourAttendanceByProjectDetailId.isEmpty()) {
			for (SumLabourAttendanceDto sumLabourAttendanceDto : listSumLabourAttendanceByProjectDetailId) {
				listLabourId.add(sumLabourAttendanceDto.getLabour().getId());
			}
			for (Payment payment : currentLabourPaymentByProjectCostId) {
				if (!listLabourId.contains(payment.getLabourId())) {
					paymentRepository.deleteById(payment.getId());
				}

			}
//			method updatePayment by send listSumAttendance and projectCost
			updatePayment(listSumLabourAttendanceByProjectDetailId, projectCost);

		}

		return projectCost;
	}

	public void updatePayment(List<SumLabourAttendanceDto> listSumLabourAttendanceByProjectDetailId,
			ProjectCost projectCost) {

		List<Payment> listPaymentSendToSetLot = new ArrayList<>(); // List Payment send to updateLotNumber
		List<Integer> listLotNumber = new ArrayList<>(); // ListLotNumber of exist payment
		Long sumTotalPaymentPaid = 0L; // that is money paid
		Long sumTotalMoney = 0l; // that is money have to pay
		for (SumLabourAttendanceDto sumLabourAttendanceByProjectDetailId : listSumLabourAttendanceByProjectDetailId) {
			Payment payment = new Payment();
			Payment paymentFindByLabourAndProjectCost = paymentRepository.findByLabourIdAndProjectCostId(
					sumLabourAttendanceByProjectDetailId.getLabour().getId(), projectCost.getId());
			if (paymentFindByLabourAndProjectCost != null) {
				payment = paymentFindByLabourAndProjectCost;
				listLotNumber.add(payment.getLotNumber());
			}
			Long salaryPerDay = 0L;
			Long salaryMidnight = 0L;
			Long totalPaid = 0L;
			Long totalNormalSalary;
			Long totalMidNightSalary;
			Float totalAttendanceLv0 = 0F;
			Float totalAttendanceLv1 = 0F;
			Float totalAttendanceLv2 = 0F;
			List<LabourSalary> labourSalaryByLabourAndMonthAndYear = labourSalaryRepository
					.findByLabourIdAndMonthAndYear(sumLabourAttendanceByProjectDetailId.getLabour().getId(),
							projectCost.getMonth(), projectCost.getYear());
			if (labourSalaryByLabourAndMonthAndYear.size() > 0) {
				if (labourSalaryByLabourAndMonthAndYear.get(0).getSalaryPerDay() != null) {
					salaryPerDay = labourSalaryByLabourAndMonthAndYear.get(0).getSalaryPerDay();
				}
				if (labourSalaryByLabourAndMonthAndYear.get(0).getSalaryMidnight() != null) {
					salaryMidnight = labourSalaryByLabourAndMonthAndYear.get(0).getSalaryMidnight();
				}
			}
//		Calculate Attendance
			totalAttendanceLv0 = (float) (sumLabourAttendanceByProjectDetailId.getTotalAttendanceLv0() / 8.0F);
			totalAttendanceLv1 = (float) (sumLabourAttendanceByProjectDetailId.getTotalAttendanceLv01() / 6.0F);
			totalAttendanceLv2 = (float) (sumLabourAttendanceByProjectDetailId.getTotalAttendanceLv02() / 6.0F);
//		Calculate Salary Follow By Attendance
			totalNormalSalary = (long) ((totalAttendanceLv0 + totalAttendanceLv1) * salaryPerDay);
			totalMidNightSalary = (long) (totalAttendanceLv2 * salaryMidnight);
//		get totalPaid
			totalPaid = totalNormalSalary + totalMidNightSalary;
			payment.setLbSalaryMidNight(salaryMidnight);
			payment.setLbSalaryPerDay(salaryPerDay);
			payment.setLbNormalAttendance(totalAttendanceLv0);
			payment.setLbOvertimeAttendance(totalAttendanceLv1);
			payment.setLbMidnightAttendance(totalAttendanceLv2);
			payment.setMoneyPaid(totalPaid);
			if (paymentFindByLabourAndProjectCost == null) {
				payment.setProjectCostId(projectCost.getId());
				payment.setLabourId(sumLabourAttendanceByProjectDetailId.getLabour().getId());
				payment.setCreatedUserId(projectCost.getCreatedUserId());
				payment.setApprovalById(projectCost.getApprovalById());
				payment.setCreatedDate(projectCost.getCreatedDate());
				payment.setPaymentDate(projectCost.getCloseDate());

			}
			if ("DA_THANH_TOAN_DU".equals(projectCost.getStatus().toString())) {
				payment.setStatus(PaymentStatus.DA_DUYET_THANH_TOAN);
			} else {
				payment.setStatus(PaymentStatus.CHUA_DUYET_THANH_TOAN);
			}

			listPaymentSendToSetLot.add(payment);
			sumTotalMoney += totalPaid;

		}
		generateLotNumber(listPaymentSendToSetLot, listLotNumber);
		if ("DA_THANH_TOAN_DU".equals(projectCost.getStatus().toString())) {
			sumTotalPaymentPaid = sumTotalMoney;
		}
		projectCost.setTotalMoney(sumTotalMoney);
		projectCost.setTotalPaid(sumTotalPaymentPaid);

	}

	public void generateLotNumber(List<Payment> listPaymentSendToSetLot, List<Integer> listLotNumber) {
		Integer lotNumber = 0;
		if (!listLotNumber.isEmpty()) {
			lotNumber = listLotNumber.get((listLotNumber.size() - 1));
		}

		for (Payment payment : listPaymentSendToSetLot) {
			if (payment.getId() != null) {
				payment.setLotNumber(payment.getLotNumber());
				paymentRepository.save(payment);
			} else if (payment.getId() == null) {
				lotNumber++;
				payment.setLotNumber(lotNumber);
				paymentRepository.save(payment);
			}

		}
	}
}
