package com.logsik.taman.service.impl;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.text.ParseException;

import org.springframework.stereotype.Service;

@Service
public class TimeService {
	public Long getTime(Time referenceTime) {
		return referenceTime.getHours() * 3600l + referenceTime.getMinutes() * 60l + referenceTime.getSeconds();
	}

	public Date getLastDayOfMonth(Date referenceDate) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceDate);

		calendar.add(Calendar.MONTH, 1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.add(Calendar.DATE, -1);
		truncateTime(calendar);

		Date lastDayOfMonth = calendar.getTime();

		return lastDayOfMonth;

	}

	public Date getLastDayOfMonth(Integer month, Integer year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.YEAR, year);
		truncateTime(calendar);
		return getLastDayOfMonth(calendar.getTime());
	}
	
	public Date parseDay(Integer day, Integer month, Integer year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, day);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.YEAR, year);
		truncateTime(calendar);
		return calendar.getTime();
	}

	public Date getFirstDayOfMonth(Date referenceDate) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceDate);

		calendar.set(Calendar.DAY_OF_MONTH, 1);
		truncateTime(calendar);

		Date firstDayOfMonth = calendar.getTime();

		return firstDayOfMonth;

	}

	public Date getFirstDayOfMonth(Integer month, Integer year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.YEAR, year);
		truncateTime(calendar);
		return getFirstDayOfMonth(calendar.getTime());
	}

	private void truncateTime(Calendar calendar) {
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
	}

	public Integer getYear(Date referenceYear) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceYear);

		Integer year = calendar.get(Calendar.YEAR);

		return year;

	}

	public Integer getMonth(Date referenceMonth) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceMonth);

		Integer month = calendar.get(Calendar.MONTH) + 1;

		return month;

	}

	public Date addDays(Date currentDate, Integer days) {
		Calendar c = Calendar.getInstance();
		c.setTime(currentDate);
		c.add(Calendar.DATE, days);
		return c.getTime();
	}

	public Date getFirstDayOfYear(Integer year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.MONTH, 0);
		calendar.set(Calendar.YEAR, year);
		return calendar.getTime();
	}

	public Date getLastDayOfYear(Integer year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 31);
		calendar.set(Calendar.MONTH, 11);
		calendar.set(Calendar.YEAR, year);
		return calendar.getTime();

	}

	public List<Date> getDatesBetween(Date startDate, Date endDate) {
		List<Date> datesInRange = new ArrayList<>();
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(startDate);

		Calendar endCalendar = new GregorianCalendar();
		endCalendar.setTime(endDate);
		
		
		
		

		
		
		
//		String strDate = dateFormat.format(date);
		
//		System.out.print(fmt.format(startDate));
		
//		Calendar cal = Calendar.getInstance();
//		cal.add(Calendar.DATE, 1);
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
//		System.out.println(cal.getTime());
		// Output "Wed Sep 26 14:23:28 EST 2012"

		String formattedStartDate = format1.format(calendar.getTime());
		String formattedEndDate = format1.format(endCalendar.getTime());
		// Output "2012-09-26"

		
		while (calendar.before(endCalendar) || formattedStartDate.toString().equals(formattedEndDate.toString()) ) {
			Date result = calendar.getTime();
			datesInRange.add(result);
			calendar.add(Calendar.DATE, 1);
			 formattedStartDate = format1.format(calendar.getTime());
			 formattedEndDate = format1.format(endCalendar.getTime());
			
		}
		return datesInRange;
	}
	
	public Date getStartOfDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DATE);
		calendar.set(year, month, day, 0, 0, 0);
		return calendar.getTime();
	}

	public Date getEndOfDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DATE);
		calendar.set(year, month, day, 23, 59, 59);
		return calendar.getTime();
	}
	
	public boolean isSaturday(Date date) {
	    Calendar c1 = Calendar.getInstance();
	    c1.setTime(date);
	    return c1.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY;
	}
	
	public String getDayOfWeek(Date date) {
		Calendar startDate = Calendar.getInstance();
		startDate.setTime(date);
		String dayOfWeek = "";
		if (startDate.get(Calendar.DAY_OF_WEEK) == Calendar.MONDAY) {
			dayOfWeek =  "MONDAY";
		}
		if (startDate.get(Calendar.DAY_OF_WEEK) == Calendar.TUESDAY) {
			dayOfWeek =  "TUESDAY";
		}
		if (startDate.get(Calendar.DAY_OF_WEEK) == Calendar.WEDNESDAY) {
			dayOfWeek =  "WEDNESDAY";
		}
		if (startDate.get(Calendar.DAY_OF_WEEK) == Calendar.THURSDAY) {
			dayOfWeek =  "THURSDAY";
		}
		if (startDate.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY) {
			dayOfWeek =  "FRIDAYFRIDAY";
		}
		if (startDate.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY) {
			dayOfWeek =  "SATURDAY";
		}
		if (startDate.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
			dayOfWeek =  "SUNDAY";
		}
		
		return dayOfWeek;
	}

	public Date parseStringToDateTime(String dateString) throws ParseException {
		Date date = new SimpleDateFormat("yyyy-MM-dd").parse(dateString);  
		return date;
	}
}
