import os
import requests
from bs4 import BeautifulSoup
import json


def get_disciplines(url: str, direction_name: str):

    response = requests.get(url)

    if response.status_code == 200:
        # Получаем всю HTML страничку
        soup = BeautifulSoup(response.content, 'html.parser')

        # Находим все ссылки
        aLinks = soup.find_all('a', class_='aLink')


        disciplines = {f'{direction_name}': []}
        # Найдём все ссылки на РПД
        for a_tag in aLinks:


            if "РПД" in a_tag.get_text():
                filename = a_tag.find_parent().find_parent().find(class_="dxgv dx-al") # Ссылка на html элемент с именем
                parent_element = filename.find_parent() # Ссылка на родителя чтобы найти курс и семестр
                ac_elements = parent_element.find_all(class_="dxgv dx-ac") # Все элементы с классом как у курса и семестра
                kyrs = ac_elements[2]
                semestr = ac_elements[3]
                file_url = a_tag['href']
                if not file_url.startswith('http'):
                    file_url = os.path.join(url, file_url)

                disciplines[f'{direction_name}'].append(
                    {"name": filename.get_text(),
                     "course": (kyrs.get_text()),
                     "semester": (semestr.get_text())
                    }
                     )
                
        return disciplines
        # Записываем результат в JSON файл
        with open(f'{direction_name}_disciplines.json', 'w', encoding='utf-8') as json_file:
            json.dump(disciplines, json_file, ensure_ascii=False, indent=4)

def get_pdf(name):
    # Ссылка на учебный план ДГТУ
    url = 'https://edu.donstu.ru/Plans/Plan.aspx?id=50288'

    response = requests.get(url)

    if response.status_code == 200:
        # Получаем всю HTML страничку
        soup = BeautifulSoup(response.content, 'html.parser')

        # Находим все ссылки
        aLinks = soup.find_all('a', class_='aLink')

        # Найдём все ссылки на РПД
        for a_tag in aLinks:


            if "РПД" in a_tag.get_text():
                filename = a_tag.find_parent().find_parent().find(class_="dxgv dx-al").get_text()
                file_url = a_tag['href']

                if not file_url.startswith('http'):
                    file_url = os.path.join(url, file_url)
                print(filename)
                # Пытаемся скачать РПД
                if filename == f'{name}':
                    try:
                        # Выполняем GET-запрос
                        response = requests.get(file_url)
                        response.raise_for_status()

                        # Сохраняем содержимое в файл
                        with open(f"{filename}.pdf", "wb") as file:
                            file.write(response.content)

                        print(f"Файл успешно сохранен как '{filename}'")

                    except requests.exceptions.RequestException as e:
                        print(f"Ошибка при загрузке файла: {e}")

    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")

def get_url_direction(direction: str) -> str:

    dic = {
        # ИиВТ
        "ВКБ" : "https://edu.donstu.ru/Plans/Plan.aspx?id=50117",
        "ВИАС" : "https://edu.donstu.ru/Plans/Plan.aspx?id=48732",
        "ВПР" : "https://edu.donstu.ru/Plans/Plan.aspx?id=50104",
        "ВМО" : "https://edu.donstu.ru/Plans/Plan.aspx?id=50288",

        #АгроПром
        "ЭИБ" : "https://edu.donstu.ru/Plans/Plan.aspx?id=48767",
        "АТК" : "https://edu.donstu.ru/Plans/Plan.aspx?id=48601",
        "АЗТК" : "https://edu.donstu.ru/Plans/Plan.aspx?id=51236",
        "АБ" : "https://edu.donstu.ru/Plans/Plan.aspx?id=49735",


        #Авиа
        "АВЗТ" : "https://edu.donstu.ru/Plans/Plan.aspx?id=49811",
        "АВЭ" : "https://edu.donstu.ru/Plans/Plan.aspx?id=49812",
        "АВТ": "https://edu.donstu.ru/Plans/Plan.aspx?id=50951",
        "АВЗН" : "https://edu.donstu.ru/Plans/Plan.aspx?id=49796",

        #АМиУ
        "УМТ" : "https://edu.donstu.ru/Plans/Plan.aspx?id=48803",
        "УЗМТ" : "https://edu.donstu.ru/Plans/Plan.aspx?id=48800",
        "УНЭ" : "https://edu.donstu.ru/Plans/Plan.aspx?id=48792",
        "ПФМ": "https://edu.donstu.ru/Plans/Plan.aspx?id=48574"
        

    }
    return dic[direction]
