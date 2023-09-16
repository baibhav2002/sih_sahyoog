from flask import Flask, request
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer
app = Flask(__name__)

##---------Kyeword Extraction Start-----------------##
@app.post('/keyword-extractor')
def keyword_extractor():
    request_data = request.get_json()
    doc = request_data['document']
    sentence_model = SentenceTransformer("all-MiniLM-L6-v2")
    kw_model = KeyBERT(model=sentence_model)
    keyword_1 = kw_model.extract_keywords(doc,top_n=10)
    return keyword_1
##---------Kyeword Extraction End-----------------##

if __name__ == '__main__':
    app(app, host='0.0.0.0', port=5000)