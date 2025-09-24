import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { NumerologyCalculator } from "@/components/numerology-calculator";
import { CompatibilitySection } from "@/components/compatibility-section";
import { ReadingsHistory } from "@/components/readings-history";
import { useLanguage } from "@/hooks/use-language";
import { Eye } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <NumerologyCalculator />
      <CompatibilitySection />
      <ReadingsHistory />
      
      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Eye className="text-2xl text-primary" />
            <span className="text-xl font-serif font-bold text-primary">{t('site.title')}</span>
          </div>
          
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t('footer.description')}
          </p>
          
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <span>{t('footer.about')}</span>
            <span>{t('footer.privacy')}</span>
            <span>{t('footer.contact')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
