import { useState, useEffect } from "react";
import "./index.css";
import DayColumn from "./components/DayColumn";

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
  const [selectedDay, setSelectedDay] = useState(null);
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
          employee: "Unassigned"
        }))
      }));

      setWeekData(formattedDays);
    });
}, []);

  return (
    <div className="app">
      <h1>Scheduler Calendar</h1>

      <div className="calendar">
        {weekData.map((day) => (
          <DayColumn key={day.date} day={day} onSelect={setSelectedDay} />
        ))}
      </div>

      {selectedDay && (
        <div className="modal-overlay" onClick={() => setSelectedDay(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedDay(null)}>
              X
            </button>

            <h2>{selectedDay.name}</h2>
            <p>{selectedDay.date}</p>

            {selectedDay.shifts.length === 0 ? (
              <p className="empty">No shifts</p>
            ) : (
              selectedDay.shifts.map((shift, index) => (
                <div key={index} className="shift">
                  <strong>{shift.role}</strong>
                  <br />
                  {shift.start} - {shift.end}
                  <br />
                  <span>{shift.employee}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;