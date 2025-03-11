import React from 'react';
import Button from './Button';
import SkillsVisualizer from './SkillsVisualizer';

export default function Hero() {
  return (
    <section className="
      relative
      w-full min-h-screen
      flex flex-col items-center justify-center
      px-4 py-16 md:py-24
      bg-gradient-to-br from-white to-gray-100
      dark:from-gray-900 dark:to-gray-800
      overflow-hidden
    ">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/20 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200/20 dark:bg-secondary-900/20 rounded-full blur-3xl" />
      </div>
      
      <div className="
        container mx-auto max-w-6xl
        flex flex-col md:flex-row items-center
        gap-8 md:gap-16
        z-10
      ">
        <div className="flex-1">
          <h1 className="
            text-4xl md:text-5xl lg:text-6xl
            font-bold tracking-tight
            text-gray-900 dark:text-white
            mb-4
          ">
            Alexandre Vieira
          </h1>
          <h2 className="
            text-xl md:text-2xl
            font-medium
            text-primary-600 dark:text-primary-400
            mb-6
          ">
            Software Engineer
          </h2>
          <p className="
            text-gray-700 dark:text-gray-300
            text-lg
            mb-8
            max-w-xl
          ">
            Specialized in backend development and DevOps, with expertise in Python, Flask, Django, 
            and infrastructure monitoring. Passionate about building scalable, maintainable systems 
            that solve real-world problems.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary"
              href="#projects"
              size="lg"
            >
              View Projects
            </Button>
            <Button 
              variant="outline"
              href="#contact"
              size="lg"
            >
              Get in Touch
            </Button>
          </div>
        </div>
        
        <div className="flex-1 h-[400px] w-full">
          <SkillsVisualizer />
        </div>
      </div>
    </section>
  );
} 