import React, { useState, useEffect } from "react";

//make years and days array

function Age() {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    function generateArray(start, end) {
      let arr = [];
      for (start; start <= end; start++) {
        arr.push(start);
      }
      return arr;
    }
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    //1-31
    const days = generateArray(1, 31);
    //1900-today
    const years = generateArray(1900, new Date().getFullYear());

    //calculate age
    const calculateAge = (birthday) => {
      //milliseconds in a year 1000*24*60*60*365.24 = 31556736000;
      let today = new Date(),
        //birthay has 'Dec 25 1998'
        dob = new Date(birthday),
        //difference in milliseconds
        diff = today.getTime() - dob.getTime(),
        //convert milliseconds into years
        years = Math.floor(diff / 31556736000),
        //1 day has 86400000 milliseconds
        days_diff = Math.floor((diff % 31556736000) / 86400000),
        //1 month has 30.4167 days
        months = Math.floor(days_diff / 30.4167),
        days = Math.floor(days_diff % 30.4167);

      setYear(years);
      setMonth(months);
      setDay(days);
    };

    calculateAge("Oct 24 2020");
  }, []);

  return (
    <div class='flex justify-center text-grey-700 text-center'>
      <div class='w-20 md:w-24 border border-light-300 bg-light-100 rounded-lg py-3 md:py-4 mx-2'>
        <div class='text-2xl md:text-3xl font-semibold'>
          <span>{year}</span>
        </div>
        <div class='opacity-75 text-xs mt-3 uppercase'>Years</div>
      </div>

      <div class='w-20 md:w-24 border border-light-300 bg-light-100 rounded-lg py-3 md:py-4 mx-2'>
        <div class='text-2xl md:text-3xl font-semibold'>
          <span>{month}</span>
        </div>
        <div class=' opacity-75 text-xs mt-3 uppercase'>Months</div>
      </div>
      <div class='w-20 md:w-24 border border-light-300 bg-light-100 rounded-lg py-3 md:py-4 mx-2'>
        <div class='text-2xl md:text-3xl font-semibold'>
          <span>{day}</span>
        </div>
        <div class=' opacity-75 text-xs mt-3 uppercase'>Days</div>
      </div>
    </div>
  );
}

export default Age;
