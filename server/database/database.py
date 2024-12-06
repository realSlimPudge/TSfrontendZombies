from pymongo import MongoClient
import json
import os

# Подключение к базе данных planedu
client = MongoClient("localhost", 27017)
db = client.planedu

def get_faculties_db():
    #Подключение к папке факультеты
    faculties = db.faculties

    # script_dir = os.path.dirname(os.path.abspath(__file__))
    # file_path = os.path.join(script_dir, "faculties.json")
    # with open(file_path, 'r', encoding='utf-8') as file:
    #     test = json.load(file)
    # faculties.insert_one({"faculties": test, "table": 1})

    data = (faculties.find_one({"table": 1}))
    return data["faculties"]





def user_history():
    histories = db.histories

def get_roadmaps_db(discipline:str):
    roadmaps = db.roadmaps


    # script_dir = os.path.dirname(os.path.abspath(__file__))
    # file_path = os.path.join(script_dir, "roadmaps.json")
    # with open(file_path, 'r', encoding='utf-8') as file:
    #     test = json.load(file)
    # roadmaps.insert_one({"roadmaps": test, "table": 1})
    

    data = (roadmaps.find_one({"table": 1}))
    return data["roadmaps"]


