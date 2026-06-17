from app.models.week import Week


week = Week.load_from_json("app/schedules/20260614.json")

print("Loaded week:")
week.print_week()

week.days[1].shifts[0].start_time = "10:00"

week.save_to_json("app/schedules/test-copy.json")

print("Saved test-copy.json")