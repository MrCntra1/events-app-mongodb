from fastapi import APIRouter
import services.category_service as category_service

router = APIRouter()

@router.get("/")
def list_categories():
    return category_service.list_categories()
