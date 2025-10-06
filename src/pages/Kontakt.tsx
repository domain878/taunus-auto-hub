import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    type: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Termin erfolgreich angefragt! Wir bestätigen Ihnen den Termin per E-Mail.");
    setAppointmentData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      type: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontakt</h1>
          <p className="text-xl text-primary-foreground/90">
            Wir sind für Sie da – kontaktieren Sie uns oder buchen Sie direkt einen Termin
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Telefon</h3>
                <a href="tel:016093354106" className="text-muted-foreground hover:text-primary">
                  0160 93354106
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
                <p className="text-muted-foreground">Zimmersmühlenweg 83 61440</p>
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

                  <Button type="submit" className="w-full">
                    Termin anfragen
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
                      <span className="font-medium">10:00 - 14:30 Uhr</span>
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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Betreff</Label>
                      <Input
                        id="subject"
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
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Nachricht senden
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162771.0876328276!2d8.472193!3d50.2715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd096f477096c5%3A0x422435029b0c600!2sHochtaunuskreis!5e0!3m2!1sde!2sde!4v1234567890"
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
