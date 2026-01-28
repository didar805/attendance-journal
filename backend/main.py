from fastapi import FastAPI

app = FastAPI(title="Attendance Journal API")

@app.get("/")
def home():
    return {"message": "Backend работает 🚀"}