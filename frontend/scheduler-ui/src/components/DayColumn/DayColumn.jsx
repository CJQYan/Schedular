import "./DayColumn.css";
import ShiftCard from "../ShiftCard/ShiftCard";

function DayColumn({ day, onSelect }) {
  return (
    <div className="day">
      <h2
        className="day-title"
        onClick={() => onSelect(day)}
      >
        {day.name}
      </h2>

      <p className="date">{day.date}</p>

      <div className="shift-container">
        {day.shifts.length === 0 ? (
          <p className="empty">No shifts</p>
        ) : (
          day.shifts.map((shift, index) => (
            <ShiftCard
              key={index}
              shift={shift}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DayColumn;