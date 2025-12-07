"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GOOGLE_API_KEY || ""

export async function getGeminiResponse(prompt: string) {
  if (!apiKey) {
    return "Simulation: The AI functionality requires a valid GOOGLE_API_KEY. (Mock Response)"
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Gemini API Error:", error)
    return "Error: Failed to fetch response from Gemini. Please check your API key."
  }
}

export async function getChatResponse(history: { role: string; parts: string }[], message: string) {
  if (!apiKey) {
    return "Simulation: I am a mock AI assistant. Please configure GOOGLE_API_KEY to enable real intelligence."
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const chatHistory = history.map((h) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.parts }],
    }))

    const chat = model.startChat({
      history: chatHistory,
    })

    const result = await chat.sendMessage(message)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Gemini Chat Error:", error)
    return "Error: Failed to get chat response."
  }
}

export async function getCropRecommendations(data: any) {
  if (!apiKey) {
    return JSON.stringify([
      {
        id: "1",
        name: "Black Pepper",
        suitabilityScore: 92,
        expectedYield: "2-3 kg per vine",
        marketPrice: 450,
        profitability: "high",
        growthPeriod: "3-4 years",
        waterRequirement: "medium",
        soilSuitability: 95,
        marketDemand: 88,
        riskLevel: "low",
        advantages: ["High market value", "Suitable for Kerala climate", "Intercrop potential"],
        considerations: ["Initial investment", "Maturation time"],
        bestPlantingTime: "May-June",
        harvestTime: "Dec-Feb",
      },
      {
        id: "2",
        name: "Coconut",
        suitabilityScore: 85,
        expectedYield: "80-120 nuts/palm",
        marketPrice: 25,
        profitability: "medium",
        growthPeriod: "5-6 years",
        waterRequirement: "medium",
        soilSuitability: 90,
        marketDemand: 75,
        riskLevel: "low",
        advantages: ["Steady income", "Multiple products", "Long life"],
        considerations: ["Space requirement", "Long gestation"],
        bestPlantingTime: "May-June",
        harvestTime: "Year-round",
      },
       {
        id: "3",
        name: "Rice (Paddy)",
        suitabilityScore: 82,
        expectedYield: "4-6 tons/ha",
        marketPrice: 20,
        profitability: "medium",
        growthPeriod: "3-4 months",
        waterRequirement: "high",
        soilSuitability: 88,
        marketDemand: 85,
        riskLevel: "medium",
        advantages: ["Staple crop", "Govt support", "Short duration"],
        considerations: ["Water intensive", "Labor intensive"],
        bestPlantingTime: "June-July",
        harvestTime: "Sept-Oct",
      }
    ])
  }

  const prompt = `
    Analyze the following farm data for Kerala, India:
    Soil Type: ${data.soilType}
    pH: ${data.ph}
    Nitrogen: ${data.nitrogen}
    Phosphorus: ${data.phosphorus}
    Potassium: ${data.potassium}
    Rainfall: ${data.rainfall} mm
    Temperature: ${data.temperature} C
    Season: ${data.season}

    Recommend the top 5 suitable crops.
    Output strictly valid JSON (no markdown, no backticks) as a list of objects matching this interface:
    {
      id: string,
      name: string,
      suitabilityScore: number,
      expectedYield: string,
      marketPrice: number,
      profitability: "high" | "medium" | "low",
      growthPeriod: string,
      waterRequirement: "low" | "medium" | "high",
      soilSuitability: number,
      marketDemand: number,
      riskLevel: "low" | "medium" | "high",
      advantages: string[],
      considerations: string[],
      bestPlantingTime: string,
      harvestTime: string
    }
  `

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()

    // Cleanup markdown if present
    text = text.replace(/```json/g, "").replace(/```/g, "").trim()

    return text
  } catch (error) {
    console.error("Gemini Recommendation Error:", error)
    return "Error"
  }
}

export async function getWeather(location: string) {
  // Mock response for weather
  return JSON.stringify({
    current: {
      temperature: 28 + Math.floor(Math.random() * 5),
      humidity: 70 + Math.floor(Math.random() * 20),
      rainfall: Math.random() > 0.7 ? 5 : 0,
      windSpeed: 10 + Math.floor(Math.random() * 10),
      pressure: 1010 + Math.floor(Math.random() * 10),
      uvIndex: Math.floor(Math.random() * 10),
      condition: Math.random() > 0.5 ? "Partly Cloudy" : "Sunny",
      icon: Math.random() > 0.5 ? "partly-cloudy" : "sunny",
      location: location,
      lastUpdated: "Just now",
    },
    forecast: Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        high: 30 + Math.floor(Math.random() * 5),
        low: 24 + Math.floor(Math.random() * 3),
        humidity: 60 + Math.floor(Math.random() * 20),
        rainfall: Math.random() * 10,
        windSpeed: 10 + Math.floor(Math.random() * 10),
        condition: Math.random() > 0.5 ? "Cloudy" : "Rain",
        icon: Math.random() > 0.5 ? "cloudy" : "rain",
        rainProbability: Math.floor(Math.random() * 100),
      };
    }),
    alerts: [],
  });
}
