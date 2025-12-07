"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrentWeather } from "./current-weather"
import { WeatherForecast } from "./weather-forecast"
import { FarmingAlerts } from "./farming-alerts"
import { IrrigationRecommendations } from "./irrigation-recommendations"
import { WeatherHistory } from "./weather-history"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CloudRain, Calendar, Droplets, AlertTriangle, BarChart3, Search } from "lucide-react"
import { getWeather } from "@/app/actions"

export interface WeatherData {
  current: {
    temperature: number
    humidity: number
    rainfall: number
    windSpeed: number
    pressure: number
    uvIndex: number
    condition: string
    icon: string
    location: string
    lastUpdated: string
  }
  forecast: Array<{
    date: string
    day: string
    high: number
    low: number
    humidity: number
    rainfall: number
    windSpeed: number
    condition: string
    icon: string
    rainProbability: number
  }>
  alerts: Array<{
    id: string
    type: "weather" | "farming" | "irrigation"
    severity: "low" | "medium" | "high"
    title: string
    description: string
    action: string
    validUntil: string
  }>
}

export function WeatherAnalyticsContent() {
  const [location, setLocation] = useState("Kochi, Kerala")
  // Mock weather data for Kerala
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: {
      temperature: 28,
      humidity: 78,
      rainfall: 0,
      windSpeed: 12,
      pressure: 1013,
      uvIndex: 7,
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
      location: "Kochi, Kerala",
      lastUpdated: "2 minutes ago",
    },
    forecast: [
      {
        date: "2024-01-15",
        day: "Today",
        high: 30,
        low: 24,
        humidity: 75,
        rainfall: 2,
        windSpeed: 15,
        condition: "Light Rain",
        icon: "light-rain",
        rainProbability: 60,
      },
      {
        date: "2024-01-16",
        day: "Tomorrow",
        high: 29,
        low: 23,
        humidity: 80,
        rainfall: 8,
        windSpeed: 18,
        condition: "Moderate Rain",
        icon: "moderate-rain",
        rainProbability: 85,
      },
      {
        date: "2024-01-17",
        day: "Wednesday",
        high: 27,
        low: 22,
        humidity: 85,
        rainfall: 15,
        windSpeed: 22,
        condition: "Heavy Rain",
        icon: "heavy-rain",
        rainProbability: 95,
      },
      {
        date: "2024-01-18",
        day: "Thursday",
        high: 26,
        low: 21,
        humidity: 88,
        rainfall: 25,
        windSpeed: 25,
        condition: "Thunderstorm",
        icon: "thunderstorm",
        rainProbability: 90,
      },
      {
        date: "2024-01-19",
        day: "Friday",
        high: 28,
        low: 23,
        humidity: 75,
        rainfall: 5,
        windSpeed: 16,
        condition: "Scattered Showers",
        icon: "scattered-showers",
        rainProbability: 70,
      },
      {
        date: "2024-01-20",
        day: "Saturday",
        high: 31,
        low: 25,
        humidity: 70,
        rainfall: 0,
        windSpeed: 12,
        condition: "Partly Cloudy",
        icon: "partly-cloudy",
        rainProbability: 30,
      },
      {
        date: "2024-01-21",
        day: "Sunday",
        high: 32,
        low: 26,
        humidity: 65,
        rainfall: 0,
        windSpeed: 10,
        condition: "Sunny",
        icon: "sunny",
        rainProbability: 10,
      },
    ],
    alerts: [
      {
        id: "1",
        type: "weather",
        severity: "high",
        title: "Heavy Rainfall Warning",
        description: "Heavy rainfall expected for the next 48 hours. Rainfall amounts of 50-100mm possible.",
        action: "Ensure proper drainage in fields and protect young plants",
        validUntil: "2024-01-18T23:59:59Z",
      },
      {
        id: "2",
        type: "farming",
        severity: "medium",
        title: "Harvest Advisory",
        description: "Consider harvesting mature crops before the heavy rain period begins.",
        action: "Harvest ready crops in the next 24 hours if possible",
        validUntil: "2024-01-16T18:00:00Z",
      },
      {
        id: "3",
        type: "irrigation",
        severity: "low",
        title: "Irrigation Pause",
        description: "Natural rainfall will be sufficient for the next week. Pause irrigation systems.",
        action: "Turn off irrigation systems to conserve water and prevent overwatering",
        validUntil: "2024-01-22T00:00:00Z",
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Weather Analytics Dashboard</h1>
        <p className="text-muted-foreground text-pretty">
          Real-time weather data, forecasts, and farming-specific recommendations for Kerala.
        </p>
      </div>

      <div className="flex gap-2 w-full max-w-sm">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter City/Village"
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                const data = await getWeather(location)
                setWeatherData(JSON.parse(data))
              }
            }}
          />
          <Button onClick={async () => {
             const data = await getWeather(location)
             setWeatherData(JSON.parse(data))
          }}>
            <Search className="h-4 w-4" />
          </Button>
      </div>

      {/* Current Weather Overview */}
      <CurrentWeather data={weatherData.current} />

      <Tabs defaultValue="forecast" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="forecast" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            7-Day Forecast
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Farm Alerts
          </TabsTrigger>
          <TabsTrigger value="irrigation" className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Irrigation
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <CloudRain className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forecast">
          <WeatherForecast forecast={weatherData.forecast} />
        </TabsContent>

        <TabsContent value="alerts">
          <FarmingAlerts alerts={weatherData.alerts} />
        </TabsContent>

        <TabsContent value="irrigation">
          <IrrigationRecommendations weatherData={weatherData} />
        </TabsContent>

        <TabsContent value="history">
          <WeatherHistory />
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Weather Insights</CardTitle>
              <CardDescription>AI-powered analysis of weather patterns for your farm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CloudRain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Weather Insights Coming Soon</h3>
                <p className="text-muted-foreground">
                  Advanced weather pattern analysis and crop-specific recommendations will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
