from bs4 import BeautifulSoup
from retrying import retry
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
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15',
        'Accept-Language': 'en-US, en;q=0.5'
    }


    # Créez une instance de UserAgent
    ua = UserAgent()


    webpage = requests.get(URL, headers=HEADERS)
    print(webpage.status_code)
    print(webpage.text)

    soup = BeautifulSoup(webpage.content, "html.parser")
    reviews = []
    link = []
    for b in soup.findAll("a", {'data-hook': "see-all-reviews-link-foot"}):
        link.append(b['href'])
    print("links", link)

    # Function to make a request using Crawlbase
    CRAWLBASE_TOKEN = 'gAeK1ASL9vJyjT7iWKPxtw'  # Your Crawlbase token

    def make_request(url):
        encoded_url = quote(url, safe='')
        crawlbase_url = f'https://api.crawlbase.com/?token={CRAWLBASE_TOKEN}&url={encoded_url}'
        response = requests.get(crawlbase_url, headers={'User-Agent': ua.random})
        return response

    MAX_RETRIES = 2
    RETRY_SLEEP_SECONDS = 2

    def make_request_with_retry(url):
        for attempt in range(MAX_RETRIES):
            page = make_request(url)

            if page.status_code == 200:
                return page
            else:
                print(f"Error fetching page {url} - Attempt {attempt + 1} - Status Code: {page.status_code}")
                time.sleep(RETRY_SLEEP_SECONDS)

        print(f"Failed to fetch page {url} after {MAX_RETRIES} attempts.")
        return None

    def process_page(url):
        page = make_request_with_retry(url)

        if page is not None and page.status_code == 200:
            print("Page", url, "fetched successfully")
            soup = BeautifulSoup(page.content, "html.parser")

            new_reviews = [i.text for i in soup.findAll("span", {'data-hook': "review-body"})]
            if not new_reviews:
                print("No new reviews found on page", url)
                return None

            time.sleep(random.uniform(2, 4))
            return new_reviews
        else:
            return None

    if link:
        new_link = "https://www.amazon.com" + link[0]
        urls = [new_link + f'&pageNumber={k}' for k in range(1, 4)]  # Adjust the range as needed

        with ThreadPoolExecutor(max_workers=5) as executor:  # Adjust the number of workers as needed
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

    # Afficher un review en entier
    if not review_data.empty:
        review = review_data['reviews'].iloc[10]
        print("Full text of the first review:\n", review)
    else:
        print("Aucune revue n'a été collectée.")

if __name__ == "__main__":
    url = sys.argv[1]  
    scrap(url)