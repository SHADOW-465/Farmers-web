# FarmersHub - AI-Powered Farming Assistant (Python Console Version)
# Feature: Weather, Crop Recommendation, Disease Detection, Market Prices, Marketplace, Government Schemes

import pandas as pd
import requests
import json
from PIL import Image
import base64
import io
from datetime import datetime
import numpy as np

# ------------------ Language Dictionary ------------------
languages = {
    "English": {
        "title": "FarmersHub - AI-Powered Farming Assistant",
        "weather": "Local Weather Updates",
        "crop_advisor": "AI Crop Recommendations",
        "disease_detector": "AI Plant Disease Detection",
        "market_prices": "Current Market Prices",
        "marketplace": "Digital Marketplace",
        "schemes": "Government Scheme Updates",
        "select_language": "Select Language",
        "select_state": "Select State",
        "select_village": "Select Village/Town",
        "showing_data": "Showing data for",
        "temperature": "Temperature",
        "humidity": "Humidity",
        "forecast": "Forecast",
        "village_input": "Village / Town",
        "soil_type": "Soil Type",
        "ph_level": "pH Level",
        "nitrogen": "Nitrogen (kg/ha)",
        "phosphorus": "Phosphorus (kg/ha)",
        "potassium": "Potassium (kg/ha)",
        "recommend": "Get AI Crop Recommendations",
        "recommended_crops": "AI Recommended Crops",
        "crop": "Crop",
        "price": "Price (₹/kg)",
        "product_name": "Product Name",
        "price_kg": "Price per kg",
        "quantity": "Quantity (kg)",
        "contact_info": "Contact Info",
        "post_listing": "Post Listing",
        "product_success": "Product listed successfully!",
        "scheme_1": "PM-KISAN: ₹6000 yearly income support to all farmers.",
        "scheme_2": "PMFBY: Crop insurance at low premium.",
        "scheme_3": "eNAM: Digital platform for buying and selling.",
        "scheme_4": "Soil Health Card: Free testing & crop advice.",
        "upload_image": "Upload Plant Image",
        "detect_disease": "Detect Disease",
        "disease_result": "Disease Detection Result",
        "confidence": "Confidence",
        "treatment": "Recommended Treatment",
        "rainfall": "Annual Rainfall (mm)",
        "season": "Planting Season",
        "kharif": "Kharif (Jun-Oct)",
        "rabi": "Rabi (Nov-Mar)",
        "zaid": "Zaid (Apr-May)",
        "analyzing": "🔍 Analyzing image...",
        "ai_processing": "🤖 AI is processing your request...",
    }
}

# Kerala-specific crop data for AI recommendations
KERALA_CROPS_DATA = {
    'Rice': {'ph_min': 5.0, 'ph_max': 6.5, 'rainfall_min': 1000, 'rainfall_max': 2000, 'temp_opt': 26},
    'Coconut': {'ph_min': 5.2, 'ph_max': 8.0, 'rainfall_min': 1300, 'rainfall_max': 2300, 'temp_opt': 28},
    'Pepper': {'ph_min': 5.5, 'ph_max': 7.0, 'rainfall_min': 1250, 'rainfall_max': 2000, 'temp_opt': 25},
    'Cardamom': {'ph_min': 5.0, 'ph_max': 6.5, 'rainfall_min': 1500, 'rainfall_max': 4000, 'temp_opt': 23},
    'Rubber': {'ph_min': 5.0, 'ph_max': 6.5, 'rainfall_min': 1500, 'rainfall_max': 2500, 'temp_opt': 27},
    'Tea': {'ph_min': 4.5, 'ph_max': 6.0, 'rainfall_min': 1200, 'rainfall_max': 2500, 'temp_opt': 22},
    'Coffee': {'ph_min': 6.0, 'ph_max': 7.0, 'rainfall_min': 1500, 'rainfall_max': 2000, 'temp_opt': 24},
    'Banana': {'ph_min': 5.5, 'ph_max': 7.0, 'rainfall_min': 1200, 'rainfall_max': 1800, 'temp_opt': 27},
    'Ginger': {'ph_min': 5.5, 'ph_max': 6.5, 'rainfall_min': 1500, 'rainfall_max': 3000, 'temp_opt': 25},
    'Turmeric': {'ph_min': 5.0, 'ph_max': 7.5, 'rainfall_min': 1000, 'rainfall_max': 1500, 'temp_opt': 26}
}

