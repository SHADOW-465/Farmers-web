"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, Bot, User, Leaf, Lightbulb, AlertCircle, TrendingUp, Droplets } from "lucide-react"
import { getChatResponse } from "@/app/actions"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  type?: "text" | "suggestion" | "alert" | "analysis"
}

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  prompt: string
  category: string
}

export function ChatContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI farming assistant. I can help you with crop recommendations, disease identification, weather analysis, market insights, and farming best practices. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions: QuickAction[] = [
    {
      id: "1",
      label: "Crop Recommendations",
      icon: <Leaf className="h-4 w-4" />,
      prompt: "What crops should I plant this season based on my soil and weather conditions?",
      category: "Planning",
    },
    {
      id: "2",
      label: "Disease Diagnosis",
      icon: <AlertCircle className="h-4 w-4" />,
      prompt: "My plants are showing unusual symptoms. Can you help me identify the disease?",
      category: "Health",
    },
    {
      id: "3",
      label: "Weather Insights",
      icon: <Droplets className="h-4 w-4" />,
      prompt: "How will the upcoming weather affect my crops and what should I do?",
      category: "Weather",
    },
    {
      id: "4",
      label: "Market Analysis",
      icon: <TrendingUp className="h-4 w-4" />,
      prompt: "What are the current market trends for my crops and when should I sell?",
      category: "Market",
    },
    {
      id: "5",
      label: "Best Practices",
      icon: <Lightbulb className="h-4 w-4" />,
      prompt: "What are the best organic farming practices for Kerala climate?",
      category: "Tips",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const history = messages.map((m) => ({
        role: m.sender === "assistant" ? "model" : "user",
        parts: m.content,
      }))

      const responseText = await getChatResponse(history, content.trim())

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "assistant",
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Chat Error:", error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I am having trouble connecting to the server. Please try again later.",
        sender: "assistant",
        timestamp: new Date(),
        type: "alert",
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">AI Farming Assistant</h1>
        <p className="text-muted-foreground">Get instant help with your farming questions and decisions</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 px-6">
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "assistant" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>

                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              <Separator />

              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about farming..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  className="w-full justify-start h-auto p-3 text-left bg-transparent"
                  onClick={() => handleQuickAction(action)}
                  disabled={isTyping}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{action.icon}</div>
                    <div>
                      <div className="font-medium text-sm">{action.label}</div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{action.prompt}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Badge variant="secondary" className="w-full justify-start">
                  <Leaf className="h-3 w-3 mr-2" />
                  Crop Recommendations
                </Badge>
                <Badge variant="secondary" className="w-full justify-start">
                  <AlertCircle className="h-3 w-3 mr-2" />
                  Disease Diagnosis
                </Badge>
                <Badge variant="secondary" className="w-full justify-start">
                  <Droplets className="h-3 w-3 mr-2" />
                  Weather Analysis
                </Badge>
                <Badge variant="secondary" className="w-full justify-start">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  Market Insights
                </Badge>
                <Badge variant="secondary" className="w-full justify-start">
                  <Lightbulb className="h-3 w-3 mr-2" />
                  Best Practices
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Be specific about your location and crop type for better recommendations</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Include photos or detailed descriptions when asking about plant problems</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Ask follow-up questions to get more detailed guidance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
