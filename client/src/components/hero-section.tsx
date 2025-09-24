import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function HeroSection() {
  const { t } = useLanguage();
  const [currentNumber, setCurrentNumber] = useState(8);

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
            <div className="number-circle mx-auto">
              <span>{currentNumber}</span>
            </div>
            {/* Surrounding numbers with rotation */}
            <div className="absolute inset-0 flex items-center justify-center animate-spin" style={{animationDuration: '20s'}}>
              <div className="absolute text-2xl font-bold text-primary" style={{top: '10%', left: '50%', transform: 'translateX(-50%)'}}>1</div>
              <div className="absolute text-2xl font-bold text-primary" style={{top: '20%', right: '20%'}}>2</div>
              <div className="absolute text-2xl font-bold text-primary" style={{top: '50%', right: '5%'}}>3</div>
              <div className="absolute text-2xl font-bold text-primary" style={{bottom: '20%', right: '20%'}}>4</div>
              <div className="absolute text-2xl font-bold text-primary" style={{bottom: '10%', left: '50%', transform: 'translateX(-50%)'}}>5</div>
              <div className="absolute text-2xl font-bold text-primary" style={{bottom: '20%', left: '20%'}}>6</div>
              <div className="absolute text-2xl font-bold text-primary" style={{top: '50%', left: '5%'}}>7</div>
              <div className="absolute text-2xl font-bold text-primary" style={{top: '20%', left: '20%'}}>9</div>
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