# Weather API
WEATHER_API_KEY = "e82ac14a7e3449f283b9622c41e505f6"
WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"

def get_weather(village, state):
    url = f"{WEATHER_BASE_URL}q={village},{state}&appid={WEATHER_API_KEY}&units=metric"
    try:
        response = requests.get(url, timeout=10)
        data = response.json()
        if data["cod"] != "404":
            main_data = data["main"]
            temperature = main_data["temp"]
            humidity = main_data["humidity"]
            weather_data = data["weather"][0]
            forecast = weather_data["description"]
            return temperature, humidity, forecast
        else:
            return None, None, None
    except:
        return None, None, None

def ai_crop_recommender(ph, nitrogen, phosphorus, potassium, rainfall, temperature, season):
    recommendations = []
    if temperature is None:
        temperature = 26
    for crop, requirements in KERALA_CROPS_DATA.items():
        ph_score = 1 - abs(ph - ((requirements['ph_min'] + requirements['ph_max']) / 2)) / 2
        ph_score = max(0, ph_score)
        rainfall_score = 1 if requirements['rainfall_min'] <= rainfall <= requirements['rainfall_max'] else 0.5
        temp_score = 1 - abs(temperature - requirements['temp_opt']) / 10
        temp_score = max(0, temp_score)
        nutrient_score = min(1, (nitrogen + phosphorus + potassium) / 300)
        overall_score = (ph_score * 0.3 + rainfall_score * 0.3 + temp_score * 0.2 + nutrient_score * 0.2)
        if overall_score > 0.5:
            recommendations.append({
                'crop': crop,
                'score': round(overall_score * 100, 1),
                'suitability': 'High' if overall_score > 0.8 else 'Medium' if overall_score > 0.6 else 'Low'
            })
    recommendations.sort(key=lambda x: x['score'], reverse=True)
    return recommendations[:5]

# Example usage (console)
if __name__ == "__main__":
    print("Welcome to FarmersHub Console Edition!")
    print("Select Feature:")
    print("1. Weather Updates")
    print("2. Crop Recommendation")
    print("3. Market Prices")
    print("4. Government Schemes")
    choice = input("Enter choice (1-4): ")
    if choice == "1":
        state = input("Enter State: ")
        village = input("Enter Village/Town: ")
        temp, humidity, forecast = get_weather(village, state)
        if temp:
            print(f"Temperature: {temp}°C")
            print(f"Humidity: {humidity}%")
            print(f"Forecast: {forecast}")
        else:
            print("Unable to fetch weather data.")
    elif choice == "2":
        village = input("Enter Village/Town: ")
        soil_type = input("Enter Soil Type: ")
        ph_level = float(input("Enter pH Level: "))
        nitrogen = int(input("Enter Nitrogen (kg/ha): "))
        phosphorus = int(input("Enter Phosphorus (kg/ha): "))
        potassium = int(input("Enter Potassium (kg/ha): "))
        rainfall = int(input("Enter Annual Rainfall (mm): "))
        season = input("Enter Season (Kharif/Rabi/Zaid): ")
        temp = float(input("Enter Temperature (°C): "))
        recommendations = ai_crop_recommender(ph_level, nitrogen, phosphorus, potassium, rainfall, temp, season)
        if recommendations:
            print("Recommended Crops:")
            for rec in recommendations:
                print(f"{rec['crop']} - Score: {rec['score']}% - Suitability: {rec['suitability']}")
        else:
            print("No suitable crops found.")
    elif choice == "3":
        print("Sample Kerala Market Prices:")
        market_data = {
            "Rice": "₹28-32",
            "Coconut": "₹15-20",
            "Pepper": "₹450-500",
            "Cardamom": "₹1200-1400",
            "Rubber": "₹140-160",
            "Banana": "₹25-30",
            "Ginger": "₹80-100"
        }
        for crop, price in market_data.items():
            print(f"{crop}: {price}")
    elif choice == "4":
        print("Government Schemes:")
        print("PM-KISAN: ₹6000 yearly income support to all farmers.")
        print("PMFBY: Crop insurance at low premium.")
        print("eNAM: Digital platform for buying and selling.")
        print("Soil Health Card: Free testing & crop advice.")
    else:
        print("Invalid choice.")
