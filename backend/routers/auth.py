from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import db

router = APIRouter()

class User(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(user: User):
    if db.db["users"].find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    db.db["users"].insert_one(user.dict())
    return {"message": "Usuario registrado exitosamente"}

@router.post("/login")
def login(user: User):
    user_in_db = db.db["users"].find_one({"username": user.username})
    if not user_in_db or user_in_db["password"] != user.password:
        raise HTTPException(status_code=400, detail="Credenciales inválidas")
    return {"message": "Inicio de sesión exitoso"}
