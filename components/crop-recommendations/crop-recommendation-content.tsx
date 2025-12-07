"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SoilAnalysisForm } from "./soil-analysis-form"
import { RecommendationResults } from "./recommendation-results"
import { SeasonalCalendar } from "./seasonal-calendar"
import { MarketInsights } from "./market-insights"
import { Sprout, Calendar, TrendingUp, TestTube } from "lucide-react"
import { getCropRecommendations } from "@/app/actions"
import { toast } from "sonner"

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

    try {
      const response = await getCropRecommendations(data)
      if (response === "Error") {
        toast.error("Failed to generate recommendations")
        return
      }

      const parsedRecommendations: CropRecommendation[] = JSON.parse(response)
      setRecommendations(parsedRecommendations)
    } catch (error) {
      console.error("Recommendation Error:", error)
      toast.error("An error occurred while analyzing data")
    } finally {
      setIsAnalyzing(false)
    }
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
