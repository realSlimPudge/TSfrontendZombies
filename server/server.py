from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database.database import get_faculties_db, get_roadmaps_db, get_disciplines_db
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
app = FastAPI()


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type", "Authorization", "Set-Cookie", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers"],
)



# Схемы для Faculties
class Subject(BaseModel):
    name: str
    subjects: List[str]

class Department(BaseModel):
    _id: str
    title: str
    directions: List[Subject]

class Faculties(BaseModel):
    data: List[Department]

### API ДЛЯ БАЗЫ ДАННЫХ ##
@app.get("/api/faculties/")
async def get_faculties() -> Faculties:
    data = await get_faculties_db()
    return data

@app.get("/api/roadmaps/")
async def get_roadmaps():
    data = await get_roadmaps_db("")
    return {"data": data}


@app.get("/api/get_disciplines/{direction}")
async def get_disciplines(direction: str) -> object:
    data = await get_disciplines_db(direction)
    return data