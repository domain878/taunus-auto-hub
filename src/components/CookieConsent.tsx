import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-in-bottom">
      <Card className="container mx-auto max-w-5xl p-6 shadow-2xl border-2 bg-card/95 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Verwendung von Cookies</h3>
              <div className="text-sm text-muted-foreground leading-relaxed">
                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.{" "}
                <Link 
                  to="/datenschutz" 
                  className="text-primary hover:underline font-medium"
                  onClick={() => setShowBanner(false)}
                >
                  Mehr erfahren
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="w-full sm:w-auto"
            >
              Ablehnen
            </Button>
            <Button
              onClick={handleAccept}
              className="w-full sm:w-auto"
            >
              Akzeptieren
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecline}
            className="absolute top-2 right-2 md:relative md:top-0 md:right-0"
            aria-label="Banner schließen"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
