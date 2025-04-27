from fastapi import APIRouter, HTTPException, Query
from models.event import Event
import services.event_service as event_service

router = APIRouter()

@router.post("/", response_model=Event)
def create_event(event: Event):
    return event_service.create_event(event)

@router.get("/", response_model=list[Event])
def list_events(username: str = Query(None)):
    return event_service.list_events(username=username)
