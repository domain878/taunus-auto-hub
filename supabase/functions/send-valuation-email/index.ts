import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ValuationRequest {
  vehicleData: {
    marke: string;
    modell: string;
    erstzulassung: string;
    kilometerstand: string;
    kraftstoff: string;
    getriebe: string;
    leistung: string;
    farbe: string;
    vorbesitzer: string;
    tuv: string;
    zustand: string;
  };
  contactData: {
    vorname: string;
    nachname: string;
    email: string;
    telefon: string;
    nachricht: string;
  };
  photos: Array<{ name: string; data: string }>;
  damagePoints: Array<{ id: string; x: number; y: number; view: string; type: string }>;
  estimatedValue?: { min: number; max: number };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ValuationRequest = await req.json();
    console.log("Received valuation request for:", data.vehicleData.marke, data.vehicleData.modell);

    // Create email content
    const emailHtml = `
      <h2>Neue Fahrzeugbewertungsanfrage</h2>
      
      <h3>Fahrzeugdaten:</h3>
      <ul>
        <li><strong>Marke:</strong> ${data.vehicleData.marke}</li>
        <li><strong>Modell:</strong> ${data.vehicleData.modell}</li>
        <li><strong>Erstzulassung:</strong> ${data.vehicleData.erstzulassung}</li>
        <li><strong>Kilometerstand:</strong> ${data.vehicleData.kilometerstand} km</li>
        <li><strong>Kraftstoff:</strong> ${data.vehicleData.kraftstoff}</li>
        <li><strong>Getriebe:</strong> ${data.vehicleData.getriebe}</li>
        <li><strong>Leistung:</strong> ${data.vehicleData.leistung} PS</li>
        <li><strong>Farbe:</strong> ${data.vehicleData.farbe}</li>
        <li><strong>Vorbesitzer:</strong> ${data.vehicleData.vorbesitzer}</li>
        <li><strong>TÜV:</strong> ${data.vehicleData.tuv}</li>
        <li><strong>Zustand:</strong> ${data.vehicleData.zustand}</li>
      </ul>

      <h3>Kontaktdaten:</h3>
      <ul>
        <li><strong>Name:</strong> ${data.contactData.vorname} ${data.contactData.nachname}</li>
        <li><strong>E-Mail:</strong> ${data.contactData.email}</li>
        <li><strong>Telefon:</strong> ${data.contactData.telefon}</li>
        <li><strong>Nachricht:</strong> ${data.contactData.nachricht || 'Keine Nachricht'}</li>
      </ul>

      ${data.estimatedValue ? `
      <h3>Geschätzter Wert:</h3>
      <p>${data.estimatedValue.min.toLocaleString('de-DE')} € - ${data.estimatedValue.max.toLocaleString('de-DE')} €</p>
      ` : ''}

      ${data.damagePoints && data.damagePoints.length > 0 ? `
      <h3>Markierte Schäden:</h3>
      <ul>
        ${data.damagePoints.map(point => `<li>${point.type} (${point.view})</li>`).join('')}
      </ul>
      ` : ''}

      <h3>Fotos:</h3>
      <p>${data.photos.length} Foto(s) hochgeladen</p>
    `;

    // Configure SMTP client
    const client = new SmtpClient();
    
    await client.connectTLS({
      hostname: "smtp.strato.de",
      port: 465,
      username: "ankauf@hochtaunus-automobile.de",
      password: Deno.env.get("STRATO_EMAIL_PASSWORD")!,
    });

    await client.send({
      from: "ankauf@hochtaunus-automobile.de",
      to: "ankauf@hochtaunus-automobile.de",
      subject: `Neue Bewertungsanfrage: ${data.vehicleData.marke} ${data.vehicleData.modell}`,
      content: emailHtml,
      html: emailHtml,
    });

    await client.close();

    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Email erfolgreich versendet" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
