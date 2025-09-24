import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, BookOpen, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { LocalStorage } from "@/lib/storage";
import type { NumerologyReading, CompatibilityTest } from "@/lib/schema";

export function ReadingsHistory() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [readings, setReadings] = useState<NumerologyReading[]>([]);
  const [compatibilityTests, setCompatibilityTests] = useState<CompatibilityTest[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setReadings(LocalStorage.getReadings());
    setCompatibilityTests(LocalStorage.getCompatibilityTests());
  };

  const handleDeleteReading = (id: string) => {
    LocalStorage.deleteReading(id);
    loadData();
    toast({
      title: "Reading deleted",
      description: "The reading has been removed from your history.",
    });
  };

  const handleDeleteCompatibilityTest = (id: string) => {
    LocalStorage.deleteCompatibilityTest(id);
    loadData();
    toast({
      title: "Compatibility test deleted",
      description: "The compatibility test has been removed from your history.",
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const EmptyState = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="text-center py-16">
      <Icon className="text-6xl text-muted-foreground mb-6 mx-auto" />
      <h3 className="text-xl font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );

  return (
    <section id="readings" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-card-foreground mb-4">
            {t('readings.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('readings.subtitle')}
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="readings" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="readings" className="flex items-center gap-2" data-testid="tab-readings">
                <BookOpen className="w-4 h-4" />
                Numerology Readings ({readings.length})
              </TabsTrigger>
              <TabsTrigger value="compatibility" className="flex items-center gap-2" data-testid="tab-compatibility">
                <Heart className="w-4 h-4" />
                Compatibility Tests ({compatibilityTests.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="readings">
              {readings.length === 0 ? (
                <EmptyState 
                  icon={BookOpen}
                  title={t('readings.empty')}
                  description={t('readings.emptyDesc')}
                />
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {readings.map((reading) => (
                    <Card key={reading.id} className="bg-background border-border hover:gold-glow transition-all duration-300 reading-card">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-primary" data-testid={`text-reading-name-${reading.id}`}>
                              {reading.fullName}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">{formatDate(reading.timestamp)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteReading(reading.id)}
                            className="text-muted-foreground hover:text-destructive"
                            data-testid={`button-delete-reading-${reading.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary" data-testid={`text-life-path-${reading.id}`}>
                              {reading.lifePathNumber}
                            </div>
                            <div className="text-xs text-muted-foreground">{t('numbers.lifePath')}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary" data-testid={`text-destiny-${reading.id}`}>
                              {reading.destinyNumber}
                            </div>
                            <div className="text-xs text-muted-foreground">{t('numbers.destiny')}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary" data-testid={`text-soul-urge-${reading.id}`}>
                              {reading.soulUrgeNumber}
                            </div>
                            <div className="text-xs text-muted-foreground">{t('numbers.soulUrge')}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary" data-testid={`text-personality-${reading.id}`}>
                              {reading.personalityNumber}
                            </div>
                            <div className="text-xs text-muted-foreground">{t('numbers.personality')}</div>
                          </div>
                        </div>
                        
                        {(reading.masterNumbers.length > 0 || reading.karmicDebtNumbers.length > 0) && (
                          <div className="pt-3 border-t border-border">
                            {reading.masterNumbers.length > 0 && (
                              <div className="text-xs">
                                <span className="text-muted-foreground">Master: </span>
                                <span className="text-primary font-semibold">{reading.masterNumbers.join(', ')}</span>
                              </div>
                            )}
                            {reading.karmicDebtNumbers.length > 0 && (
                              <div className="text-xs">
                                <span className="text-muted-foreground">Karmic: </span>
                                <span className="text-destructive font-semibold">{reading.karmicDebtNumbers.join(', ')}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="compatibility">
              {compatibilityTests.length === 0 ? (
                <EmptyState 
                  icon={Heart}
                  title="No Compatibility Tests Yet"
                  description="Complete your first compatibility analysis to see it saved here"
                />
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {compatibilityTests.map((test) => (
                    <Card key={test.id} className="bg-background border-border hover:gold-glow transition-all duration-300 reading-card">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-primary" data-testid={`text-compatibility-names-${test.id}`}>
                              {test.person1Name} & {test.person2Name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">{formatDate(test.timestamp)}</p>
                            <p className="text-xs text-muted-foreground capitalize">{test.testType} Test</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCompatibilityTest(test.id)}
                            className="text-muted-foreground hover:text-destructive"
                            data-testid={`button-delete-compatibility-${test.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-4">
                          <div className="text-4xl font-bold text-primary" data-testid={`text-compatibility-score-${test.id}`}>
                            {test.compatibilityScore}%
                          </div>
                          <div className="text-sm text-muted-foreground">{t('compatibility.match')}</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <h6 className="font-semibold text-primary mb-2">{test.person1Name}</h6>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>Life Path:</span>
                                <span className="font-bold">{test.person1Numbers.lifePath}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Destiny:</span>
                                <span className="font-bold">{test.person1Numbers.destiny}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h6 className="font-semibold text-primary mb-2">{test.person2Name}</h6>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>Life Path:</span>
                                <span className="font-bold">{test.person2Numbers.lifePath}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Destiny:</span>
                                <span className="font-bold">{test.person2Numbers.destiny}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
