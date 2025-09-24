import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function HeroSection() {
  const { t } = useLanguage();
  const [currentNumber, setCurrentNumber] = useState(8);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();

  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
      setCurrentNumber(randomNumber);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animate = () => {
      setRotation(prev => (prev + 0.5) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="pt-24 pb-16 stars-bg relative overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6 fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 fade-in">
            {t('hero.subtitle')}
          </p>
          
          {/* Mystical Number Wheel */}
          <div className="relative mx-auto w-80 h-80 mb-12 fade-in">
            {/* Main center number */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 number-circle z-10">
              <span>{currentNumber}</span>
            </div>
            
            {/* Perfect circular orbit */}
            <div className="absolute inset-0">
              {[1, 2, 3, 4, 5, 6, 7, 9].map((number, index) => {
                const baseAngle = (index * 45); // 8 numbers * 45 degrees = 360 degrees
                const currentAngle = (baseAngle + rotation) * (Math.PI / 180); // Convert to radians
                const radius = 140; // Distance from center
                const centerX = 160; // Half of container width (320px / 2)
                const centerY = 160; // Half of container height (320px / 2)
                
                const x = centerX + radius * Math.cos(currentAngle);
                const y = centerY + radius * Math.sin(currentAngle);
                
                return (
                  <div
                    key={number}
                    className="absolute text-2xl font-bold text-primary transition-all duration-75 ease-linear"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {number}
                  </div>
                );
              })}
            </div>
          </div>
          
          <Button 
            onClick={scrollToCalculator} 
            className="bg-primary text-primary-foreground px-8 py-3 text-lg font-semibold hover:bg-primary/90 transition-colors gold-glow"
            data-testid="button-get-reading"
          >
            {t('hero.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
