from fastapi import APIRouter, Form

router = APIRouter()

# wagtlaýyn ulanyjy bazasy
users = {
    "didarnazarov838@gmail.com": {
        "password": "2oh",
        "roles": ["admin", "student"]
    }
}

@router.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    user = users.get(username)

    if not user or user["password"] != password:
        return {"status": "error", "message": "Login yalnys"}

    return {
        "status": "ok",
        "email": username,
        "roles": user["roles"]
    }
