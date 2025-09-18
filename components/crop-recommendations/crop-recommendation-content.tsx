"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SoilAnalysisForm } from "./soil-analysis-form"
import { RecommendationResults } from "./recommendation-results"
import { SeasonalCalendar } from "./seasonal-calendar"
import { MarketInsights } from "./market-insights"
import { Sprout, Calendar, TrendingUp, TestTube } from "lucide-react"

export interface SoilData {
  ph: number
  nitrogen: number
  phosphorus: number
  potassium: number
  organicMatter: number
  soilType: string
  rainfall: number
  temperature: number
  season: string
  location: string
}

export interface CropRecommendation {
  id: string
  name: string
  suitabilityScore: number
  expectedYield: string
  marketPrice: number
  profitability: "high" | "medium" | "low"
  growthPeriod: string
  waterRequirement: "low" | "medium" | "high"
  soilSuitability: number
  marketDemand: number
  riskLevel: "low" | "medium" | "high"
  advantages: string[]
  considerations: string[]
  bestPlantingTime: string
  harvestTime: string
}

export function CropRecommendationContent() {
  const [soilData, setSoilData] = useState<SoilData | null>(null)
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSoilAnalysis = async (data: SoilData) => {
    setIsAnalyzing(true)
    setSoilData(data)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock recommendations based on Kerala crops
    const mockRecommendations: CropRecommendation[] = [
      {
        id: "1",
        name: "Black Pepper",
        suitabilityScore: 92,
        expectedYield: "2-3 kg per vine",
        marketPrice: 450,
        profitability: "high",
        growthPeriod: "3-4 years to maturity",
        waterRequirement: "medium",
        soilSuitability: 95,
        marketDemand: 88,
        riskLevel: "low",
        advantages: [
          "High market value and demand",
          "Suitable for Kerala's climate",
          "Long-term profitable crop",
          "Can be intercropped with coconut",
        ],
        considerations: ["Requires initial investment", "Takes time to mature", "Needs proper support structures"],
        bestPlantingTime: "May-June (Pre-monsoon)",
        harvestTime: "December-February",
      },
      {
        id: "2",
        name: "Cardamom",
        suitabilityScore: 88,
        expectedYield: "50-100 kg per hectare",
        marketPrice: 1200,
        profitability: "high",
        growthPeriod: "2-3 years",
        waterRequirement: "high",
        soilSuitability: 85,
        marketDemand: 92,
        riskLevel: "medium",
        advantages: [
          "Premium spice with high value",
          "Thrives in Kerala's hill regions",
          "Strong export market",
          "Shade-tolerant crop",
        ],
        considerations: ["Requires specific altitude", "Susceptible to diseases", "Needs consistent moisture"],
        bestPlantingTime: "April-May",
        harvestTime: "October-December",
      },
      {
        id: "3",
        name: "Coconut",
        suitabilityScore: 85,
        expectedYield: "80-120 nuts per palm per year",
        marketPrice: 25,
        profitability: "medium",
        growthPeriod: "5-6 years to bearing",
        waterRequirement: "medium",
        soilSuitability: 90,
        marketDemand: 75,
        riskLevel: "low",
        advantages: [
          "Multiple products (water, oil, fiber)",
          "Long productive life (60+ years)",
          "Suitable for coastal areas",
          "Steady income source",
        ],
        considerations: ["Long gestation period", "Requires large space", "Vulnerable to cyclones"],
        bestPlantingTime: "May-June or September-October",
        harvestTime: "Year-round (monthly harvest)",
      },
      {
        id: "4",
        name: "Rice (Paddy)",
        suitabilityScore: 82,
        expectedYield: "4-6 tons per hectare",
        marketPrice: 20,
        profitability: "medium",
        growthPeriod: "3-4 months",
        waterRequirement: "high",
        soilSuitability: 88,
        marketDemand: 85,
        riskLevel: "medium",
        advantages: [
          "Staple food crop",
          "Suitable for wetlands",
          "Multiple varieties available",
          "Government support available",
        ],
        considerations: ["Water-intensive crop", "Pest and disease pressure", "Market price fluctuations"],
        bestPlantingTime: "May-June (Kharif) or November-December (Rabi)",
        harvestTime: "September-October or March-April",
      },
      {
        id: "5",
        name: "Banana",
        suitabilityScore: 78,
        expectedYield: "40-60 tons per hectare",
        marketPrice: 15,
        profitability: "medium",
        growthPeriod: "12-15 months",
        waterRequirement: "high",
        soilSuitability: 80,
        marketDemand: 82,
        riskLevel: "medium",
        advantages: ["Quick returns", "High productivity", "Multiple varieties", "Good local market"],
        considerations: ["Susceptible to wind damage", "Requires regular irrigation", "Post-harvest handling critical"],
        bestPlantingTime: "February-March or September-October",
        harvestTime: "Year-round depending on variety",
      },
    ]

    setRecommendations(mockRecommendations)
    setIsAnalyzing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Crop Recommendation Engine</h1>
        <p className="text-muted-foreground text-pretty">
          Get AI-powered crop suggestions based on your soil conditions, climate, and market trends in Kerala.
        </p>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Soil Analysis
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2" disabled={!recommendations.length}>
            <Sprout className="h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Seasonal Calendar
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Market Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis">
          <SoilAnalysisForm onSubmit={handleSoilAnalysis} isAnalyzing={isAnalyzing} />
        </TabsContent>

        <TabsContent value="recommendations">
          {recommendations.length > 0 ? (
            <RecommendationResults recommendations={recommendations} soilData={soilData} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Sprout className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Recommendations Yet</h3>
                <p className="text-muted-foreground text-center">
                  Complete the soil analysis to get personalized crop recommendations for your farm.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="calendar">
          <SeasonalCalendar />
        </TabsContent>

        <TabsContent value="market">
          <MarketInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}
