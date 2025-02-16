import { useMemo, useState } from "react";
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
  return data[split][gender][bmiCategory][difficulty][today];
}
function Excersise({ ex }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white w-full max-w-md">
      <h1 className="text-lg font-bold">{ex.exercise}</h1>
      <p className="text-gray-600">Weight: {ex.weight_kg} kg</p>
      <p className="text-gray-600">Reps: {ex.reps}</p>
    </div>
  );
}

function Excersises({ obj }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {obj && Object.keys(obj).length > 0 ? (
        Object.values(obj).map((ex, index) =>
          obj.a !== "hello" ? <Excersise key={index} ex={ex} /> : null
        )
      ) : (
        <h2 className="text-xl text-gray-500">😴 Rest Day</h2>
      )}
    </div>
  );
}
function App() {
  const [day, setDay] = useState(1);
  const [workoutDays, setWorkoutDays] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  let [obj, setobj] = useState({ a: "hello" });

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
    }

    setobj(getdata(split, gender, difficulty, bmi, today));

    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth()}`;

    setWorkoutDays((prev) => ({
      ...prev,
      [formattedDate]: today === "rest" ? "rest" : "workout",
    }));
  }

  function handleClick() {
    setDay(day + 1);
    setCurrentDate((prevDate) => {
      let newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  }

  return (
    <div className="flex justify-between items-start p-4 h-screen">
      {/* Left Side - Exercise Tabs */}
      <div className="flex flex-nowrap overflow-x-auto space-x-4 w-2/3">
        <Excersises obj={obj} />
      </div>

      {/* Right Side - Calendar */}
      <div className="w-1/3">
        <MyCalendar workoutDays={workoutDays} />
        <div className="mt-4 flex gap-4">
          <button className="start_button" onClick={handlestart}>
            Start Workout!
          </button>
          <button className="start_button" onClick={handleClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
