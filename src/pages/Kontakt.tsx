import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Calendar, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isContactLoading, setIsContactLoading] = useState(false);

  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    type: "",
  });
  const [isAppointmentLoading, setIsAppointmentLoading] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: formData.subject || undefined,
          message: formData.message,
        }
      });

      if (error) throw error;

      toast.success("Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns an.");
    } finally {
      setIsContactLoading(false);
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAppointmentLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'appointment',
          name: appointmentData.name,
          email: appointmentData.email,
          phone: appointmentData.phone,
          appointmentType: appointmentData.type,
          date: appointmentData.date,
          time: appointmentData.time,
        }
      });

      if (error) throw error;

      toast.success("Termin erfolgreich angefragt! Wir bestätigen Ihnen den Termin per E-Mail.");
      setAppointmentData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        type: "",
      });
    } catch (error) {
      console.error("Appointment form error:", error);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns an.");
    } finally {
      setIsAppointmentLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-scale-in">Kontakt</h1>
          <p className="text-xl text-primary-foreground/90">
            Wir sind für Sie da – kontaktieren Sie uns oder buchen Sie direkt einen Termin
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-muted animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Telefon</h3>
                <a href="tel:+4961719781111" className="text-muted-foreground hover:text-primary">
                  +49 6171 9781111
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">E-Mail</h3>
                <a
                  href="mailto:info@hochtaunus-automobile.de"
                  className="text-muted-foreground hover:text-primary break-all"
                >
                  info@hochtaunus-automobile.de
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Standort</h3>
                <p className="text-muted-foreground">
                  Zimmersmühlenweg 83<br />
                  61440 Oberursel
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Opening Hours & Forms */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Online Appointment Booking */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary" />
                  <CardTitle>Online Terminbuchung</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="apt-name">Name *</Label>
                    <Input
                      id="apt-name"
                      required
                      maxLength={100}
                      value={appointmentData.name}
                      onChange={(e) =>
                        setAppointmentData({ ...appointmentData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="apt-email">E-Mail *</Label>
                    <Input
                      id="apt-email"
                      type="email"
                      required
                      maxLength={255}
                      value={appointmentData.email}
                      onChange={(e) =>
                        setAppointmentData({ ...appointmentData, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="apt-phone">Telefon *</Label>
                    <Input
                      id="apt-phone"
                      type="tel"
                      required
                      maxLength={50}
                      value={appointmentData.phone}
                      onChange={(e) =>
                        setAppointmentData({ ...appointmentData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="apt-type">Terminart *</Label>
                    <select
                      id="apt-type"
                      required
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                      value={appointmentData.type}
                      onChange={(e) =>
                        setAppointmentData({ ...appointmentData, type: e.target.value })
                      }
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="probefahrt">Probefahrt</option>
                      <option value="besichtigung">Fahrzeugbesichtigung</option>
                      <option value="bewertung">Fahrzeugbewertung</option>
                      <option value="beratung">Beratungsgespräch</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="apt-date">Wunschdatum *</Label>
                      <Input
                        id="apt-date"
                        type="date"
                        required
                        value={appointmentData.date}
                        onChange={(e) =>
                          setAppointmentData({ ...appointmentData, date: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="apt-time">Uhrzeit *</Label>
                      <Input
                        id="apt-time"
                        type="time"
                        required
                        value={appointmentData.time}
                        onChange={(e) =>
                          setAppointmentData({ ...appointmentData, time: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isAppointmentLoading}>
                    {isAppointmentLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      "Termin anfragen"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Form & Opening Hours */}
            <div className="space-y-6">
              {/* Opening Hours */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <CardTitle>Öffnungszeiten</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Montag - Freitag:</span>
                      <span className="font-medium">09:00 - 18:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Samstag:</span>
                      <span className="font-medium">10:00 - 14:30Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sonntag:</span>
                      <span className="font-medium">Geschlossen</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Termine außerhalb der Öffnungszeiten nach Vereinbarung möglich.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Nachricht senden</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        maxLength={255}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        maxLength={50}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Betreff</Label>
                      <Input
                        id="subject"
                        maxLength={200}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Nachricht *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={4}
                        maxLength={2000}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isContactLoading}>
                      {isContactLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        "Nachricht senden"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Unser Standort</h2>
          <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.5678!2d8.5852!3d50.2040!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0f1c2c6f8d7b%3A0x5c3e4c5c6c7c8c9c!2sZimmersm%C3%BChlenweg%2083%2C%2061440%20Oberursel!5e0!3m2!1sde!2sde!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Kontakt;
