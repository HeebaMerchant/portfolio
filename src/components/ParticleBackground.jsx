import React, { useEffect, useRef } from 'react';

const InteractiveTextParticles = ({ text, fontSize = '15vw' }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class for each dot
    class Particle {
      constructor(x, y, color = 'rgba(114, 114, 114, 0.8)') {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 20;
        this.size = 2;
        this.color = color;
      }

      update() {
        let dx = mouseRef.current.x - this.x;
        let dy = mouseRef.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 100;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Create particles from text
    const createTextParticles = () => {
      particlesRef.current = [];
      
      // Set up text properties
      const fontSize = parseInt(window.innerWidth * 0.15); // 15vw
      ctx.font = `${fontSize}px 'Protest Guerrilla', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      
      // Draw text to canvas temporarily
      const textParts = text.split('\n');
      const lineHeight = fontSize * 0.9;
      const totalHeight = textParts.length * lineHeight;
      const startY = (canvas.height - totalHeight) / 2 + lineHeight / 2;
      
      // Draw each line
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      textParts.forEach((part, index) => {
        const y = startY + index * lineHeight;
        ctx.fillText(part, canvas.width / 2, y);
      });
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create particles from text pixels
      const gap = 3; // Sampling gap
      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];
          
          if (alpha > 128) { // If pixel is visible
            particlesRef.current.push(new Particle(x, y));
          }
        }
      }
    };
    
    createTextParticles();

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.x = -999;
      mouseRef.current.y = -999;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text]);

  return (
    <canvas 
      ref={canvasRef} 
      className="interactive-text-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        cursor: 'pointer'
      }}
    />
  );
};

export default InteractiveTextParticles;