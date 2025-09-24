import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { LocalStorage } from "@/lib/storage";
import {
  calculateLifePath,
  calculateDestinyNumber,
  calculateSoulUrge,
  calculatePersonality,
  calculateBirthdayNumber,
  calculateAttitudeNumber,
  detectKarmicDebtNumbers,
  detectMasterNumbers,
  interpretations
} from "@/lib/numerology";
import type { NumerologyReading } from "@/lib/schema";

export function NumerologyCalculator() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [results, setResults] = useState<NumerologyReading | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !birthDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    
    try {
      // Calculate all numbers
      const lifePathNumber = calculateLifePath(birthDate);
      const destinyNumber = calculateDestinyNumber(fullName);
      const soulUrgeNumber = calculateSoulUrge(fullName);
      const personalityNumber = calculatePersonality(fullName);
      const birthdayNumber = calculateBirthdayNumber(birthDate);
      const attitudeNumber = calculateAttitudeNumber(birthDate);
      
      const karmicDebtNumbers = detectKarmicDebtNumbers(lifePathNumber, destinyNumber, soulUrgeNumber, personalityNumber);
      const masterNumbers = detectMasterNumbers(lifePathNumber, destinyNumber, soulUrgeNumber, personalityNumber);

      // Get interpretations
      const currentInterpretations = interpretations[language as keyof typeof interpretations] || interpretations.en;
      const interpretation = {
        lifePath: currentInterpretations.lifePath[lifePathNumber as keyof typeof currentInterpretations.lifePath] || "",
        destiny: currentInterpretations.destiny?.[destinyNumber as keyof typeof currentInterpretations.destiny] || "",
      };

      const reading: NumerologyReading = {
        id: `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fullName: fullName.trim(),
        birthDate,
        lifePathNumber,
        destinyNumber,
        soulUrgeNumber,
        personalityNumber,
        birthdayNumber,
        attitudeNumber,
        karmicDebtNumbers,
        masterNumbers,
        interpretation,
        timestamp: Date.now(),
      };

      setResults(reading);
      LocalStorage.saveReading(reading);
      
      toast({
        title: "Success!",
        description: "Your numerology reading has been calculated and saved.",
      });

      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate your reading. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section id="calculator" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-card-foreground mb-4">
            {t('calculator.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('calculator.subtitle')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-background border-border shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-numerology">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-semibold mb-2 block">
                      {t('form.fullName')}
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Michael Smith"
                      className="bg-input border-border"
                      required
                      data-testid="input-full-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate" className="text-sm font-semibold mb-2 block">
                      {t('form.birthDate')}
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="bg-input border-border"
                      required
                      data-testid="input-birth-date"
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    type="submit" 
                    disabled={isCalculating}
                    className="bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-colors gold-glow"
                    data-testid="button-calculate"
                  >
                    {isCalculating ? "Calculating..." : t('form.calculate')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Results Section */}
          {results && (
            <div id="results" className="mt-12 fade-in">
              <h3 className="text-3xl font-serif font-bold text-center mb-8 text-primary">
                {t('results.title')}
              </h3>
              
              {/* Core Numbers Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card className="bg-background border-border text-center hover:gold-glow transition-all duration-300 reading-card">
                  <CardContent className="p-6">
                    <div className="number-circle-small mx-auto mb-4">
                      <span data-testid="text-life-path-number">{results.lifePathNumber}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-primary mb-2">{t('numbers.lifePath')}</h4>
                    <p className="text-sm text-muted-foreground">{t('numbers.lifePathDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-background border-border text-center hover:gold-glow transition-all duration-300 reading-card">
                  <CardContent className="p-6">
                    <div className="number-circle-small mx-auto mb-4">
                      <span data-testid="text-destiny-number">{results.destinyNumber}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-primary mb-2">{t('numbers.destiny')}</h4>
                    <p className="text-sm text-muted-foreground">{t('numbers.destinyDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-background border-border text-center hover:gold-glow transition-all duration-300 reading-card">
                  <CardContent className="p-6">
                    <div className="number-circle-small mx-auto mb-4">
                      <span data-testid="text-soul-urge-number">{results.soulUrgeNumber}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-primary mb-2">{t('numbers.soulUrge')}</h4>
                    <p className="text-sm text-muted-foreground">{t('numbers.soulUrgeDesc')}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-background border-border text-center hover:gold-glow transition-all duration-300 reading-card">
                  <CardContent className="p-6">
                    <div className="number-circle-small mx-auto mb-4">
                      <span data-testid="text-personality-number">{results.personalityNumber}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-primary mb-2">{t('numbers.personality')}</h4>
                    <p className="text-sm text-muted-foreground">{t('numbers.personalityDesc')}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Numbers */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-background border-border">
                  <CardHeader>
                    <CardTitle className="text-primary">Additional Numbers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>{t('numbers.birthday')}</span>
                      <span className="text-primary font-bold text-xl" data-testid="text-birthday-number">{results.birthdayNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('numbers.attitude')}</span>
                      <span className="text-primary font-bold text-xl" data-testid="text-attitude-number">{results.attitudeNumber}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background border-border">
                  <CardHeader>
                    <CardTitle className="text-primary">Special Numbers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.masterNumbers.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Master Numbers:</span>
                        <div className="flex gap-2 mt-1">
                          {results.masterNumbers.map((num) => (
                            <span key={num} className="text-primary font-bold text-lg" data-testid={`text-master-${num}`}>
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {results.karmicDebtNumbers.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Karmic Debt:</span>
                        <div className="flex gap-2 mt-1">
                          {results.karmicDebtNumbers.map((num) => (
                            <span key={num} className="text-destructive font-bold text-lg" data-testid={`text-karmic-${num}`}>
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Detailed Interpretation */}
              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-primary">
                    {t('results.interpretation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6" data-testid="text-interpretation">
                  <div>
                    <h5 className="text-lg font-semibold text-primary mb-3">
                      {t('numbers.lifePath')} {results.lifePathNumber}
                    </h5>
                    <p className="text-foreground leading-relaxed">{results.interpretation.lifePath}</p>
                  </div>
                  {results.interpretation.destiny && (
                    <div>
                      <h5 className="text-lg font-semibold text-primary mb-3">
                        {t('numbers.destiny')} {results.destinyNumber}
                      </h5>
                      <p className="text-foreground leading-relaxed">{results.interpretation.destiny}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
