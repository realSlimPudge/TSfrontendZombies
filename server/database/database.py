from pymongo import MongoClient
import json
import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from module.parse import get_disciplines

# Подключение к базе данных planedu
client = MongoClient("localhost", 27017)
db = client.planedu

async def get_faculties_db():
    #Подключение к папке факультеты
    faculties = db.faculties
    data = (faculties.find_one({"table": 1}))
    if data:
        return data['faculties']
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, "faculties.json")
        with open(file_path, 'r', encoding='utf-8') as file:
            test = json.load(file)
        faculties.insert_one({"faculties": test, "table": 1})

        data = (faculties.find_one({"table": 1}))
        return data['faculties']






async def get_roadmaps_db(discipline:str):
    roadmaps = db.roadmaps
    data = (roadmaps.find_one({"table": 1}))
    if data:
        if discipline:   
            return data["roadmaps"][discipline]
        else:
            return data["roadmaps"]
    else:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, "roadmaps.json")
        with open(file_path, 'r', encoding='utf-8') as file:
            test = json.load(file)
        roadmaps.insert_one({"roadmaps": test, "table": 1})
        data = (roadmaps.find_one({"table": 1}))
        if discipline:   
            return data["roadmaps"][discipline]
        else:
            return data["roadmaps"]


async def user_history():
    histories = db.histories


async def get_disciplines_db(direction:str):
    disciplines = db.disciplines
    data = (disciplines.find_one({"table": 1}))
    if data:
        return data["disciplines"][direction]
    else:
       await set_disciplines_db("https://edu.donstu.ru/Plans/Plan.aspx?id=50288", direction)
       return (disciplines.find_one({"table": 1}))["disciplines"][direction]


async def set_disciplines_db(url: str, direction: str):
    disciplines = db.disciplines
    get_disciplines(url, direction)

    script_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(script_dir)
    file_path = os.path.join(parent_dir, f"{direction}_disciplines.json")
    with open(file_path, 'r', encoding='utf-8') as file:
            test = json.load(file)


    disciplines.insert_one({"disciplines": test, "table": 1})

