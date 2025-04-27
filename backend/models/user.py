from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    id: Optional[str] = Field(alias="_id")
    username: str
    password: str

    class Config:
        validate_by_name = True
