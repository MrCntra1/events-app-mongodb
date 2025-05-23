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
    username: str  # El usuario que creó el evento

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
