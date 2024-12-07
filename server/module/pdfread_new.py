import PyPDF2
import re
import os
from parse import get_pdf

def extract_text(file_name):
    if not os.path.exists(f"{file_name}.pdf"):
        get_pdf(file_name)
    pdf_file = open(f'{file_name}.pdf', 'rb')
    pdf_reader = PyPDF2.PdfReader(pdf_file)

    # Define the pages where the table is located
    start_page = 0  # 0-based index, so page 4 is index 3
    end_page = len(pdf_reader.pages) -1  # Page 10 is index 9

    # Extract text from the specified pages
    text = ''
    for page_num in range(start_page, end_page + 1):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()

    pdf_file.close()
    return get_topics_and_sections(text)

def get_topics_and_sections(text):
    # Define regex pattern
    pattern = re.compile(r'^(\d+\.\d+)\s+(.*?)/(\w+)/', re.MULTILINE | re.DOTALL)

    # Find all matches
    matches = pattern.findall(text)

    # Define regex pattern to find section headings
    section_pattern = re.compile(r'Раздел \d+\. .*?(?=\n\n|\n\d+\.|\Z)', re.MULTILINE | re.DOTALL)

    # Find all matches
    sections = section_pattern.findall(text)


    # Collect and clean the data
    extracted_data = []
    for match in matches:
        section_number = match[0]
        topic_name = re.sub(r'ОПК-?\d+\.\d+\.\d+', '', match[1]).strip()
        class_type = match[2]
        extracted_data.append(f" {section_number} {topic_name} /{class_type}/")


    topics = []
    # Print the extracted data
    for data in extracted_data:
        if "/Пр/"  in data:
            topics.append(data.strip())
    return combine_data(sections, topics)


def combine_data(sections, topics):
    result = []
    result.append(sections[0])  # Добавляем первый раздел
    i = 0  # Индекс текущего раздела

    for topic in topics:
        # Сравниваем номер темы и номер текущего раздела
        if topic.split('.')[0] == sections[i].split(' ')[1].split('.')[0]:
            result.append(topic)
        else:
            i += 1
            result.append(sections[i])  # Переходим к следующему разделу
            if topic.split('.')[0] == sections[i].split(' ')[1].split('.')[0]:
                result.append(topic)


    return result


def get_practice_pdf(file_name):
    return extract_text(file_name)