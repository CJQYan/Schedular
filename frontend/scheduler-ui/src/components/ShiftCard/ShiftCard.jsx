import { useState } from "react";
import "./ShiftCard.css";

function ShiftCard({ shift }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editedShift, setEditedShift] = useState({
    role: shift.role,
    start: shift.start,
    end: shift.end,
    employee: shift.employee
  });

  function updateField(field, value) {
    setEditedShift({
      ...editedShift,
      [field]: value
    });
  }

  function saveChanges() {
    console.log("Saved shift:", editedShift);
    setIsEditing(false);
  }

  return (
    <>
      <div className="shift-card" onClick={() => setIsOpen(true)}>
        <strong>{editedShift.role}</strong>
        <div>{editedShift.start} - {editedShift.end}</div>
        <span>{editedShift.employee}</span>
      </div>

      {isOpen && (
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="shift-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsOpen(false)}>
              ×
            </button>

            <h2>Edit Shift</h2>

            <label>Role</label>
            <input
              value={editedShift.role}
              disabled={!isEditing}
              onChange={(e) => updateField("role", e.target.value)}
            />

            <label>Start</label>
            <input
              value={editedShift.start}
              disabled={!isEditing}
              onChange={(e) => updateField("start", e.target.value)}
            />

            <label>End</label>
            <input
              value={editedShift.end}
              disabled={!isEditing}
              onChange={(e) => updateField("end", e.target.value)}
            />

            <label>Employee</label>
            <input
              value={editedShift.employee}
              disabled={!isEditing}
              onChange={(e) => updateField("employee", e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancel" : "Unlock Editing"}
              </button>

              {isEditing && (
                <button className="save-button" onClick={saveChanges}>
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShiftCard;