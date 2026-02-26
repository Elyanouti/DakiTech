'use client'

import React, { Suspense } from "react";
import ChatInterface from "@/components/ChatInterface";
import { useSearchParams } from "next/navigation";

function ChatPageContent() {
  const searchParams = useSearchParams();
  const agent_id = searchParams.get("agent_id");

  if (!agent_id) {
    return (
      <>
        <div className="animated-wave-background"></div>
        <div className="chat-container">
          <div style={{
            backgroundColor: 'rgba(45, 55, 72, 0.9)', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            margin: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#7f1d1d',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg style={{width: '32px', height: '32px', color: '#fca5a5'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 style={{fontSize: '20px', fontWeight: 'bold', color: '#fde047', marginBottom: '8px'}}>ID de l'agent manquant</h2>
            <p style={{color: '#e2e8f0', marginBottom: '16px'}}>Veuillez fournir l'ID de l'agent dans l'URL pour continuer</p>
            <p style={{fontSize: '14px', color: '#cbd5e1'}}>Exemple: /chat?agent_id=123</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="animated-wave-background"></div>
      <div className="chat-container">
        <ChatInterface agent_id={agent_id} />
      </div>
    </>
  );
}

export default function PublicChatPage() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        @keyframes colorWave {
          0% { 
            background-position: 0% 50%; 
          }
          25% { 
            background-position: 100% 0%; 
          }
          50% { 
            background-position: 100% 100%; 
          }
          75% { 
            background-position: 0% 100%; 
          }
          100% { 
            background-position: 0% 50%; 
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animated-wave-background {
          background: linear-gradient(45deg, #0f172a, #1e293b, #334155, #475569, #64748b, #94a3b8, #64748b, #475569, #334155, #1e293b, #0f172a);
          background-size: 600% 600%;
          animation: colorWave 6s ease-in-out infinite;
          min-height: 100vh;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: -1;
        }
        
        .chat-container {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
      `}</style>
      <Suspense fallback={
        <>
          <div className="animated-wave-background"></div>
          <div className="chat-container">
            <div style={{
              backgroundColor: 'rgba(45, 55, 72, 0.9)', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              padding: '32px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '2px solid #fbbf24',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px'
              }}></div>
              <p style={{color: '#fde047'}}>Chargement...</p>
            </div>
          </div>
        </>
      }>
        <ChatPageContent />
      </Suspense>
    </>
  );
}
