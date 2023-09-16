from flask import Flask, request

app = Flask(__name__)

@app.get('/predict')
def predict():
    return 'Hello World!'


if __name__ == '__main__':
    app(app, host='0.0.0.0', port=5000)