from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database.database import get_faculties_db, get_roadmaps_db
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type", "Authorization", "Set-Cookie", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers"],
)

@app.get("/api/faculties/")
def get_faculties():
    data = get_faculties_db()
    return data


@app.get("/api/roadmaps/")
def get_roadmaps():
    data = get_roadmaps_db("TODO")
    return {"data": data}