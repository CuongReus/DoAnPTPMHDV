package com.logsik.taman.dtos;

import java.io.Serializable;

public class SumOvertimeAttendanceDto  implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long totalOvertime;
	
	public SumOvertimeAttendanceDto(Long totalOvertime) {
		super();
		this.totalOvertime = totalOvertime;
	}

	public Long getTotalOvertime() {
		return totalOvertime;
	}
	
	public void setTotalOvertime(Long totalOvertime) {
		this.totalOvertime = totalOvertime;
	}
	
}
