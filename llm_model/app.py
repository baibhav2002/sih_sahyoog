from flask import Flask, request
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer
from helper.helper import ErrorResponse, KeywordResponse
from helper.helper import ApiResponse
from services.services import check_plagiarism

app = Flask(__name__)

##---------Kyeword Extraction Start-----------------##
@app.post('/keyword-extractor')
def keyword_extractor():
    try:
        request_data = request.get_json()
        doc = request_data['document']
        sentence_model = SentenceTransformer("all-MiniLM-L6-v2")
        kw_model = KeyBERT(model=sentence_model)
        keyword_1 = kw_model.extract_keywords(doc,top_n=10)
        formatted_data = [item[0] for item in keyword_1] 
        return KeywordResponse(formatted_data,200)
    
    except KeyError as e:
        error_message = f"KeyError: '{str(e)}'"
        return ErrorResponse(error_message, 400)
    
    except Exception as e:
        error_message = str(e)
        return ErrorResponse(error_message, 500)
##---------Kyeword Extraction End-----------------##

## -----------plagiarism checker starts---------------##
@app.post('/plagiarism-checker')
def plagiarism_checker():
    try:
        request_data = request.get_json()
        sentence_1 = request_data['sentence_1']
        sentence_2 = request_data['sentence_2']
        plagiarism_score,is_plagiarism,current_plagiarism_stat = check_plagiarism(sentence_1, sentence_2)
        return ApiResponse(plagiarism_score,is_plagiarism,current_plagiarism_stat)
    except KeyError as e:
        error_message = f"KeyError: '{str(e)}'"
        return ErrorResponse(error_message, 400)

    except Exception as e:
        error_message = str(e)
        return ErrorResponse(error_message, 500)

## -----------plagiarism checker ends---------------##


if __name__ == '__main__':
    app(app, host='0.0.0.0', port=5000)