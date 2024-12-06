from pymongo import MongoClient
import json


# Подключение к базе данных planedu
client = MongoClient("localhost", 27017)
db = client.planedu

def faculties():
    #Подключение к папке факультеты
    faculties = db.faculties


    # with open('faculties.json', 'r', encoding='utf-8') as file:
    #     test = json.load(file)

    # faculties.insert_one({"faculties": test, "table": 1})

    data = (faculties.find_one({"table": 1}))
    return data["faculties"]

def user_history():
    histories = db.histories

faculties()