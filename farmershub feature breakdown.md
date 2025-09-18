# FarmersHub Feature Breakdown

1. Weather Updates
   - Fetches real-time weather data (temperature, humidity, forecast) for a given village/town and state using OpenWeatherMap API.
   - Input: State, Village/Town
   - Output: Temperature (°C), Humidity (%), Forecast (description)

2. AI Crop Recommendation
   - Recommends the top 5 crops suitable for Kerala based on soil pH, nutrients, rainfall, temperature, and season.
   - Inputs: Soil Type, pH Level, Nitrogen, Phosphorus, Potassium, Rainfall, Season, Temperature
   - Output: List of recommended crops with suitability score and rating (High/Medium/Low)
   - Logic: Uses a scoring system based on crop requirements and user input.

3. Market Prices
   - Displays sample market prices for major Kerala crops.
   - Output: Crop name and price range (₹/kg)

4. Government Schemes
   - Lists major government schemes for farmers:
     - PM-KISAN: Yearly income support
     - PMFBY: Crop insurance
     - eNAM: Digital marketplace
     - Soil Health Card: Free testing & advice

5. Language Support
   - Multi-language dictionary for UI labels (English, Tamil, Hindi, Malayalam)
   - Easily extendable for more languages

6. Extensible Data
   - Crop data and market prices can be updated for other states or regions
   - Government schemes can be customized

7. Console-Based User Flow
   - Simple menu-driven interface for feature selection
   - User inputs collected via standard input
   - Results displayed in terminal

8. Modular Functions
   - Weather API function
   - Crop recommendation function
   - Easy to add more features (e.g., disease detection, marketplace listings)

# To extend:
# - Add disease detection using image classification API
# - Add digital marketplace for product listings
# - Integrate with more APIs for real-time data
# - Add persistent storage for user data
