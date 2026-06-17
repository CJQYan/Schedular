from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from app.models.week import Week

SCHEDULE_FOLDER = Path(__file__).parent / "schedules"


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Scheduler API is running"}


@app.get("/weeks")
def list_weeks():
    files = SCHEDULE_FOLDER.glob("*.json")

    weeks = [
        file.stem
        for file in files
    ]

    return {
        "weeks": sorted(weeks)
    }


@app.get("/weeks/{week_start_date}")
def get_week(week_start_date: str):
    file_path = SCHEDULE_FOLDER / f"{week_start_date}.json"

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Week schedule not found"
        )

    week = Week.load_from_json(file_path)

    return week.to_dict()

@app.put("/weeks/{week_start_date}")
def update_week(week_start_date: str, week_data: dict):
    file_path = SCHEDULE_FOLDER / f"{week_start_date}.json"

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Week schedule not found"
        )

    week = Week.from_dict(week_data)
    week.save_to_json(file_path)

    return {"message": "Week schedule updated"}