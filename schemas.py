from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class Message(BaseModel):
    name: str = Field(..., description="Sender name")
    email: EmailStr = Field(..., description="Sender email")
    message: str = Field(..., description="Message body")


class Waitlist(BaseModel):
    email: EmailStr = Field(..., description="Waitlist email")
    updates: bool = Field(True, description="Receive updates")


class User(BaseModel):
    name: str = Field(..., description="Full name")
    email: EmailStr = Field(..., description="Email address")
    password: str = Field(..., description="Password")
    bio: Optional[str] = Field("", description="User bio")
    gender: Optional[str] = Field("", description="Gender")
