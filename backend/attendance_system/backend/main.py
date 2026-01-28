from fastapi import FastAPI

app = FastAPI(title="Журнал посещаемости")

@app.get("/")
def root():
    return {"status": "Backend работает"}