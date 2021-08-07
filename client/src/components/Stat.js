import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import NumericInput from "react-numeric-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Label,
  Area,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
} from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle'>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
      >{`OZ ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        // fill='#999'
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export default function Stat() {
  const [meals, setMeals] = useState([]);
  const [mealsum, setMealsum] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState("Rice");
  const [oz, setOz] = useState(1);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const fetchSumMeals = async () => {
    const res = await axios
      // .get("http://localhost:3001/api/summeals")
      .get(
        "http://ricy-env.eba-mgkejafd.ap-southeast-1.elasticbeanstalk.com/api/summeals"
      )
      .then((res) => {
        let mealData = res.data.meals;
        mealData = mealData.map(function (obj) {
          return { name: obj.meal_name, value: parseInt(obj.value) };
        });
        setMealsum(mealData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSumMeals();
  }, []);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const fetchMeals = async () => {
    // const res = await axios.get("http://localhost:3001/api/meals");
    const res = await axios.get(
      "http://ricy-env.eba-mgkejafd.ap-southeast-1.elasticbeanstalk.com/api/meals"
    );
    setMeals(res.data.meals);
    setMax(res.data.max);
    setMin(res.data.min);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const [daily, setDaily] = useState([]);

  useEffect(() => {
    handleSubmitFilter();
  }, []);

  const [value, setTime] = useState(moment());

  const handleValueChange = (value) => {
    console.log("onchange value", value && value.format("HH:mm"));
    setTime(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/meals", {
        name: selectedMeal,
        oz: oz,
        eat_at: value.format("YYYY-MM-DD HH:mm"),
      });
      console.log(response);
      handleSubmitFilter();
      fetchMeals();
      fetchSumMeals();

      return response.data.data.restaurant;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitFilter = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/filter?startDate='${startDate.toLocaleDateString()}'&endDate='${endDate.toLocaleDateString()}'`
      );
      console.log(res);
      setDaily(res.data.meals);

      return res.data.meals;
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/meals/${id}`
      );
      console.log(response);
      handleSubmitFilter();
      fetchMeals();
      fetchSumMeals();
      return response.data.data.restaurant;
    } catch (err) {
      console.log(err);
    }
  };

  const numbericFormatInput = (num) => {
    return num + " ออน";
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <div className='mb-8 text-xs bg-white rounded-lg shadow-lg '>
        <ResponsiveContainer width='99%' height={300}>
          <AreaChart
            data={meals}
            margin={{ top: 30, right: 0, left: 20, bottom: 30 }}
          >
            <CartesianGrid opacity={0.5} vertical={false} />
            <defs>
              <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#2451B7' stopOpacity={0.4} />
                <stop offset='75%' stopColor='#2451B7' stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <Area
              type='monotone'
              dataKey='oz'
              stroke='#2451B7'
              fill='url(#color)'
            />

            <XAxis dataKey='date' allowDataOverflow>
              <Label
                value={"ปริมานการบริโภครวมในแต่ละวันของอาหารทุกประเภท"}
                position='bottom'
                style={{ textAnchor: "middle" }}
              />
            </XAxis>

            <YAxis domain={[min - 10, max]} allowDataOverflow>
              <Label
                value={"ปริมานออน"}
                position='left'
                angle={-90}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className='grid gap-2 md:grid-cols-2'>
        <div className='bg-white rounded-lg shadow-lg dark:bg-gray-800 '>
          <div class='px-4 py-4  sm:px-6'>
            <h3 class='text-lg leading-6 font-extrabold text-gray-900'>
              การบริโภคทั้งหมดสะสม
            </h3>
          </div>
          <div>
            <ResponsiveContainer width='99%' height={300}>
              <PieChart>
                <defs>
                  <linearGradient id='color2'>
                    <stop offset='10%' stopColor='#2451B7' stopOpacity={0.4} />
                    <stop offset='80%' stopColor='#2451B7' stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <Pie
                  stroke='#2451B7'
                  fill='url(#color2)'
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={mealsum}
                  // cx={200}
                  // cy={200}
                  innerRadius='40%'
                  outerRadius='60%'
                  paddingAngle={5}
                  dataKey='value'
                  onMouseEnter={onPieEnter}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div class='bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg'>
            <div class='px-4 py-5 sm:px-6'>
              <h3 class='text-lg leading-6  text-gray-900 font-extrabold'>
                จัดกลุ่มโดยหมวดอาหารเรียงจากน้อยไปหามาก
              </h3>
            </div>
            <div class='border-t border-gray-200'>
              <dl>
                {mealsum.map((entry, index) => (
                  <div
                    key={index}
                    className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                      index % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                  >
                    <dt class='text-sm font-medium text-gray-500'>
                      {entry.name}
                    </dt>

                    <dd class='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                      {entry.value} OZ
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div class='container flex flex-col mx-auto w-full'>
          <div class='px-4 py-5 sm:px-6  w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md'>
            <h3 class='text-lg leading-6 font-extrabold text-gray-900'>
              บันทึกข้อมูล
            </h3>
            <div className='flex my-8'>
              <p className='mr-12'>เลือกประเภทอาหาร</p>
              <select
                class='select select-bordered select-warning w-full max-w-xs'
                onChange={(e) => setSelectedMeal(e.target.value)}
                value={selectedMeal}
              >
                <option disabled='disabled' selected='selected'>
                  Choose your meal
                </option>
                <option value='Rice'>Rice</option>
                <option value='Corn'>Corn</option>
                <option value='Avocado'>Avocado</option>
              </select>
              {/* {selectedMeal} */}
            </div>
            <div className='flex my-2'>
              <p className='mr-12'>เวลาที่รับประทาน</p>
              <TimePicker
                value={value}
                onChange={handleValueChange}
                showSecond={false}
              />
              {/* {value.format("YYYY-MM-DD HH:mm")} */}
            </div>

            <div className='flex my-8'>
              <p className='mr-12'>ปริมานที่รับประทาน</p>
              <NumericInput
                mobile={true}
                className='form-control'
                value={oz}
                format={numbericFormatInput}
                onChange={(e) => setOz(e)}
              />
              {/* {oz} */}
            </div>
            <button class='btn w-full' onClick={handleSubmit}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
                />
              </svg>
              <p className='px-4'>บันทึกข้อมูล</p>
            </button>
          </div>
          <div className='grid grid-cols-3 gap-4 p-4 my-8 bg-white rounded-md shadow-lg'>
            <div>
              <p>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                filterDate={(d) => {
                  return new Date() > d;
                }}
              />
              {/* {startDate.toLocaleDateString()} */}
            </div>
            <div>
              <p>End Date</p>
              <div className='w-0.5'>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  filterDate={(d) => {
                    return new Date() > d;
                  }}
                />
                {/* {endDate.toLocaleDateString()} */}
              </div>
            </div>
            <button class='btn ml-8' onClick={handleSubmitFilter}>
              Filter
            </button>
          </div>

          <ul class='flex flex-col'>
            {daily.map((entry, index) => (
              <li class='border-gray-400 flex flex-row mb-2'>
                <div class='transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4'>
                  <div class='flex flex-col w-10 h-10 justify-center items-center mr-4'>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        `/images/${entry.meal_name}.jpg`
                      }
                    />
                  </div>
                  <div class='flex-1 pl-1 md:mr-16'>
                    <div class='font-medium dark:text-white'>
                      {entry.meal_name}
                      <div class='badge badge-accent ml-2'>{entry.oz} ออน</div>
                    </div>
                    <div class='text-gray-600 dark:text-gray-200 text-sm'>
                      {entry.meal_time}
                    </div>
                  </div>
                  <div class='text-gray-600 dark:text-gray-200 text-xs'>
                    {entry.eat_at}
                  </div>
                  <button
                    class='w-24 text-right flex justify-end'
                    onClick={() => handleDelete(entry.id)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      class='h-6 w-6 text-red-600'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
