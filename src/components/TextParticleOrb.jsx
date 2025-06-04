import React, { useEffect, useRef, useState } from 'react';
import './TextParticleOrb.css';

const TextParticleOrb = ({ text = "Heeba\nMerchant" }) => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create particles from text
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Draw text
    ctx.font = '150px "Protest Guerrilla", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    
    const lines = text.split('\n');
    const lineHeight = 150;
    const startY = (canvas.height - lines.length * lineHeight) / 2;
    
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + index * lineHeight + lineHeight / 2);
    });
    
    // Get text pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const particleData = [];
    
    // Sample pixels
    const gap = 4;
    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const index = (y * canvas.width + x) * 4;
        const alpha = data[index + 3];
        
        if (alpha > 128) {
          particleData.push({
            x: x - canvas.width / 2,
            y: y - canvas.height / 2,
            z: 0
          });
        }
      }
    }
    
    // Create style for animations
    const style = document.createElement('style');
    let keyframes = '';
    
    particleData.forEach((_, i) => {
      const z = Math.random() * 360;
      const y = Math.random() * 360;
      
      keyframes += `
        @keyframes orbit${i} {
          0% {
            opacity: 0;
            transform: translate3d(${particleData[i].x}px, ${particleData[i].y}px, 0);
          }
          20% {
            opacity: 1;
            transform: translate3d(${particleData[i].x}px, ${particleData[i].y}px, 0);
          }
          30% {
            transform: rotateZ(-${z}deg) rotateY(${y}deg) translateX(150px) rotateZ(${z}deg);
          }
          80% {
            transform: rotateZ(-${z}deg) rotateY(${y}deg) translateX(150px) rotateZ(${z}deg);
            opacity: 1;
          }
          100% {
            transform: rotateZ(-${z}deg) rotateY(${y}deg) translateX(400px) rotateZ(${z}deg);
            opacity: 0;
          }
        }
        
        .particle-${i} {
          animation: orbit${i} 14s infinite;
          animation-delay: ${i * 0.005}s;
        }
      `;
    });
    
    style.textContent = keyframes;
    style.id = 'particle-animations';
    
    // Remove existing style if it exists
    const existingStyle = document.getElementById('particle-animations');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    document.head.appendChild(style);
    
    // Create particles
    const particleElements = particleData.map((particle, i) => {
      const hue = (360 / particleData.length * i);
      return {
        id: i,
        hue: hue,
        x: particle.x,
        y: particle.y
      };
    });
    
    setParticles(particleElements);
    
    return () => {
      const style = document.getElementById('particle-animations');
      if (style) {
        style.remove();
      }
    };
  }, [text]);

  return (
    <div className="text-particle-orb-container">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="text-wrap" ref={wrapRef}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`text-particle particle-${particle.id}`}
            style={{
              backgroundColor: `hsla(${particle.hue}, 100%, 50%, 1)`,
              left: `${particle.x}px`,
              top: `${particle.y}px`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TextParticleOrb;