import json
from datetime import date, timedelta


class Position:
    def __init__(self, title, skill_requirements):
        self.title = title
        self.skill_requirements = skill_requirements

    def to_dict(self):
        return {
            "title": self.title,
            "skillRequirements": self.skill_requirements
        }

    @staticmethod
    def from_dict(data):
        return Position(
            data["title"],
            data["skillRequirements"]
        )


class Shift:
    def __init__(self, id, position, start_time, end_time):
        self.id = id
        self.position = position
        self.start_time = start_time
        self.end_time = end_time

    def to_dict(self):
        return {
            "id": self.id,
            "position": self.position.to_dict(),
            "startTime": self.start_time,
            "endTime": self.end_time
        }

    @staticmethod
    def from_dict(data):
        return Shift(
            data["id"],
            Position.from_dict(data["position"]),
            data["startTime"],
            data["endTime"]
        )


class Day:
    def __init__(self, day_of_week, date_value):
        self.day_of_week = day_of_week
        self.date = date_value
        self.shifts = []

    def add_shift(self, shift):
        self.shifts.append(shift)

    def to_dict(self):
        return [
            shift.to_dict()
            for shift in self.shifts
        ]

    @staticmethod
    def from_dict(day_index, date_value, data):
        day = Day(day_index, date_value)

        for shift_data in data:
            day.add_shift(Shift.from_dict(shift_data))

        return day


class Week:
    def __init__(self, start_date):
        self.start_date = date.fromisoformat(start_date)
        self.days = []

        for i in range(7):
            current_date = self.start_date + timedelta(days=i)
            self.days.append(Day(i, current_date.isoformat()))

    def to_dict(self):
        return {
            "startDate": self.start_date.isoformat(),
            "days": [
                day.to_dict()
                for day in self.days
                ]
            }

    @staticmethod
    def from_dict(data):
        week = Week(data["startDate"])

        for day_index in range(7):
            current_date = week.start_date + timedelta(days=day_index)

            week.days[day_index] = Day.from_dict(
                day_index,
                current_date.isoformat(),
                data["days"][day_index]
            )

        return week

    def save_to_json(self, file_path):
        with open(file_path, "w") as file:
            json.dump(self.to_dict(), file, indent=2)

    
    @staticmethod
    def load_from_json(file_path):
        with open(file_path, "r") as file:
            data = json.load(file)

        return Week.from_dict(data)

    def print_week(self):
        day_names = [
            "Sunday", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday"
        ]

        for day in self.days:
            print(f"{day_names[day.day_of_week]} {day.date}")

            for shift in day.shifts:
                print(f"  {shift.position.title} | {shift.start_time} - {shift.end_time}")

            print("")