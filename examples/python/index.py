import requests

api_key = "add_your_api_key"
base_url = "https://www.lgutimetable.live"

end_points = {
    "metadata": f"{base_url}/api/public/metadata?apikey={api_key}",
    "timetable": f"{base_url}/api/public/timetable?apikey={api_key}"
}

payload = {
    "semester": "1st Semester Sp-2023 / Sp-2023".strip(),
    "program": "MPhil Microbiology".strip(),
    "section": "Sec A".strip()
}

# Request metadata
meta_data = requests.get(end_points["metadata"])
print(f"timetable: {meta_data.text}")

# Request timetable
timetable = requests.get(end_points["timetable"], data= payload)
print(f"timetable: {timetable.text}")
