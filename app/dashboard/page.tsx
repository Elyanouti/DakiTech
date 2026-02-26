import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, FileText, Zap, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Active Agents",
    value: "12",
    change: "+2 this week",
    icon: Bot,
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+18% from last month",
    icon: FileText,
  },
  {
    title: "API Calls",
    value: "45.2K",
    change: "+12% from last month",
    icon: Zap,
  },
  {
    title: "Success Rate",
    value: "98.5%",
    change: "+2.1% from last month",
    icon: TrendingUp,
  },
]

const recentAgents = [
  {
    name: "Customer Support Agent",
    status: "Active",
    requests: "2.3K",
    lastActive: "2 minutes ago",
  },
  {
    name: "Sales Assistant",
    status: "Active",
    requests: "1.8K",
    lastActive: "5 minutes ago",
  },
  {
    name: "Data Analyzer",
    status: "Idle",
    requests: "892",
    lastActive: "1 hour ago",
  },
  {
    name: "Content Generator",
    status: "Active",
    requests: "3.1K",
    lastActive: "Just now",
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        <p className="text-gray-400 mt-1">Monitor your AI agents and platform performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Agents */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Agents</CardTitle>
          <CardDescription className="text-gray-400">Your most recently active AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAgents.map((agent) => (
              <div
                key={agent.name}
                className="flex items-center justify-between border-b border-gray-700 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500">
                    <Bot className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{agent.name}</p>
                    <p className="text-sm text-gray-400">{agent.lastActive}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{agent.requests}</p>
                    <p className="text-xs text-gray-400">requests</p>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      agent.status === "Active" ? "bg-yellow-500 text-black" : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {agent.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}