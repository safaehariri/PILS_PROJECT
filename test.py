from bs4 import BeautifulSoup
import requests
import pandas as pd
import sys
import time
import random
from urllib.parse import quote
from fake_useragent import UserAgent
from concurrent.futures import ThreadPoolExecutor

# Random user-agent
ua = UserAgent()

def scrap(URL):
    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
        'Accept-Language': 'en-US, en;q=0.5'
    }

    webpage = requests.get(URL, headers=HEADERS)
    print(webpage.status_code)
   
    soup = BeautifulSoup(webpage.content, "html.parser")
    reviews = []
    link = []
    for b in soup.findAll("a", {'data-hook': "see-all-reviews-link-foot"}):
        link.append(b['href'])
    print("links", link)

    CRAWLBASE_TOKEN = 'gAeK1ASL9vJyjT7iWKPxtw'  # Your Crawlbase token

    def make_request(url):
        encoded_url = quote(url, safe='')
        crawlbase_url = f'https://api.crawlbase.com/?token={CRAWLBASE_TOKEN}&url={encoded_url}'
        response = requests.get(crawlbase_url, headers={'User-Agent': ua.random})
        #response = requests.get(crawlbase_url, headers=HEADERS)
        return response

    def process_page(url):
        page = make_request(url)
        if page.status_code == 200:
            print("Page", url, "fetched successfully")
            soup = BeautifulSoup(page.content, "html.parser")

            new_reviews = [i.text for i in soup.findAll("span", {'data-hook': "review-body"})]
            if not new_reviews:
                print("No new reviews found on page", url)
                return None

            time.sleep(1)
            return new_reviews
        else:
            print(f"Error fetching page {url} - Status Code: {page.status_code}")
            return None

    if link:
        new_link = "https://www.amazon.com" + link[0]
        urls = [new_link + f'&pageNumber={k}' for k in range(1, 11)]  # Adjust the range as needed

        with ThreadPoolExecutor(max_workers=5) as executor:
            reviews = list(filter(None, executor.map(process_page, urls)))

        if reviews:
            reviews = [review for sublist in reviews for review in sublist]
            rev = {'reviews': reviews}
            review_data = pd.DataFrame.from_dict(rev)
            review_data.to_csv("amazon_data.csv", header=True, index=False)
            print("Total reviews collected:", len(reviews))
        else:
            print("No reviews collected.")
            
    else:
        print("Error fetching initial page - Status Code:", webpage.status_code)

    print(review_data)

    if not review_data.empty:
        review = review_data['reviews'].iloc[8]
        print("Full text of the first review:\n", review)
    else:
        print("Aucune revue n'a été collectée.")

if __name__ == "__main__":
    url = sys.argv[1]
    scrap(url)
