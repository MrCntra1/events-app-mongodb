from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Event(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    location: Optional[str] = None
    username: str  # Quién creó el evento
    category: Optional[str] = None  # 👈 👈 AÑADIR CATEGORÍA

    class Config:
        validate_by_name = True
