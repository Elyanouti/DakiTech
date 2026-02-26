import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Plus, MoreVertical } from "lucide-react"

const agents = [
  {
    id: "1",
    name: "Customer Support Agent",
    description: "Handles customer inquiries with RAG-powered knowledge base",
    status: "Active",
    model: "GPT-4",
    documents: 45,
    requests: "2.3K",
  },
  {
    id: "2",
    name: "Sales Assistant",
    description: "Helps qualify leads and answer product questions",
    status: "Active",
    model: "Claude 3",
    documents: 32,
    requests: "1.8K",
  },
  {
    id: "3",
    name: "Data Analyzer",
    description: "Analyzes business data and generates insights",
    status: "Idle",
    model: "GPT-4",
    documents: 18,
    requests: "892",
  },
  {
    id: "4",
    name: "Content Generator",
    description: "Creates marketing content based on brand guidelines",
    status: "Active",
    model: "Claude 3",
    documents: 67,
    requests: "3.1K",
  },
]

export default function AgentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">AI Agents</h2>
          <p className="text-muted-foreground mt-1">Create and manage your AI agents with RAG capabilities</p>
        </div>
        <Link href="/dashboard/agents/new">
          <Button className="bg-[var(--color-yellow-accent)] text-[var(--color-yellow-accent-foreground)] hover:bg-[var(--color-yellow-accent)]/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Bot className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">{agent.name}</CardTitle>
                    <CardDescription className="mt-1">{agent.description}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge
                    variant={agent.status === "Active" ? "default" : "secondary"}
                    className={agent.status === "Active" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""}
                  >
                    {agent.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{agent.model}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <p className="font-medium text-foreground">{agent.documents}</p>
                    <p className="text-xs text-muted-foreground">docs</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{agent.requests}</p>
                    <p className="text-xs text-muted-foreground">requests</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
