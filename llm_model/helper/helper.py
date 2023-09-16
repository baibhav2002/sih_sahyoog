import json

from flask import jsonify

def ApiResponse(plagiarism_score,is_plagiarism,current_plagiarism_stat):
    return jsonify({"plagiarism_score":plagiarism_score,"is_plagiarism":is_plagiarism,"current_plagiarism_stat":current_plagiarism_stat}),200

def ErrorResponse(error_message,status_code):
    return jsonify({'error': error_message}), status_code

def KeywordResponse(keywords,status_code):
    return json.dumps(keywords),status_code