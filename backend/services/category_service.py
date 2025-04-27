import db

def list_categories():
    categories = []
    for cat in db.db["categories"].find():
        categories.append({
            "_id": str(cat["_id"]),
            "name": cat["name"]
        })
    return categories
