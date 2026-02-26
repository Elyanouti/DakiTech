"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import OrderFieldsSelector from "./OrderFieldsSelector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, FileText, X, Check, Copy, ExternalLink, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, name: "Setup Chat", description: "Configure chat interface settings" },
  { id: 2, name: "Setup Orders", description: "Select data to collect from orders" },
  { id: 3, name: "Setup RAG", description: "Configure knowledge base" },
]

export default function NewAgentPage() {
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [agentType, setAgentType] = useState<'ecommerce' | 'consulting' | 'support'>('ecommerce');
  const [currentStep, setCurrentStep] = useState(1)
  const [documents, setDocuments] = useState<string[]>([])
  const [ragMode, setRagMode] = useState<"upload" | "description">("upload")
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agentId, setAgentId] = useState<string>("")

  // Chat settings
  const [chatSettings, setChatSettings] = useState({
    username: "",
    profileImage: "",
    welcomeMessage: "",
  })

  // Order fields to collect
  const [orderFields, setOrderFields] = useState({
    fullName: true,
    phone: true,
    address: true,
    email: true,
    time: true,
    notes: false,
    company: false,
  })

  const addDocument = () => {
    setDocuments([...documents, `Document ${documents.length + 1}.pdf`])
  }

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index))
  }

  const nextStep = () => {
    if (!chatSettings.username.trim()) {
      setShowUsernameError(true);
      return;
    }
    setShowUsernameError(false);
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true);
    
    // محاكاة انتظار 3 ثوانٍ
    setTimeout(() => {
      // Send agent creation data to backend
      const agentData = {
        name: chatSettings.username,
        type: agentType,
        description: chatSettings.welcomeMessage,
        prompt: chatSettings.welcomeMessage,
        // يمكنك إضافة المزيد من الحقول حسب الحاجة
      };
      
      fetch("http://localhost:3001/api/agent/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agentData),
      })
        .then(res => res.json())
        .then(data => {
          setIsLoading(false);
          if (data.success && data.agent_id) {
            setAgentId(data.agent_id);
            setIsCompleted(true);
            setCurrentStep(4); // Move to completion step
          } else {
            alert("Error: " + (data.error || "Unknown error"));
          }
        })
        .catch(err => {
          setIsLoading(false);
          alert("Network error: " + err.message);
        });
    }, 3000); // انتظار 3 ثوانٍ
  }

  const copyToClipboard = () => {
    const url = `${window.location.origin}/chat?agent_id=${agentId}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  }

  const openChat = () => {
    const url = `/chat?agent_id=${agentId}`;
    window.open(url, "_blank");
  }

  return (
    <div className="p-6 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Creating Your Agent...</h3>
            <p className="text-gray-400">Please wait while we set up your AI agent</p>
          </div>
        </div>
      )}
      
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Create AI Agent</h2>
          <p className="text-muted-foreground mt-1">Build a custom AI agent with RAG capabilities</p>
        </div>

        <div className="space-y-0">
          {/* Step 1: Setup Chat */}
          <div className="relative">
            <div className="flex gap-4">
              {/* Circle with connecting line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition-colors z-10 bg-gray-600",
                    currentStep === 1 || isCompleted
                      ? "border-yellow-500 bg-gray-600 text-white"
                      : currentStep > 1
                        ? "border-yellow-500 bg-gray-600 text-white"
                        : "border-gray-300 bg-gray-600 text-gray-400",
                  )}
                >
                  {currentStep > 1 || isCompleted ? <Check className="h-5 w-5" /> : 1}
                </div>
                <div
                  className={cn(
                    "w-0.5 h-full",
                    currentStep > 1 || isCompleted ?
                      (currentStep > 2 || isCompleted ? "bg-yellow-500" : "bg-yellow-500") : "bg-gray-300"
                  )}
                />
              </div>

              {/* Title and Content */}
              <div className="flex-1 pb-8">
                <div
                  className={cn(
                    "mb-4 cursor-pointer",
                    currentStep === 1 ? "text-foreground" : currentStep > 1 ? "text-muted-foreground" : "text-gray-400",
                  )}
                  onClick={() => currentStep > 1 && setCurrentStep(1)}
                >
                  <h3 className="text-lg font-semibold">{steps[0].name}</h3>
                  <p className="text-sm text-muted-foreground">{steps[0].description}</p>
                </div>

                {currentStep === 1 && (
                  <Card className="border-l-4 border-l-[#fdda07]">
                    <CardHeader>
                      <CardTitle className="text-foreground">Chat Interface Settings</CardTitle>
                      <CardDescription>Configure how your chat interface will appear</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="username" className="flex items-center gap-2">
                          Agent Username
                          <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="username"
                            placeholder="e.g., SupportBot"
                            value={chatSettings.username}
                            onChange={(e) => {
                              setChatSettings({ ...chatSettings, username: e.target.value });
                              if (showUsernameError) setShowUsernameError(false);
                            }}
                            className="bg-background"
                          />
                          {showUsernameError && (
                            <span className="absolute left-0 top-full mt-1 text-xs text-red-500">Please fill in the agent username first</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">The display name for your agent in chat</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="profile-image">Profile Image</Label>
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="bg-background block w-full border rounded px-3 py-2"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setChatSettings({ ...chatSettings, profileImage: url });
                            }
                          }}
                        />
                        {chatSettings.profileImage && (
                          <img src={chatSettings.profileImage} alt="Avatar preview" className="mt-2 h-16 w-16 rounded-full object-cover border" />
                        )}
                        <p className="text-xs text-muted-foreground">Avatar image for your agent</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="welcome-message">Welcome Message</Label>
                        <Textarea
                          id="welcome-message"
                          placeholder="Hello! How can I help you today?"
                          value={chatSettings.welcomeMessage}
                          onChange={(e) => setChatSettings({ ...chatSettings, welcomeMessage: e.target.value })}
                          className="bg-background min-h-[100px]"
                        />
                        <p className="text-xs text-muted-foreground">First message users see when starting a chat</p>
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        {currentStep > 1 && (
                          <Button variant="outline" onClick={prevStep}>back</Button>
                        )}
                        <Button
                          onClick={nextStep}
                          className="bg-[#fdda07] text-white hover:bg-[#fdda07]/90"
                        >
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Setup Orders */}
          <div className="relative">
            <div className="flex gap-4">
              {/* Circle with connecting line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition-colors z-10 bg-gray-600",
                    currentStep === 2 || isCompleted
                      ? "border-yellow-500 bg-gray-600 text-white"
                      : currentStep > 2
                        ? "border-yellow-500 bg-gray-600 text-white"
                        : "border-gray-300 bg-gray-600 text-gray-400",
                  )}
                >
                  {currentStep > 2 || isCompleted ? <Check className="h-5 w-5" /> : 2}
                </div>
                <div
                  className={cn(
                    "w-0.5 h-full",
                    currentStep > 2 || isCompleted ? "bg-yellow-500" : "bg-gray-300"
                  )}
                />
              </div>

              {/* Title and Content */}
              <div className="flex-1 pb-8">
                <div
                  className={cn("mb-4", currentStep === 2 ? "cursor-pointer" : currentStep > 2 ? "cursor-pointer" : "")}
                  onClick={() => currentStep > 2 && setCurrentStep(2)}
                >
                  <h3
                    className={cn(
                      "text-lg font-semibold",
                      currentStep === 2
                        ? "text-foreground"
                        : currentStep > 2
                          ? "text-muted-foreground"
                          : "text-gray-400",
                    )}
                  >
                    {steps[1].name}
                  </h3>
                  <p
                    className={cn(
                      "text-sm",
                      currentStep === 2
                        ? "text-muted-foreground"
                        : currentStep > 2
                          ? "text-muted-foreground"
                          : "text-gray-400",
                    )}
                  >
                    {steps[1].description}
                  </p>
                </div>

                {currentStep === 2 && (
                  <Card className="border-l-4 border-l-[#fdda07]">
                    <CardHeader>
                      <CardTitle className="text-foreground">Order Data Collection</CardTitle>
                      <CardDescription>Select which information to collect in the orders page</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* New select and badges UI for order fields */}
                      <OrderFieldsSelector />

                      <div className="flex justify-end gap-3 pt-4">
                        {currentStep > 1 && (
                          <Button variant="outline" onClick={prevStep}>back</Button>
                        )}
                        <Button onClick={nextStep} className="bg-[#fdda07] text-white hover:bg-[#fdda07]/90">
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Setup RAG */}
          <div className="relative">
            <div className="flex gap-4">
              {/* Circle (no connecting line for last step) */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition-colors z-10 bg-gray-600",
                    currentStep === 3 || isCompleted
                      ? "border-yellow-500 bg-gray-600 text-white"
                      : currentStep > 3
                        ? "border-yellow-500 bg-gray-600 text-white"
                        : "border-gray-300 bg-gray-600 text-gray-400",
                  )}
                >
                  {currentStep > 3 || isCompleted ? <Check className="h-5 w-5" /> : 3}
                </div>
                {isCompleted && (
                  <div className="w-0.5 h-20 bg-yellow-500" />
                )}
              </div>

              {/* Title and Content */}
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className={cn("text-lg font-semibold", currentStep === 3 ? "text-foreground" : "text-gray-400")}>
                    {steps[2].name}
                  </h3>
                  <p className={cn("text-sm", currentStep === 3 ? "text-muted-foreground" : "text-gray-400")}>
                    {steps[2].description}
                  </p>
                </div>

                {currentStep === 3 && (
                  <Card className="border-l-4 border-l-[#fdda07]">
                    <CardHeader>
                      <CardTitle className="text-foreground">RAG Configuration</CardTitle>
                      <CardDescription>Configure your agent's knowledge base</CardDescription>
                      {/* Brand Name input before agent type selector */}
                      <div className="mb-4">
                        <Label htmlFor="brand-name" className="text-base font-medium mb-1 block">Brand Name</Label>
                        <Input
                          id="brand-name"
                          type="text"
                          placeholder="Enter your brand name"
                          className="max-w-xs"
                        />
                      </div>
                      <div className="flex gap-8 mt-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="agentType"
                            value="ecommerce"
                            checked={agentType === 'ecommerce'}
                            onChange={() => setAgentType('ecommerce')}
                            className="hidden"
                          />
                          <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400">
                            {agentType === 'ecommerce' && <span className="w-3 h-3 rounded-full bg-blue-600" />}
                          </span>
                          <span className="text-base">E-Commerce Agent</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="agentType"
                            value="consulting"
                            checked={agentType === 'consulting'}
                            onChange={() => setAgentType('consulting')}
                            className="hidden"
                          />
                          <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400">
                            {agentType === 'consulting' && <span className="w-3 h-3 rounded-full bg-blue-600" />}
                          </span>
                          <span className="text-base">Consulting Agent</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="agentType"
                            value="support"
                            checked={agentType === 'support'}
                            onChange={() => setAgentType('support')}
                            className="hidden"
                          />
                          <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400">
                            {agentType === 'support' && <span className="w-3 h-3 rounded-full bg-blue-600" />}
                          </span>
                          <span className="text-base">Web Support Agent</span>
                        </label>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label>Knowledge Base Method</Label>
                        <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50">
                          <button
                            onClick={() => setRagMode("upload")}
                            className={cn(
                              "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all",
                              ragMode === "upload"
                                ? "bg-[#fdda07] text-white shadow-sm"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <Upload className="h-4 w-4" />
                            Upload
                          </button>
                          <button
                            onClick={() => setRagMode("description")}
                            className={cn(
                              "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all",
                              ragMode === "description"
                                ? "bg-[#fdda07] text-white shadow-sm"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <FileText className="h-4 w-4" />
                            Description
                          </button>
                        </div>
                      </div>

                      {/* Upload Mode */}
                      {ragMode === "upload" && (
                        <div className="space-y-4">
                          <label
                            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#fdda07]/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2"
                            htmlFor="file-upload-input"
                          >
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-foreground font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-muted-foreground mt-1">PDF, TXT, MD, or DOCX (max 10MB)</p>
                            <input
                              id="file-upload-input"
                              type="file"
                              className="hidden"
                              onChange={e => {
                                if (e.target.files?.[0]) {
                                  setDocuments([...documents, e.target.files[0].name])
                                }
                              }}
                            />
                          </label>

                          {documents.length > 0 && (
                            <div className="space-y-2">
                              <Label>Uploaded Documents ({documents.length})</Label>
                              <div className="space-y-2">
                                {documents.map((doc, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                                  >
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm text-foreground">{doc}</span>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => removeDocument(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Description Mode */}
                      {ragMode === "description" && (
                        <div className="space-y-2">
                          <Label htmlFor="knowledge-description">Knowledge Base Description</Label>
                          <Textarea
                            id="knowledge-description"
                            placeholder="Describe the knowledge your agent should have..."
                            className="bg-background min-h-[200px]"
                          />
                          <p className="text-xs text-muted-foreground">
                            Provide detailed information about what your agent should know
                          </p>
                        </div>
                      )}

                      <div className="flex justify-end gap-3 pt-4">
                        {currentStep > 1 && (
                          <Button variant="outline" onClick={prevStep} disabled={isLoading}>back</Button>
                        )}
                        <Button 
                          onClick={handleSubmit} 
                          disabled={isLoading}
                          className="bg-[#fdda07] text-white hover:bg-[#fdda07]/90"
                        >
                          Create Agent
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Success Step - Show Agent Link */}
          {isCompleted && (
            <div className="relative">
              <div className="flex gap-4">
                {/* Success Icon */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-500 bg-yellow-500 text-black font-semibold">
                    <Check className="h-5 w-5" />
                  </div>
                </div>

                {/* Success Content */}
                <div className="flex-1">
                  <Card className="border-l-4 border-l-yellow-500 bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-green-400">Agent Created Successfully!</CardTitle>
                      <CardDescription className="text-green-300">Your AI agent is ready to use</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-yellow-400">Agent URL:</Label>
                        <div className="flex items-center gap-2 p-3 bg-gray-700 rounded-lg border border-gray-600">
                          <code className="flex-1 text-sm font-mono text-gray-200">
                            {`${window.location.origin}/chat?agent_id=${agentId}`}
                          </code>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={copyToClipboard}
                            title="Copy link"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={openChat}
                            title="Open chat"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-green-300">
                        Share this link with your users to start chatting with your AI agent.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
