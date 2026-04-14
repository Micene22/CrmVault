import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';
import './App.css';

const categoryStyles = {
  'Codici Front-End': { bg: '#5D1C6A', accent: '#03a9f4', icon: '🎨' },
  'Codici Back-End': { bg: '#CA5995', accent: '#4caf50', icon: '⚙️' },
  'Link': { bg: '#FFB090', accent: '#ff9800', icon: '🔗' },
  'Tool Utili': { bg: '#f3e5f5', accent: '#9c27b0', icon: '🛠️' },
};

function App() {
  const [resources, setResources] = useState([]);
  const vantaRef = useRef(null);

  // useEffect per recuperare i dati dal backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/resources/')
      .then(res => setResources(res.data))
      .catch(err => console.log("Errore API:", err));
  }, []);

  // Vanta.js OTTIMIZZATO: Niente useState per evitare lag e surriscaldamento
  useEffect(() => {
    let vantaEffect;

    const timeoutId = setTimeout(() => {
      vantaEffect = GLOBE({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xff3f81,        
        backgroundColor: 0x1E1548, // <-- Corretto il formato del colore qui!
        size: 1.50
      });
    }, 100);
    
    // Pulisce l'effetto e spegne il 3D quando si chiude/ricarica
    return () => {
      clearTimeout(timeoutId);
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []); // <-- L'array vuoto garantisce che l'animazione parta 1 sola volta

  const categories = [...new Set(resources.map(item => item.category_name))];

  return (
    <div ref={vantaRef} style={{ padding: '40px', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Testo h1 messo bianco per spiccare sullo sfondo blu scuro */}
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#FFF', position: 'relative', zIndex: 1 }}>
        🏛️ Le Stack Che Conosco
      </h1>
      
      <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          justifyContent: 'center', 
          margin: '0 auto',
          gap: '40px',
          maxWidth: '1100px',
          width: '100%',
          padding: '20px',
          boxSizing: 'border-box',
          position: 'relative', 
          zIndex: 1             
        }}>
        {categories.map(cat => {
          const style = categoryStyles[cat] || { bg: '#fff', accent: '#333', icon: '🔗' };
          
          return (
            <div 
              key={cat} 
              className="card-container" 
              style={{ 
                borderRadius: '20px', 
                borderTop: `8px solid ${style.accent}`, 
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)', // Resa l'ombra leggermente più scura per staccare dal blu
              }}
            >
              <div className="card-content" style={{ textAlign: 'left', width: '100%', position: 'relative', zIndex: 2 }}> 
                <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#F3F4F4' }}>
                  {style.icon} {cat}
                </h2>

                {resources.filter(r => r.category_name === cat).map(link => (
                  <a 
                    key={link.id}
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ 
                      display: 'block', 
                      background: 'rgba(255,255,255,0.1)', 
                      padding: '15px', 
                      borderRadius: '10px', 
                      marginBottom: '10px',  
                      color: 'white', 
                      textDecoration: 'none',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  >
                    <strong style={{ display: 'block' }}>{link.title}</strong>
                    <p style={{ fontSize: '0.8em', margin: '5px 0 0', opacity: 0.8 }}>{link.description}</p>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
// http://localhost:3000/
// http://127.0.0.1:8000/admin/
// http://127.0.0.1:8000/api/resources/
//
//per il server
// macbook@Micene CRM % source venv/bin/activate
// (venv) macbook@Micene CRM % python3 manage.py runserver

// per il front end
// su frontend
//npm start