import os
from typing import Any, Optional

from bson import ObjectId
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

from database import create_document, db, get_documents

app = FastAPI(title="RayPulse API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def serialize(doc: dict[str, Any]) -> dict[str, Any]:
    result = dict(doc)
    result["id"] = str(result.pop("_id"))
    for key in ("created_at", "updated_at"):
        if key in result and hasattr(result[key], "isoformat"):
            result[key] = result[key].isoformat()
    return result


class MessageCreate(BaseModel):
    name: str = Field(min_length=1)
    email: EmailStr
    message: str = Field(min_length=1)


class MessageUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    message: Optional[str] = None


class WaitlistCreate(BaseModel):
    email: EmailStr
    updates: bool = True


class UserCreate(BaseModel):
    name: str = Field(min_length=1)
    email: EmailStr
    password: str = Field(min_length=4)
    bio: Optional[str] = ""
    gender: Optional[str] = ""


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    bio: Optional[str] = None
    gender: Optional[str] = None


@app.get("/")
def root():
    return {"message": "RayPulse API running"}


@app.get("/test")
def test_database():
    if db is None:
        return {"database": False, "status": "not connected"}
    return {"database": True, "status": "connected", "collections": db.list_collection_names()}


@app.post("/message")
def create_message(payload: MessageCreate):
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")
    return {"message": "created", "id": create_document("messages", payload)}


@app.get("/message/{user_id}")
def read_messages(user_id: str):
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")
    docs = get_documents("messages", {"$or": [{"email": user_id}, {"name": user_id}]})
    return [serialize(doc) for doc in docs]


@app.put("/notes/{message_id}")
def update_message(message_id: str, payload: MessageUpdate):
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")
    data = {k: v for k, v in payload.model_dump().items() if v is not None}
    result = db["messages"].update_one({"_id": ObjectId(message_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "updated"}


@app.post("/waitlist")
def join_waitlist(payload: WaitlistCreate):
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")
    return {"message": "joined", "id": create_document("waitlist", payload)}


@app.post("/users")
def create_user(payload: UserCreate):
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")
    if get_documents("users", {"email": payload.email}, limit=1):
        raise HTTPException(status_code=409, detail="User already exists")
    return {"message": "created", "id": create_document("users", payload)}


@app.get("/users")
def list_users():
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")
    return [serialize(doc) for doc in get_documents("users", {})]


@app.put("/users/{user_id}")
def update_user(user_id: str, payload: UserUpdate):
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")
    result = db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": {k: v for k, v in payload.model_dump().items() if v is not None}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "updated"}


@app.delete("/users/{user_id}")
def delete_user(user_id: str):
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")
    result = db["users"].delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "deleted"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
