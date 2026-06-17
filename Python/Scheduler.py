import json
from datetime import date, timedelta


class Position:
    def __init__(self, title, skill_requirements):
        self.title = title
        self.skill_requirements = skill_requirements


class Shift:
    def __init__(self, position, start_time, end_time):
        self.position = position
        self.start_time = start_time
        self.end_time = end_time


class Day:
    def __init__(self, day_of_week, date_value):
        self.day_of_week = day_of_week
        self.date = date_value
        self.shifts = []

    def add_shift(self, shift):
        self.shifts.append(shift)


class Week:
    def __init__(self, start_date):
        self.start_date = date.fromisoformat(start_date)
        self.days = []

        for i in range(7):
            current_date = self.start_date + timedelta(days=i)
            self.days.append(
                Day(i, current_date.isoformat())
            )

    def load_shifts(self, file_path):
        with open(file_path, "r") as file:
            data = json.load(file)

        for day_index in range(7):
            shifts = data["days"][day_index]

            for shift_data in shifts:
                position = Position(
                    shift_data["position"]["title"],
                    shift_data["position"]["skillRequirements"]
                )

                shift = Shift(
                    position,
                    shift_data["startTime"],
                    shift_data["endTime"]
                )

                self.days[day_index].add_shift(shift)


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


if __name__ == "__main__":
    week = Week("2026-06-07")

    week.load_shifts("week.json")

    week.print_week()