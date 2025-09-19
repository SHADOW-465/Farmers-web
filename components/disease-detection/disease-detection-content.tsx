"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ImageUpload } from "./image-upload"
import { DetectionResults } from "./detection-results"
import { DetectionHistory } from "./detection-history"
import { Camera, Upload, History, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface DetectionResult {
  id: string
  disease: string
  confidence: number
  severity: "low" | "medium" | "high"
  treatment: string[]
  prevention: string[]
  imageUrl: string
  timestamp: Date
  cropType: string
}

export function DiseaseDetectionContent() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  // Mock detection history
  const detectionHistory: DetectionResult[] = [
    {
      id: "1",
      disease: "Leaf Blight",
      confidence: 92,
      severity: "high",
      treatment: ["Apply copper-based fungicide", "Remove affected leaves", "Improve air circulation"],
      prevention: ["Regular pruning", "Avoid overhead watering", "Apply preventive fungicide spray"],
      imageUrl: "/diseased-rice-leaf.jpg",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      cropType: "Rice",
    },
    {
      id: "2",
      disease: "Healthy Plant",
      confidence: 96,
      severity: "low",
      treatment: [],
      prevention: ["Continue current care routine", "Monitor regularly"],
      imageUrl: "/healthy-coconut-palm.jpg",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      cropType: "Coconut",
    },
  ]

  const handleImageUpload = useCallback(async (file: File) => {
    setIsAnalyzing(true)
    setUploadedImage(URL.createObjectURL(file))

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock result based on file name or random
    const mockResults: Omit<DetectionResult, "id" | "timestamp" | "imageUrl">[] = [
      {
        disease: "Brown Spot",
        confidence: 87,
        severity: "medium",
        treatment: [
          "Apply propiconazole-based fungicide",
          "Ensure proper field drainage",
          "Remove infected plant debris",
        ],
        prevention: ["Use resistant varieties", "Maintain proper plant spacing", "Apply balanced fertilization"],
        cropType: "Rice",
      },
      {
        disease: "Healthy Plant",
        confidence: 94,
        severity: "low",
        treatment: [],
        prevention: ["Continue current care routine", "Regular monitoring"],
        cropType: "Pepper",
      },
    ]

    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
    const result: DetectionResult = {
      ...randomResult,
      id: Date.now().toString(),
      timestamp: new Date(),
      imageUrl: URL.createObjectURL(file),
    }

    setCurrentResult(result)
    setIsAnalyzing(false)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Info className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">AI Disease Detection</h1>
        <p className="text-muted-foreground text-pretty">
          Upload photos of your crops to get instant AI-powered disease identification and treatment recommendations.
        </p>
      </div>

      <Tabs defaultValue="scan" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scan" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            New Scan
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Plant Image
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the affected plant part. Ensure good lighting and focus on the problem area.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
                {isAnalyzing && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Analyzing image...</span>
                      <span>Processing</span>
                    </div>
                    <Progress value={66} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Our AI is examining your plant image for disease patterns
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card>
              <CardHeader>
                <CardTitle>Photography Tips</CardTitle>
                <CardDescription>Get the best results from your disease detection scan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium">Clear Focus</p>
                      <p className="text-xs text-muted-foreground">
                        Ensure the affected area is in sharp focus and well-lit
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium">Close-up Shot</p>
                      <p className="text-xs text-muted-foreground">
                        Fill the frame with the leaf or affected plant part
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium">Natural Light</p>
                      <p className="text-xs text-muted-foreground">
                        Use natural daylight for accurate color representation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                      4
                    </div>
                    <div>
                      <p className="text-sm font-medium">Multiple Angles</p>
                      <p className="text-xs text-muted-foreground">
                        Take photos from different angles for better analysis
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {currentResult && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Detection Results
                    <Badge variant={getSeverityColor(currentResult.severity)} className="flex items-center gap-1">
                      {getSeverityIcon(currentResult.severity)}
                      {currentResult.severity.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <Badge variant="outline">{currentResult.confidence}% confidence</Badge>
                </div>
                <CardDescription>AI analysis completed for {currentResult.cropType}</CardDescription>
              </CardHeader>
              <CardContent>
                <DetectionResults result={currentResult} />
              </CardContent>
            </Card>
          )}

          {/* Alert for severe cases */}
          {currentResult && currentResult.severity === "high" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Immediate Action Required</AlertTitle>
              <AlertDescription>
                This disease can spread rapidly and cause significant crop damage. Please implement the recommended
                treatments immediately and consider consulting with a local agricultural extension officer.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="history">
          <DetectionHistory history={detectionHistory} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
