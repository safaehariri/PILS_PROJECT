from bs4 import BeautifulSoup
import requests
import pandas as pd
import sys 

URL = "https://www.amazon.com/Apple-Generation-Cancelling-Transparency-Personalized/dp/B0CHWRXH8B/ref=sr_1_2?crid=26SETBR5N2BEI&keywords=airpods&qid=1699803658&sprefix=airpod%2Caps%2C243&sr=8-2&th=1"
#URL =sys.argv[1]
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Accept-Language': 'en-US, en;q=0.5'
}

webpage = requests.get(URL, headers=HEADERS)
print(webpage.status_code)

soup = BeautifulSoup(webpage.content, "html.parser")

link=[]
reviews=[]

for i in soup.findAll("span",{'data-hook':"review-body"}):
      reviews.append(i.text)


for b in soup.findAll("a",{'data-hook':"see-all-reviews-link-foot"}):
    link.append(b['href'])

new_link="https://www.amazon.com"+link[0]

for k in range(1,4):
    url=new_link+'&pageNumber='+str(k)
    page = requests.get(url, headers=HEADERS)
    if page.status_code==200:
        print("ok")
    else:
        print("error")    
    soup=BeautifulSoup(page.content, "html.parser")
    print(k)
    for i in soup.findAll("span",{'data-hook':"review-body"}):
        print("here",k)
        reviews.append(i.text)
        print(len(reviews))

rev={'reviews':reviews}
review_data=pd.DataFrame.from_dict(rev)
review_data.to_csv("amazon_data.csv", header=True, index=False)
print(len(review_data))



# Function to extract Product Title
def get_title(soup):

    try:
        # Outer Tag Object
        title = soup.find("span", attrs={"id":'productTitle'})
        
        # Inner NavigatableString Object
        title_value = title.text

        # Title as a string value
        title_string = title_value.strip()

    except AttributeError:
        title_string = ""

    return title_string

# Function to extract Product Price
def get_price(soup):

    try:
        price = soup.find("span", attrs={'id':'priceblock_ourprice'}).string.strip()

    except AttributeError:

        try:
            # If there is some deal price
            price = soup.find("span", attrs={'id':'priceblock_dealprice'}).string.strip()

        except:
            price = ""

    return price

# Function to extract Product Rating
def get_rating(soup):

    try:
        rating = soup.find("i", attrs={'class':'a-icon a-icon-star a-star-4-5'}).string.strip()
    
    except AttributeError:
        try:
            rating = soup.find("span", attrs={'class':'a-icon-alt'}).string.strip()
        except:
            rating = ""	

    return rating


# Function to extract Number of User Reviews
def get_review_count(soup):
    try:
        review_count = soup.find("span", attrs={'id':'acrCustomerReviewText'}).string.strip()

    except AttributeError:
        review_count = ""	

    return review_count

# Function to extract Availability Status
def get_availability(soup):
    try:
        available = soup.find("div", attrs={'id':'availability'})
        available = available.find("span").string.strip()

    except AttributeError:
        available = "Not Available"	

    return available

d = {"title":[], "price":[], "rating":[], "reviews":[],"availability":[]}

d['title'].append(get_title(soup))
d['price'].append(get_price(soup))
d['rating'].append(get_rating(soup))
d['reviews'].append(get_review_count(soup))
d['availability'].append(get_availability(soup))
amazon_df = pd.DataFrame.from_dict(d)
#amazon_df.to_csv("amazon_data.csv", header=True, index=False)
#print(amazon_df)
