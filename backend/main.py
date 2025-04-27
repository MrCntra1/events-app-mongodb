from fastapi import FastAPI
from db import connect_to_mongo, close_mongo_connection
from routers.auth import router as auth_router
from routers.event import router as events_router
from routers.category import router as category_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Event App", version="1.0")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def startup_db_client():
    connect_to_mongo()

app.add_event_handler("startup", startup_db_client)

def shutdown_db_client():
    close_mongo_connection()

app.add_event_handler("shutdown", shutdown_db_client)

# 🔥 Aquí está corregido
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(events_router, prefix="/events", tags=["events"])
app.include_router(category_router, prefix="/categories", tags=["categories"])  # 👈 faltaba el prefix
