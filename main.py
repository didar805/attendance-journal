from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title="Attendance Journal API")

app.mount("/static", StaticFiles(directory="frontend"), name="static")

students = [
    {"id": 1, "name": "Балльева Б.", "role": "студент"},
    {"id": 2, "name": "Бердиев Р.", "role": "студент"},
    {"id": 3, "name": "Назаров Дидар", "role": "администратор"},
]

@app.get("/")
def home():
    return FileResponse(os.path.join("frontend", "index.html"))

@app.get("/students")
def get_students():
    return students

@app.post("/students/add")
def add_student(name: str):
    if not name.strip():
        return {"status": "error"}

    new_id = len(students) + 1
    students.append({
        "id": new_id,
        "name": name,
        "role": "студент"
    })
    return {"status": "ok"}

@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    global students
    students = [s for s in students if s["id"] != student_id]
    return {"status": "deleted"}
