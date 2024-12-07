from pymongo import MongoClient
import json
import pprint
import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from module.parse import get_disciplines, get_url_direction

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
    data = disciplines.find_one({"table": 1})
    try: 
        data = disciplines.find_one({"table": 1})["disciplines"][direction] 
        return data
    except:
        await set_disciplines_db(get_url_direction(direction), direction) # Если не существует, то подкачиваем и парсим
        return (disciplines.find_one({"table": 1}))["disciplines"][direction]



async def set_disciplines_db(url: str, direction: str):
    disciplines = db.disciplines
    data_json = get_disciplines(url, direction)

    if (disciplines.find_one({"table": 1})): # Если коллекция уже существует добавляем новый элемент
        update_one(direction, data_json[direction])
    else:
        disciplines.insert_one({"disciplines": data_json, "table": 1}) # В противном случае вставляем новую коллекцию


def update_one(direction: str, data):
    disciplines = db.disciplines
    disciplines.update_one(
    {"table": 1},  
    {"$set": {f"disciplines.{direction}": data}} 
)
    