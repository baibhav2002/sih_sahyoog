import json

def KeywordResponse(keywords,status_code):
    return json.dumps(keywords),status_code