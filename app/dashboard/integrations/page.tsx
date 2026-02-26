import Image from 'next/image'

export default function IntegrationsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Integrations</h2>
        <p className="text-gray-400">Connectez vos agents aux plateformes</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-3 rounded-lg">
                <Image 
                  src="/icons/whatsapp.png" 
                  alt="WhatsApp" 
                  width={24} 
                  height={24}
                  className="text-white"
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">WhatsApp Business</h3>
                <span className="text-green-400 text-sm">● Connecte</span>
              </div>
            </div>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Deconnecter
            </button>
          </div>
          <p className="text-gray-400 text-sm">Connectez votre agent a WhatsApp Business pour recevoir et repondre aux messages automatiquement.</p>
        </div>

        {/* Telegram */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Image 
                  src="/icons/telegram.png" 
                  alt="Telegram" 
                  width={24} 
                  height={24}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Telegram Bot</h3>
                <span className="text-gray-400 text-sm">● Deconnecte</span>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Connecter
            </button>
          </div>
          <p className="text-gray-400 text-sm">Integrez votre agent avec Telegram pour automatiser les conversations avec vos clients.</p>
        </div>

        {/* Instagram */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-pink-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-pink-500 p-3 rounded-lg">
                <Image 
                  src="/icons/instagram.png" 
                  alt="Instagram" 
                  width={24} 
                  height={24}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Instagram Business</h3>
                <span className="text-gray-400 text-sm">● Deconnecte</span>
              </div>
            </div>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
              Connecter
            </button>
          </div>
          <p className="text-gray-400 text-sm">Connectez Instagram Business pour gerer les messages directs et commentaires automatiquement.</p>
        </div>

        {/* Webhook */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-500 p-3 rounded-lg">
                <Image 
                  src="/icons/webhook.png" 
                  alt="Webhook" 
                  width={24} 
                  height={24}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Webhook</h3>
                <span className="text-gray-400 text-sm">● Deconnecte</span>
              </div>
            </div>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
              Connecter
            </button>
          </div>
          <p className="text-gray-400 text-sm">Configurez des webhooks pour recevoir des notifications en temps reel de vos systemes externes.</p>
        </div>

        {/* YouCan */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 p-3 rounded-lg">
                <Image 
                  src="/icons/youcan.png" 
                  alt="YouCan" 
                  width={24} 
                  height={24}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">YouCan Shop</h3>
                <span className="text-gray-400 text-sm">● Deconnecte</span>
              </div>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Connecter
            </button>
          </div>
          <p className="text-gray-400 text-sm">Integrez avec YouCan pour synchroniser les commandes et gerer votre boutique en ligne automatiquement.</p>
        </div>
      </div>
    </div>
  )
}