import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Users, Infinity } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { LocalStorage } from "@/lib/storage";
import {
  calculateLifePath,
  calculateDestinyNumber,
  calculateSoulUrge,
  calculatePersonality,
  calculateCompatibilityScore,
  getCompatibilityInterpretation
} from "@/lib/numerology";
import type { CompatibilityTest } from "@/lib/schema";

type TestType = "lifePath" | "name" | "complete";

export function CompatibilitySection() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [activeTest, setActiveTest] = useState<TestType>("lifePath");
  const [person1Name, setPerson1Name] = useState("");
  const [person1Date, setPerson1Date] = useState("");
  const [person2Name, setPerson2Name] = useState("");
  const [person2Date, setPerson2Date] = useState("");
  const [results, setResults] = useState<CompatibilityTest | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const testTypes = [
    {
      type: "lifePath" as TestType,
      icon: Heart,
      title: t('compatibility.lifePath'),
      description: t('compatibility.lifePathDesc'),
    },
    {
      type: "name" as TestType,
      icon: Users,
      title: t('compatibility.name'),
      description: t('compatibility.nameDesc'),
    },
    {
      type: "complete" as TestType,
      icon: Infinity,
      title: t('compatibility.complete'),
      description: t('compatibility.completeDesc'),
    },
  ];

  const handleCalculateCompatibility = async () => {
    if (!person1Name.trim() || !person1Date || !person2Name.trim() || !person2Date) {
      toast({
        title: "Error",
        description: "Please fill in all fields for both persons",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    try {
      // Calculate numbers for both persons
      const person1Numbers = {
        lifePath: calculateLifePath(person1Date),
        destiny: calculateDestinyNumber(person1Name),
        soulUrge: calculateSoulUrge(person1Name),
        personality: calculatePersonality(person1Name),
      };

      const person2Numbers = {
        lifePath: calculateLifePath(person2Date),
        destiny: calculateDestinyNumber(person2Name),
        soulUrge: calculateSoulUrge(person2Name),
        personality: calculatePersonality(person2Name),
      };

      const compatibilityScore = calculateCompatibilityScore(person1Numbers, person2Numbers, activeTest);
      const interpretation = getCompatibilityInterpretation(compatibilityScore, language);

      const test: CompatibilityTest = {
        id: `compatibility_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        person1Name: person1Name.trim(),
        person1BirthDate: person1Date,
        person2Name: person2Name.trim(),
        person2BirthDate: person2Date,
        testType: activeTest,
        compatibilityScore,
        person1Numbers,
        person2Numbers,
        interpretation,
        timestamp: Date.now(),
      };

      setResults(test);
      LocalStorage.saveCompatibilityTest(test);

      toast({
        title: "Success!",
        description: "Compatibility analysis completed and saved.",
      });

      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('compatibility-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate compatibility. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section id="compatibility" className="py-16 stars-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            {t('compatibility.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('compatibility.subtitle')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              {/* Test Type Selection */}
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {testTypes.map((test) => {
                  const Icon = test.icon;
                  return (
                    <Button
                      key={test.type}
                      variant={activeTest === test.type ? "default" : "outline"}
                      onClick={() => setActiveTest(test.type)}
                      className={`h-auto p-6 flex flex-col items-center space-y-4 ${
                        activeTest === test.type ? 'compatibility-btn-active' : 'bg-background hover:gold-glow'
                      }`}
                      data-testid={`button-test-${test.type}`}
                    >
                      <Icon className="text-3xl text-primary" />
                      <div className="text-center">
                        <h4 className="text-lg font-semibold mb-2">{test.title}</h4>
                        <p className="text-sm text-muted-foreground">{test.description}</p>
                      </div>
                    </Button>
                  );
                })}
              </div>
              
              {/* Compatibility Form */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-primary">{t('compatibility.person1')}</h5>
                    <div>
                      <Label htmlFor="partner1Name" className="text-sm font-medium mb-2 block">
                        {t('form.fullName')}
                      </Label>
                      <Input
                        id="partner1Name"
                        type="text"
                        value={person1Name}
                        onChange={(e) => setPerson1Name(e.target.value)}
                        placeholder="Full Name"
                        className="bg-input border-border"
                        data-testid="input-person1-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="partner1Date" className="text-sm font-medium mb-2 block">
                        {t('form.birthDate')}
                      </Label>
                      <Input
                        id="partner1Date"
                        type="date"
                        value={person1Date}
                        onChange={(e) => setPerson1Date(e.target.value)}
                        className="bg-input border-border"
                        data-testid="input-person1-date"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-primary">{t('compatibility.person2')}</h5>
                    <div>
                      <Label htmlFor="partner2Name" className="text-sm font-medium mb-2 block">
                        {t('form.fullName')}
                      </Label>
                      <Input
                        id="partner2Name"
                        type="text"
                        value={person2Name}
                        onChange={(e) => setPerson2Name(e.target.value)}
                        placeholder="Full Name"
                        className="bg-input border-border"
                        data-testid="input-person2-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="partner2Date" className="text-sm font-medium mb-2 block">
                        {t('form.birthDate')}
                      </Label>
                      <Input
                        id="partner2Date"
                        type="date"
                        value={person2Date}
                        onChange={(e) => setPerson2Date(e.target.value)}
                        className="bg-input border-border"
                        data-testid="input-person2-date"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={handleCalculateCompatibility}
                    disabled={isCalculating}
                    className="bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-colors gold-glow"
                    data-testid="button-analyze-compatibility"
                  >
                    {isCalculating ? "Analyzing..." : t('compatibility.calculate')}
                  </Button>
                </div>
              </div>
              
              {/* Compatibility Results */}
              {results && (
                <div id="compatibility-results" className="mt-8 fade-in">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-4">
                      <div className="number-circle-small">
                        <span data-testid="text-person1-number">{results.person1Numbers.lifePath}</span>
                      </div>
                      <div className="relative">
                        <div className="text-6xl font-bold text-primary" data-testid="text-compatibility-score">
                          {results.compatibilityScore}%
                        </div>
                        <div className="text-sm text-muted-foreground">{t('compatibility.match')}</div>
                      </div>
                      <div className="number-circle-small">
                        <span data-testid="text-person2-number">{results.person2Numbers.lifePath}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="bg-background border-border">
                    <CardHeader>
                      <CardTitle className="text-primary">Compatibility Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground leading-relaxed" data-testid="text-compatibility-interpretation">
                        {results.interpretation}
                      </p>
                      
                      {/* Number breakdown */}
                      <div className="mt-6 grid md:grid-cols-2 gap-6">
                        <div>
                          <h6 className="font-semibold text-primary mb-3">{results.person1Name}</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>{t('numbers.lifePath')}:</span>
                              <span className="font-bold">{results.person1Numbers.lifePath}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{t('numbers.destiny')}:</span>
                              <span className="font-bold">{results.person1Numbers.destiny}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{t('numbers.soulUrge')}:</span>
                              <span className="font-bold">{results.person1Numbers.soulUrge}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{t('numbers.personality')}:</span>
                              <span className="font-bold">{results.person1Numbers.personality}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h6 className="font-semibold text-primary mb-3">{results.person2Name}</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>{t('numbers.lifePath')}:</span>
                              <span className="font-bold">{results.person2Numbers.lifePath}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{t('numbers.destiny')}:</span>
                              <span className="font-bold">{results.person2Numbers.destiny}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{t('numbers.soulUrge')}:</span>
                              <span className="font-bold">{results.person2Numbers.soulUrge}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{t('numbers.personality')}:</span>
                              <span className="font-bold">{results.person2Numbers.personality}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
