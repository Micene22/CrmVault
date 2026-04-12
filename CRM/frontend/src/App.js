import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categoryStyles = {
  'Codici Front-End': { bg: '#5D1C6A', accent: '#03a9f4', icon: '🎨' },
  'Codici Back-End': { bg: '#CA5995', accent: '#4caf50', icon: '⚙️' },
  'Link': { bg: '#FFB090', accent: '#ff9800', icon: '🔗' },
  'Tool Utili': { bg: '#f3e5f5', accent: '#9c27b0', icon: '🛠️' },
};

function App() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/resources/')
      .then(res => setResources(res.data))
      .catch(err => console.log("Errore API:", err));
  }, []);

  const categories = [...new Set(resources.map(item => item.category_name))];

  return (
    <div style={{ padding: '40px', backgroundColor: '#FFF1D3', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>🏛️ Le Stack Che Conosco</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
        {categories.map(cat => {
          const style = categoryStyles[cat] || { bg: '#fff', accent: '#333', icon: '🔗' };
          
          return (
            <div key={cat} style={{ background: style.bg, borderRadius: '20px', padding: '20px', borderTop: `8px solid ${style.accent}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
             <h2 style= {{ 
                   marginBottom: '20px', 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '10px',
                   color: '#F3F4F4' 
                   }}>
                {style.icon} {cat}
              </h2>

              {/* --- QUI INIZIA IL FILTRO PER I LINK --- */}
              {resources.filter(r => r.category_name === cat).map(link => (
                
                /* QUESTA È LA CARD NUOVA CHE HO ATTACCATO */
                <div 
                  key={link.id} 
                  style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '15px', 
                    marginBottom: '15px', 
                    transition: 'transform 0.2s ease', 
                    border: '1px solid #eee',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <strong style={{ display: 'block', fontSize: '1.1em', marginBottom: '5px', color: '#333' }}>
                    {link.title}
                  </strong>
                  
                  <a href={link.url} target="_blank" rel="noreferrer" style={{ color: style.accent, textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85em' }}>
                    Visita sito →
                  </a>
                  
                  <p style={{ color: '#666', fontSize: '0.9em', marginTop: '10px', lineHeight: '1.4' }}>
                    {link.description}
                  </p>
                </div>
                /* FINE DELLA CARD NUOVA */

              ))}
              {/* --- FINE DEL FILTRO --- */}

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