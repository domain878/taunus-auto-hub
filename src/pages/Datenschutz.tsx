import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Datenschutz = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-xl font-semibold mb-2">Allgemeine Hinweise</h3>
              <p className="text-muted-foreground">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Datenerfassung auf dieser Website</h2>
              <h3 className="text-xl font-semibold mb-2">
                Wer ist verantwortlich für die Datenerfassung auf dieser Website?
              </h3>
              <p className="text-muted-foreground">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
                Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Wie erfassen wir Ihre Daten?</h3>
              <p className="text-muted-foreground mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei
                kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p className="text-muted-foreground">
                Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme
                erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem
                oder Uhrzeit des Seitenaufrufs).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Wofür nutzen wir Ihre Daten?</h3>
              <p className="text-muted-foreground">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
                gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet
                werden.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Kontaktformular</h2>
              <p className="text-muted-foreground">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
                dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
                Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Ihre Rechte</h2>
              <p className="text-muted-foreground mb-4">
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
                personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
                Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
              </p>
              <p className="text-muted-foreground">
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit
                unter der im Impressum angegebenen Adresse an uns wenden.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Google Maps</h2>
              <p className="text-muted-foreground">
                Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die
                Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p className="text-muted-foreground mt-4">
                Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP Adresse zu
                speichern. Diese Informationen werden in der Regel an einen Server von Google in den
                USA übertragen und dort gespeichert.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Kontakt</h2>
              <p className="text-muted-foreground">
                Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter:
                <br />
                E-Mail: info@hochtaunus-automobile.de
                <br />
                Telefon: 0174 3764995
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Datenschutz;
