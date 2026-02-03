from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from datetime import date
import os

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

students = [
    {"id": 1, "name": "Aman"},
    {"id": 2, "name": "Kerim"},
    {"id": 3, "name": "Didar"},
]

attendance_pending = {}
attendance_done = {}

@app.get("/")
def home():
    return FileResponse(os.path.join("frontend", "index.html"))

@app.get("/students")
def get_students():
    return students

@app.post("/attendance/mark/{student_id}")
def mark(student_id: int):
    today = str(date.today())
    attendance_pending.setdefault(today, [])

    if student_id not in attendance_pending[today]:
        attendance_pending[today].append(student_id)

    return {"status": "pending"}

@app.get("/attendance/pending")
def pending():
    today = str(date.today())
    return attendance_pending.get(today, [])

@app.post("/attendance/confirm/{student_id}")
def confirm(student_id: int):
    today = str(date.today())
    attendance_done.setdefault(today, [])

    if student_id not in attendance_done[today]:
        attendance_done[today].append(student_id)

    if student_id in attendance_pending.get(today, []):
        attendance_pending[today].remove(student_id)

    return {"status": "confirmed"}

@app.get("/attendance/journal")
def journal():
    today = str(date.today())
    return attendance_done.get(today, [])
