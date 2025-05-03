from os import getenv
import requests
from flask import Flask, Response
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from google import genai
from google.genai import types
import json
from bson.json_util import dumps

MONGO_API_KEY = getenv("MONGO_URI")
GEMINI_API_KEY = getenv("GEMINI_API_KEY")
WEATHER_API_KEY = getenv("MAPS_API_KEY")

def get_mongo_data(device_id):
    res = []

    # Create a new client and connect to the server
    client = MongoClient(MONGO_API_KEY, server_api=ServerApi('1'))
    # Send a ping to confirm a successful connection
    try:
        db = client['demeter']
        collection = db['luxValue']
        query = { "deviceId": int(device_id) }
        result = collection.find(query)

        for doc in result:
            res.append(doc)

    except:
        print("error: couldn't connect to mongodb")
        pass

    return dumps(res) 

def get_weather_data():
    weather_get = "https://weather.googleapis.com/v1/forecast/days:lookup?key=%s&location.latitude=43.5355648&location.longitude=-80.2226176&days=7&pageSize=7" % WEATHER_API_KEY

    forecast = []

    res = requests.get(weather_get)
    days = res.json()["forecastDays"]
    for day in days:
        forecast.append(
            {
                "displayDate": day["displayDate"],
                "maxTemperature": day["maxTemperature"],
                "minTemperature": day["minTemperature"],
            }
        )

    return str(forecast)


app = Flask(__name__, static_url_path='/')

@app.route('/api/light_values/<device_id>')
def light_values(device_id):
    return Response(get_mongo_data(device_id), mimetype="application/json")

@app.route('/api/generate/<device_id>')
def generate(device_id):
    prompt = "Recommend one commonly accessible and easily maintainable plant that would thrive under these conditions:\n\n"

    prompt += get_mongo_data(device_id)
    prompt += get_weather_data()

    print(prompt)

    client = genai.Client(api_key=GEMINI_API_KEY)

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )

    return response.text


@app.route('/api/ping')
def ping_route():
    return 'Pong!'
