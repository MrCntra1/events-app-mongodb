from models.event import Event
from typing import List
import db
from bson import ObjectId

def create_event(event: Event) -> Event:
    data = event.dict(by_alias=True, exclude={"id"})
    result = db.db["events"].insert_one(data)
    event.id = str(result.inserted_id)
    return event

def list_events(username: str = None) -> List[Event]:
    events = []
    query = {}
    if username:
        query["username"] = username
    for doc in db.db["events"].find(query):
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        events.append(Event(**doc))
    return events
