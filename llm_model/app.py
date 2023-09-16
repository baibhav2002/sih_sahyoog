from flask import Flask, request

app = Flask(__name__)

##---------Kyeword Extraction Start-----------------##
@app.post('/keyword-extractor')
def keyword_extractor():
    request_data = request.get_json()
    doc = request_data['document']
    return doc
##---------Kyeword Extraction End-----------------##

if __name__ == '__main__':
    app(app, host='0.0.0.0', port=5000)