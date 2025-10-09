import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Hochtaunusautomobile" className="h-12 w-auto" />
              <h3 className="font-bold text-lg">Hochtaunusautomobile</h3>
            </div>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Ihr zuverlässiger Partner für Gebrauchtwagen im Hochtaunuskreis.
              Geprüfte Fahrzeuge, faire Preise und kompetente Beratung.
            </p>
            <div className="space-y-2">
              <a
                href="tel:016093354106"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                0160 93354106
              </a>
              <a
                href="mailto:info@hochtaunus-automobile.de"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@hochtaunus-automobile.de
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                Zimmersmühlenweg 83, 61440 Oberursel (Taunus)
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Schnellzugriff</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/fahrzeuge" className="hover:text-primary transition-colors">
                  Fahrzeuge
                </Link>
              </li>
              <li>
                <Link to="/ankauf" className="hover:text-primary transition-colors">
                  Fahrzeugankauf
                </Link>
              </li>
              <li>
                <Link to="/bewertung" className="hover:text-primary transition-colors">
                  Fahrzeugbewertung
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/impressum" className="hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="hover:text-primary transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Hochtaunusautomobile. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
