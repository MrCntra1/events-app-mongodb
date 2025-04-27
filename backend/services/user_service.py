from models.user import User
import db

def create_user(user: User) -> User:
    data = user.dict(by_alias=True, exclude={"id"})
    result = db.db["users"].insert_one(data)
    user.id = str(result.inserted_id)
    return user

def find_user_by_username(username: str):
    return db.db["users"].find_one({"username": username})
