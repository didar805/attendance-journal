from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title="Журнал посещаемости")

# Подключаем папку frontend
app.mount("/static", StaticFiles(directory="frontend"), name="static")

# Главная страница
@app.get("/")
def home():
    return FileResponse(os.path.join("frontend", "index.html"))

# Список студентов
students = [
    {"id": 1, "name": "Баллыева Б.", "role": "студент"},
    {"id": 2, "name": "Бердиев Р.", "role": "студент"},
    {"id": 3, "name": "Назаров Дидар", "role": "администратор"},
]

@app.get("/students")
def get_students():
    return students
