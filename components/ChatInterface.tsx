'use client'

import React, { useState, useEffect, useRef } from "react"

interface ChatInterfaceProps {
  agent_id: string
}

interface Message {
  role: 'user' | 'agent'
  content: string
}

export default function ChatInterface({ agent_id }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'agent',
      content: 'Bonjour ! Je suis Atlas. Comment puis-je vous aider aujourd\'hui ?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = input.trim()
      setInput('')
      setIsLoading(true)
      
      // إضافة رسالة المستخدم فوراً
      const newUserMessage: Message = { role: 'user', content: userMessage }
      setMessages(prev => [...prev, newUserMessage])

      // زيادة عداد الرسائل
      const currentMessageCount = messageCount + 1
      setMessageCount(currentMessageCount)

      // التحقق من عدد الرسائل لإعطاء ردود محددة مسبقاً
      if (currentMessageCount === 1) {
        // الرد الأول
        setTimeout(() => {
          const firstReplyMessage: Message = { 
            role: 'agent', 
            content: `Salut ! Je suis Atlas chez DIGYBAZAR. On a en ce moment un Pistolet de lavage et un nettoyant auto.

Que cherchez-vous exactement ? 🙂`
          }
          setMessages(prev => [...prev, firstReplyMessage])
          setIsLoading(false)
        }, 3000)
        return
      }
      
      if (currentMessageCount === 2) {
        // الرد الثاني مع تفاصيل المنتج
        setTimeout(() => {
          const secondReplyMessage: Message = { 
            role: 'agent', 
            content: `🚿 **PISTOLET DE LAVAGE - 129 DH**

✅ Capacité : 2 litres
✅ Buse réglable (jet fin/large)  
✅ Matériau résistant
✅ Poignée ergonomique

Idéal pour voitures, vitres et jardins !

👇 Voici le produit :`
          }
          setMessages(prev => [...prev, secondReplyMessage])
          
          // إضافة الصورة كرسالة منفصلة
          setTimeout(() => {
            const imageMessage: Message = {
              role: 'agent',
              content: `![Pistolet de lavage](product-image) 

💬 Qu'est-ce que vous en pensez ?`
            }
            setMessages(prev => [...prev, imageMessage])
          }, 500)
          
          setIsLoading(false)
        }, 3000)
        return
      }

      if (currentMessageCount === 3) {
        // الرد الثالث - تأكيد الطلب
        setTimeout(() => {
          const thirdReplyMessage: Message = { 
            role: 'agent', 
            content: `✅ Très bien !

Pour confirmer votre commande, merci de m'envoyer vos informations:

* Nom complet
* Numéro de téléphone  
* Adresse 😊`
          }
          setMessages(prev => [...prev, thirdReplyMessage])
          setIsLoading(false)
        }, 3000)
        return
      }

      if (currentMessageCount === 4) {
        // الرد الرابع - تأكيد نهائي وشكر
        setTimeout(() => {
          const fourthReplyMessage: Message = { 
            role: 'agent', 
            content: `🙏 Merci beaucoup !

Vos informations :
Nom complet : Ahmed
Numéro de téléphone : 0620741715
Adresse : Rabat

✅ Votre commande a été confirmée avec succès.

📞 Nous vous contacterons très prochainement pour finaliser la livraison.

Merci de faire confiance à DIGYBAZAR ! 💚`
          }
          setMessages(prev => [...prev, fourthReplyMessage])
          setIsLoading(false)
        }, 3000)
        return
      }

      // للرسائل الأخرى، استخدم الـ AI backend
      try {
        console.log('Envoi du message à:', 'http://localhost:3001/api/chat')
        console.log('Données:', {
          agent_id: agent_id,
          message: userMessage,
          session_id: `session_${Date.now()}`
        })

        // إرسال الرسالة إلى الـ backend
        const response = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            agent_id: agent_id,
            message: userMessage,
            session_id: `session_${Date.now()}`
          })
        })

        console.log('Réponse du serveur:', response.status, response.statusText)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Détails de l\'erreur:', errorText)
          throw new Error(`Erreur ${response.status}: ${errorText}`)
        }

        const data = await response.json()
        console.log('Données reçues:', data)
        
        // إضافة رد الوكيل
        const agentMessage: Message = { role: 'agent', content: data.reply || 'Aucune réponse reçue du serveur' }
        setMessages(prev => [...prev, agentMessage])
        
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error)
        // إضافة رسالة خطأ
        const errorMessage: Message = { 
          role: 'agent', 
          content: `Désolé, une erreur s'est produite: ${error instanceof Error ? error.message : 'erreur inconnue'}. Assurez-vous que le serveur fonctionne sur le port 3001.` 
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto h-[95vh] bg-black rounded-lg shadow-lg flex flex-col">
      <div className="bg-yellow-500 text-black p-3 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <img 
            src="/digybazar-logo.png" 
            alt="DIGYBAZAR Logo" 
            className="w-12 h-12 rounded-full object-cover"
          />
          <h2 className="text-xl font-bold">DIGYBAZAR</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-900">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-sm lg:max-w-lg px-3 py-2 rounded-lg ${
              message.role === 'user' 
                ? 'bg-yellow-500 text-black' 
                : 'bg-gray-700 text-yellow-200'
            }`}>
              {/* التحقق من وجود صورة في المحتوى */}
              {message.content.includes('![') ? (
                <div>
                  {/* عرض النص قبل الصورة */}
                  {message.content.split('![')[0] && (
                    <div className="mb-2 whitespace-pre-line">
                      {message.content.split('![')[0]}
                    </div>
                  )}
                  {/* عرض الصورة */}
                  {message.content.includes('](') && (
                    <div className="mb-2">
                      <img 
                        src="/pulverisateur.png" 
                        alt="Pistolet de lavage" 
                        className="w-full h-auto rounded-lg border border-gray-300"
                        style={{maxWidth: '250px'}}
                      />
                    </div>
                  )}
                  {/* عرض النص بعد الصورة */}
                  {message.content.includes(') ') && (
                    <div className="whitespace-pre-line">
                      {message.content.split(') ')[1]}
                    </div>
                  )}
                </div>
              ) : (
                <div className="whitespace-pre-line">{message.content}</div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-700 text-yellow-200">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
                <span>écrit...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-700 p-4 flex gap-2 bg-gray-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tapez votre message ici..."
          className="flex-1 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 text-yellow-200 placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black px-6 py-2 rounded-lg transition-colors font-semibold"
        >
          {isLoading ? 'Envoi...' : 'Envoyer'}
        </button>
      </div>
    </div>
  )
}