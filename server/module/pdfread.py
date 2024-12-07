import PyPDF2
import re
import os
from parse import get_pdf
def extract_text_from_pdf(file_path):
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ''
            for page in pdf_reader.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        return f"Ошибка при обработке файла: {e}"




def merge_elements(lst):
    result = []
    i = 0
    while i < len(lst):
        if lst[i].startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.')):
            merged_element = lst[i]
            i += 1
            while i < len(lst) and not lst[i].startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.')):
                merged_element += ' ' + lst[i]
                i += 1
            result.append(merged_element)
        else:
            result.append(lst[i])
            i += 1
    return result


    
def parse_rpd(text):
    result = []
    sections = (text.split("4. СТРУКТУРА И СОДЕРЖАНИЕ ДИСЦИПЛИНЫ (МОДУЛЯ)")[1].split("5. ОЦЕНОЧНЫЕ МАТЕРИАЛЫ (ОЦЕНОЧНЫЕ СРЕДСТВА)")[0]) #5. ОЦЕНОЧНЫЕ МАТЕРИАЛЫ (ОЦЕНОЧНЫЕ СРЕДСТВА)
    if sections.split('Раздел')[1:]:
        unclear_lines = ''.join(sections.split('Раздел')[1:])

        
        for unclear_line in unclear_lines.split("\n"):
            
            if "ОПК" in unclear_line:
                pass
            else:
                cleaned_line = re.sub(r'\s*Л\d+\.\d+\s*', '', unclear_line).strip()
                data = (cleaned_line.split("\n"))
                for item in data:
                    result.append(item)
    return result


def get_practice(file_name):
    file_path = f"{file_name}.pdf"
    if not os.path.exists(file_path):
        get_pdf(file_name)
    text = extract_text_from_pdf(file_path)
    if text:
        parsed_data = parse_rpd(text)
        return [item for item in merge_elements(parsed_data) if "/Пр/" in item or item[2] == " "]