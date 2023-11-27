from bs4 import BeautifulSoup
import requests
import pandas as pd
import sys
import time
import random
import json
import re
import spacy
from transformers import pipeline
from urllib.parse import quote
from fake_useragent import UserAgent
from concurrent.futures import ThreadPoolExecutor

# Random user-agent
ua = UserAgent()

# Load the English linguistic model
nlp = spacy.load("en_core_web_sm")

def predict_and_classify_sentiment(text):
    sentiment_pipeline = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")
    result = sentiment_pipeline(text)
    label = result[0]['label']
    return 'negative' if '1' in label or '2' in label else 'neutral' if '3' in label else 'positive'

def extract_feature_clauses(text, features):
    sentences = re.split(r'[,.!?]|(?:\s(?:but|however)\s)', text, flags=re.IGNORECASE)
    extracts_per_feature = {feature: set() for feature in features}
    for sentence in sentences:
        doc = nlp(sentence)
        for feature in features:
            if any(token.text.lower() == feature.lower() for token in doc):
                extracts_per_feature[feature].add(sentence.strip())
    return extracts_per_feature

def process_reviews(df, features, feature_name):
    feature_sentiments = {'positive': 0, 'negative': 0, 'neutral': 0}
    for review in df['reviews']:
        feature_extracts = extract_feature_clauses(review, features)
        for feature in features:
            for extract in feature_extracts[feature]:
                sentiment = predict_and_classify_sentiment(extract)
                if sentiment in feature_sentiments:
                    feature_sentiments[sentiment] += 1

    total = sum(feature_sentiments.values())
    percentages = {k: (v / total * 100) if total > 0 else 0 for k, v in feature_sentiments.items()}
    return percentages

def scrap(URL):
    HEADERS = {'User-Agent': ua.random, 'Accept-Language': 'en-US, en;q=0.5'}
    webpage = requests.get(URL, headers=HEADERS)
    print("Status Code:", webpage.status_code)

    soup = BeautifulSoup(webpage.content, "html.parser")    
    reviews = []
    for b in soup.findAll("a", {'data-hook': "see-all-reviews-link-foot"}):
        review_page_url = "https://www.amazon.com" + b['href']
        reviews.extend(scrape_reviews(review_page_url))

    if reviews:
        review_data = pd.DataFrame({'reviews': reviews})
        analyze_and_output(review_data)
    else:
        print("No reviews collected.")

def scrape_reviews(url):
    MAX_RETRIES = 2
    RETRY_SLEEP_SECONDS = 2

    def make_request_with_retry(url):
        for attempt in range(MAX_RETRIES):
            page = requests.get(url, headers={'User-Agent': ua.random})
            if page.status_code == 200:
                return page
            else:
                print(f"Error fetching page {url} - Attempt {attempt + 1} - Status Code: {page.status_code}")
                time.sleep(RETRY_SLEEP_SECONDS)
        return None

    page = make_request_with_retry(url)
    if page and page.status_code == 200:
        soup = BeautifulSoup(page.content, "html.parser")
        new_reviews = [i.text.strip() for i in soup.findAll("span", {'data-hook': "review-body"})]
        time.sleep(random.uniform(2, 3))
        return new_reviews
    return []

def analyze_and_output(review_data):
    # General sentiment analysis
    review_data['sentiment'] = review_data['reviews'].apply(predict_and_classify_sentiment)
    general_sentiments = review_data['sentiment'].value_counts(normalize=True) * 100

    # Feature-specific analysis
    feature_sets = {
        "Battery": ["battery", "charge", "longevity", "battery life"],
        "Price": ["price", "cost", "affordable", "cheap", "expensive"],
        "Connectivity": ["connectivity", "connection", "network"]
    }
    feature_sentiments = {feature: process_reviews(review_data, features, feature) for feature, features in feature_sets.items()}

    # Output results
    final_data = {
        "general_sentiments": general_sentiments.to_dict(),
        "feature_specific_sentiments": feature_sentiments
    }
    with open('sentiment_analysis_results.json', 'w') as file:
        json.dump(final_data, file, indent=4)
    print("Sentiment analysis results saved to 'sentiment_analysis_results.json'")

if __name__ == "__main__":
    url = sys.argv[1]  # Provide the URL as a command-line argument
    scrap(url)
