import json

from flask import jsonify

def ErrorResponse(error_message,status_code):
    return jsonify({'error': error_message}), status_code

def KeywordResponse(keywords,status_code):
    return json.dumps(keywords),status_code