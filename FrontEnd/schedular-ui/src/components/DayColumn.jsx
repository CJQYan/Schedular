function DayColumn({ day, onSelect }) {
  return (
    <div className="day" onClick={() => onSelect(day)}>
      <h2>{day.name}</h2>
      <p className="date">{day.date}</p>

      {day.shifts.length === 0 ? (
        <p className="empty">No shifts</p>
      ) : (
        day.shifts.map((shift, index) => (
          <div className="shift" key={index}>
            <strong>{shift.role}</strong>
            <br />
            {shift.start} - {shift.end}
            <br />
            <span>{shift.employee}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default DayColumn;