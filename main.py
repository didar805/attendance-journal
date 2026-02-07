from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from routes.auth import router as auth_router

app = FastAPI()
students = [
    {"name": "Ali", "group": "A1"},
    {"name": "Veli", "group": "A1"},
    {"name": "Aysha", "group": "B2"}
]
app.include_router(auth_router)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def home():
    return FileResponse("templates/index.html")
@app.get("/journal")
def journal():
   return FileResponse("templates/journal.html")
    @app.get("/api/students")
def get_students():
    return {"students": students}
