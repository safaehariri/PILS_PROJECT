from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
from bs4 import BeautifulSoup
import requests
import pandas as pd
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'sentiment analysis app!'
@app.route('/receive_data', methods=['POST'])
   
def receive_data():
    print("starting")
    url = request.json
    print(url)
    subprocess.run(["python", "test.py", url])  # Run scrapping.py with the URL sent from the extension
    return "Data Received"


if __name__ == '__main__':
    app.run(debug=True)
