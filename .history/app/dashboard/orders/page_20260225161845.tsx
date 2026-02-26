"use client"

import { useState, useEffect } from "react"
import { getOrders } from '@/lib/ordersApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Phone, MapPin, Mail, FileText } from "lucide-react"

const agents = [
  { id: "ATLAS-DIGYBAZAR", name: "ATLAS - DIGYBAZAR" },
  { id: "YASSER-AVOCAT", name: "YASSER - AVOCAT" },
]

  // تعريف الحقول المختلفة لكل agent
  const getFieldsForAgent = (agent: string) => {
    switch (agent) {
      case "YASSER-AVOCAT":
        return [
          { key: "id", label: "ID", icon: FileText },
          { key: "nomComplet", label: "Nom Complet", icon: User },
          { key: "numeroTelephone", label: "Numéro de Téléphone", icon: Phone },
          { key: "adresse", label: "Adresse", icon: MapPin },
          { key: "description", label: "Description", icon: FileText },
          { key: "date", label: "Date", icon: FileText },
          { key: "status", label: "Status", icon: FileText }
        ]
      case "ATLAS-DIGYBAZAR":
        return [
          { key: "id", label: "ID", icon: FileText },
          { key: "nomComplet", label: "Client", icon: User },
          { key: "numeroTelephone", label: "Numéro de Téléphone", icon: Phone },
          { key: "adresse", label: "Adresse", icon: MapPin },
          { key: "produit", label: "Produit", icon: FileText },
          { key: "prix", label: "Prix", icon: FileText },
          { key: "date", label: "Date", icon: FileText },
          { key: "status", label: "Status", icon: FileText }
        ]
      default:
        return [
          { key: "nomComplet", label: "Nom Complet", icon: User },
          { key: "numeroTelephone", label: "Numéro de Téléphone", icon: Phone },
          { key: "adresse", label: "Adresse", icon: MapPin },
          { key: "description", label: "Description", icon: FileText },
          { key: "date", label: "Date", icon: FileText },
          { key: "status", label: "Status", icon: FileText }
        ]
    }
  }

  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getOrders(selectedAgent)
      .then((data) => setOrderData(data || []))
      .catch(() => setOrderData([]))
      .finally(() => setIsLoading(false));
  }, [selectedAgent]);

export default function OrdersPage() {
  const [selectedAgent, setSelectedAgent] = useState("YASSER-AVOCAT")
  const [isLoading, setIsLoading] = useState(false)

  const handleAgentChange = (newAgent: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedAgent(newAgent)
      setIsLoading(false)
    }, 800) // تأخير 800ms لإظهار تأثير التحميل
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Orders</h2>
        <p className="text-gray-400 mt-1">Gérer les commandes et informations collectées</p>
      </div>

      {/* Agent Selection */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Sélectionner Agent</CardTitle>
          <CardDescription className="text-gray-400">Choisissez l'agent pour voir ses commandes</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedAgent} onValueChange={handleAgentChange}>
            <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="YASSER-AVOCAT" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {agents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id} className="text-white hover:bg-gray-600">
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Informations Collectées</CardTitle>
          <CardDescription className="text-gray-400">Liste des informations clients collectées par l'agent</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
                <span>Chargement des données...</span>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  {getFieldsForAgent(selectedAgent).map((field) => {
                    const IconComponent = field.icon
                    return (
                      <TableHead key={field.key} className="text-gray-300">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {field.label}
                        </div>
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData.filter(order => order.agent === selectedAgent).map((order) => (
                  <TableRow key={order.id} className="border-gray-700 hover:bg-gray-700/50">
                    {getFieldsForAgent(selectedAgent).map((field) => (
                      <TableCell key={field.key} className={field.key === "nomComplet" ? "text-white font-medium" : "text-gray-300"}>
                        {field.key === "status" ? (
                          order.status ? (
                            <Badge 
                              variant="secondary" 
                              className={
                                order.status === "Nouveau" ? "bg-blue-500/10 text-blue-400" :
                                order.status === "En cours" ? "bg-yellow-500/10 text-yellow-400" :
                                "bg-green-500/10 text-green-400"
                              }
                            >
                              {order.status}
                            </Badge>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )
                        ) : field.key === "description" ? (
                          <div className="truncate max-w-xs" title={(order as any)[field.key]}>
                            {(order as any)[field.key] || "-"}
                          </div>
                        ) : (
                          (order as any)[field.key] || "-"
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
