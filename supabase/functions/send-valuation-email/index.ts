import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

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
        <li><strong>Leistung:</strong> ${data.vehicleData.leistung} PS</li>
        <li><strong>Vorbesitzer:</strong> ${data.vehicleData.vorbesitzer}</li>
        <li><strong>Zustand:</strong> ${data.vehicleData.zustand}</li>
      </ul>

      <h3>Kontaktdaten:</h3>
      <ul>
        <li><strong>Name:</strong> ${data.contactData.vorname} ${data.contactData.nachname}</li>
        <li><strong>E-Mail:</strong> ${data.contactData.email}</li>
        <li><strong>Telefon:</strong> ${data.contactData.telefon}</li>
      </ul>

      ${data.estimatedValue ? `
      <h3>Geschätzter Wert:</h3>
      <p><strong>${data.estimatedValue.min.toLocaleString('de-DE')} € - ${data.estimatedValue.max.toLocaleString('de-DE')} €</strong></p>
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

    // Configure SMTP client for Strato
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.strato.de",
        port: 465,
        tls: true,
        auth: {
          username: "ankauf@hochtaunus-automobile.de",
          password: Deno.env.get("STRATO_EMAIL_PASSWORD") || "",
        },
      },
    });

    console.log("Attempting to send email via Strato SMTP...");
    
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
    console.error("Error stack:", error.stack);
    return new Response(
      JSON.stringify({ error: error.message, details: error.stack }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
