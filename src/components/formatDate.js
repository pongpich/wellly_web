import React, { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { th, enUS } from "date-fns/locale"; // Import the Thai locale
const formattedDate = (start_date, end_date) => {
  try {
    const startDate = parse(start_date, "dd-MM-yyyy", new Date());
    const endDate = parse(end_date, "dd-MM-yyyy", new Date());

    const formattedStartDate = format(startDate, "d MMM", {
      locale: th,
    });
    const formattedEndDate = format(endDate, "d MMM yyyy", {
      locale: th,
    });

    const thaiYearStart = startDate.getFullYear() + 543; // เพิ่ม 543 เพื่อแปลงเป็น พ.ศ.
    const thaiYearEnd = endDate.getFullYear() + 543; // เพิ่ม 543 เพื่อแปลงเป็น พ.ศ.

    const formattedStartDateWithThaiYear = `${formattedStartDate} ${thaiYearStart}`;
    const formattedStartDateWithThaiNoYear = `${formattedStartDate}`;
    const formattedEndDateWithThaiYear = `${formattedEndDate} ${thaiYearEnd}`;
    const isSameThaiYear =
      thaiYearStart == thaiYearEnd
        ? formattedStartDateWithThaiNoYear
        : formattedStartDateWithThaiYear;

    let date = isSameThaiYear + " - " + formattedEndDateWithThaiYear;
    return date;
  } catch (error) {
    return "Invalid Date Range";
  }
};

export default formattedDate;
