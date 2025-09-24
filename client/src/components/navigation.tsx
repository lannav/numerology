import { Link, useLocation } from "wouter";
import { Eye } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { LanguageSwitcher } from "./language-switcher";

export function Navigation() {
  const { t } = useLanguage();
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
          <Eye className="text-3xl text-primary" />
          <h1 className="text-2xl font-serif font-bold text-primary">
            {t('site.title')}
          </h1>
        </Link>
        
        <div className="flex items-center space-x-6">
          {location === '/' ? (
            <>
              <button 
                onClick={() => scrollToSection('calculator')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="button-calculator"
              >
                {t('nav.calculator')}
              </button>
              <button 
                onClick={() => scrollToSection('compatibility')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="button-compatibility"
              >
                {t('nav.compatibility')}
              </button>
              <button 
                onClick={() => scrollToSection('readings')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="button-readings"
              >
                {t('nav.readings')}
              </button>
            </>
          ) : (
            <>
              <Link href="/" className="text-foreground hover:text-primary transition-colors" data-testid="link-calculator">
                {t('nav.calculator')}
              </Link>
              <Link href="/" className="text-foreground hover:text-primary transition-colors" data-testid="link-compatibility">
                {t('nav.compatibility')}
              </Link>
              <Link href="/" className="text-foreground hover:text-primary transition-colors" data-testid="link-readings">
                {t('nav.readings')}
              </Link>
            </>
          )}
          
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
