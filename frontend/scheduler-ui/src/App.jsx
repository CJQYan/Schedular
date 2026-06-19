import { useState, useEffect } from "react";
import "./index.css";
import DayColumn from "./components/DayColumn/DayColumn";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/weeks/20260614")
      .then((response) => response.json())
      .then((data) => {
        const formattedDays = data.days.map((shifts, index) => ({
          name: dayNames[index],
          date: "",
          shifts: shifts.map((shift) => ({
            role: shift.position.title,
            start: shift.startTime,
            end: shift.endTime,
            employee: "Unassigned",
          })),
        }));

        setWeekData(formattedDays);
      });
  }, []);

  return (
    <div className="app">
      <h1>Scheduler Calendar</h1>

      <div className="calendar">
        {weekData.map((day, index) => (
          <DayColumn
            key={index}
            day={day}
            onSelect={() => console.log(day.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;