'use client';

import React, { useEffect, useRef } from 'react';

type Skill = {
  name: string;
  level: number; // 1-10
  category: 'backend' | 'frontend' | 'devops' | 'database' | 'tools';
};

const skills: Skill[] = [
  { name: 'Python', level: 9, category: 'backend' },
  { name: 'Flask', level: 9, category: 'backend' },
  { name: 'Django', level: 8, category: 'backend' },
  { name: 'FastAPI', level: 7, category: 'backend' },
  { name: 'SQL', level: 8, category: 'database' },
  { name: 'Docker', level: 8, category: 'devops' },
  { name: 'Kubernetes', level: 7, category: 'devops' },
  { name: 'AWS', level: 7, category: 'devops' },
  { name: 'CI/CD', level: 8, category: 'devops' },
  { name: 'Monitoring', level: 9, category: 'devops' },
  { name: 'JavaScript', level: 7, category: 'frontend' },
  { name: 'TypeScript', level: 6, category: 'frontend' },
  { name: 'React', level: 6, category: 'frontend' },
  { name: 'Git', level: 8, category: 'tools' },
];

export default function SkillsVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Colors for different categories
    const categoryColors = {
      backend: '#0c8de0', // primary-500
      frontend: '#14b8a6', // secondary-500
      devops: '#8b5cf6', // purple
      database: '#f59e0b', // amber
      tools: '#ec4899', // pink
    };
    
    // Create skill nodes
    const nodes = skills.map((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const radius = (skill.level / 10) * (Math.min(canvas.width, canvas.height) * 0.35);
      
      return {
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        radius: 30 + (skill.level * 2),
        skill,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
      };
    });
    
    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.2)'; // gray-400 with opacity
      ctx.lineWidth = 1;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
          }
        }
      }
      
      ctx.stroke();
      
      // Draw nodes
      nodes.forEach(node => {
        // Move nodes slightly
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < node.radius || node.x > canvas.width - node.radius) {
          node.vx *= -1;
        }
        if (node.y < node.radius || node.y > canvas.height - node.radius) {
          node.vy *= -1;
        }
        
        // Draw node
        ctx.beginPath();
        ctx.fillStyle = categoryColors[node.skill.category];
        ctx.globalAlpha = 0.8;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw text
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px var(--font-geist-sans)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.skill.name, node.x, node.y);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full min-h-[300px]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
} 