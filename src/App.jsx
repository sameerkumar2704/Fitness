import { useEffect, useMemo, useState } from "react";
import { Button } from "./components/ui/button";
import data from "./data.json"; // Ensure data.json is correctly placed in the src folder
import clsx from "clsx";
import "./App.css";

function MyCalendar({ workoutDays }) {
  function getCurrentMonthCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let dates = [];
    let week = new Array(7).fill(null);

    let startDayIndex = firstDay.getDay();
    let dayCounter = 1;

    for (let i = 0; i < 7; i++) {
      if (i >= startDayIndex) {
        week[i] = new Date(year, month, dayCounter);
        dayCounter++;
      }
    }
    dates.push(week);

    while (dayCounter <= lastDay.getDate()) {
      week = new Array(7).fill(null);
      for (let i = 0; i < 7 && dayCounter <= lastDay.getDate(); i++) {
        week[i] = new Date(year, month, dayCounter);
        dayCounter++;
      }
      dates.push(week);
    }

    return { month: month + 1, year, weeks: dates };
  }

  const [currentCalendar, setCalendar] = useState(getCurrentMonthCalendar());
  const weeksDay = useMemo(() => ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], []);

  return (
    <div className="m-2">
      <div className="border w-fit p-3 rounded-md shadow-md">
        <div className="flex max-sm:gap-2 gap-3 text-gray-400 font-sans">
          {weeksDay.map((day) => (
            <h1 key={day}>{day}</h1>
          ))}
        </div>
        <div className="w-fit gap-3 max-sm:gap-2 grid grid-cols-7">
          {currentCalendar.weeks.map((currWeek, weekIndex) =>
            currWeek.map((curr, dayIndex) => {
              if (!curr) return <h1 key={`${weekIndex}-${dayIndex}`}></h1>;

              const calenderDate = `${curr.getDate()}-${curr.getMonth()}`;

              return (
                <button
                  key={calenderDate}
                  className={clsx(
                    "border-b-2 px-2 py-1 rounded-md",
                    workoutDays[calenderDate] === "workout" && "border-yellow-400",
                    workoutDays[calenderDate] === "rest" && "border-green-500"
                  )}
                >
                  {curr.getDate()}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function getdata(split, gender, difficulty, bmi, today) {
  let bmiCategory;
  if (bmi >= 18 && bmi <= 24) {
    bmiCategory = "BMI_18-24";
  } else if (bmi >= 25 && bmi <= 29) {
    bmiCategory = "BMI_25-29";
  } else {
    bmiCategory = "BMI_30+";
  }

  if (
    data[split] &&
    data[split][gender] &&
    data[split][gender][bmiCategory] &&
    data[split][gender][bmiCategory][difficulty] &&
    data[split][gender][bmiCategory][difficulty][today]
  ) {
    return data[split][gender][bmiCategory][difficulty][today];
  } else {
    console.warn("No workout data found for the given parameters.");
    return [];
  }
}

function App() {
  const [day, setDay] = useState(1);
  const [workoutDays, setWorkoutDays] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  function handlestart() {
    let split = "push_pull_legs";
    let gender = "male";
    let difficulty = "beginner";
    let bmi = 20;
    let today;

    switch (day % 4) {
      case 1:
        today = "push";
        break;
      case 2:
        today = "pull";
        break;
      case 3:
        today = "legs";
        break;
      case 0:
        today = "rest";
        break;
      default:
        today = "rest";
    }

    let obj = getdata(split, gender, difficulty, bmi, today);
    console.log(obj);

    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth()}`;

    setWorkoutDays((prev) => ({
      ...prev,
      [formattedDate]: today === "rest" ? "rest" : "workout",
    }));
  }

  function handleClick() {
    setDay(day + 1); // Cycle through push, pull, legs, rest
    setCurrentDate((prevDate) => {
      let newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  }

  return (
    <>
      <MyCalendar workoutDays={workoutDays} />
      <button className="start_button" onClick={handlestart}>
        Start Workout!
      </button>
      <button className="start_button" onClick={handleClick}>
        Next
      </button>
    </>
  );
}

export default App;
