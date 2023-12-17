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
    let date = formattedStartDate + " - " + formattedEndDate;
    return date;
  } catch (error) {
    return "Invalid Date Range";
  }
};

export default formattedDate;
