from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
from bs4 import BeautifulSoup
import requests
import pandas as pd
import subprocess
import json
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'sentiment analysis app!'

# Route pour envoyer les données JSON à l'extension
@app.route('/get_data', methods=['GET'])
def get_data():
    try:
        json_path = os.path.join(os.path.dirname(__file__), 'donnees.json')
        
        # Vérifier si le fichier JSON existe
        if not os.path.isfile(json_path):
            raise FileNotFoundError("Le fichier JSON n'existe pas.")
        
        ## Charger les données à partir du fichier JSON
        with open(json_path, 'r') as json_file:
            data = json.load(json_file)
            premier_pourcentage = data['VariablesIndependantes']['PourcentageAvisNegatifGlobal']
            print(premier_pourcentage)
        #print(data)
        return jsonify(data)
    
    except Exception as e:
        print(f"Erreur lors de la récupération des données : {e}")
        return jsonify({"error": "Erreur lors de la récupération des données"}), 500
    
# Ajout du décorateur pour lier la fonction à la route /receive_data
@app.route('/receive_data', methods=['POST'])
def receive_data():
    print("starting")
    url = request.json
    print(url)
    subprocess.run(["python", "test2.py", url])  # Run scrapping.py with the URL sent from the extension
    return "Data Received"

if __name__ == '__main__':
    app.run(debug=True)
