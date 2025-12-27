import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // 5 valuation requests per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  record.count++;
  return false;
}

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
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';
    
    if (isRateLimited(clientIP)) {
      console.warn(`Rate limit exceeded for valuation request from IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const data: ValuationRequest = await req.json();
    console.log("Received valuation request for:", data.vehicleData.marke, data.vehicleData.modell);

    // Prepare photos: limit and size guard
    const MAX_IMAGES = 6;
    const MAX_TOTAL_IMAGE_BYTES = 6 * 1024 * 1024; // ~6MB cap to avoid timeouts
    const photos = (data.photos || []).slice(0, MAX_IMAGES);
    const totalImageBytes = photos.reduce((sum, p) => {
      const len = (p?.data?.length || 0);
      return sum + Math.floor((len * 3) / 4); // base64 -> bytes approx
    }, 0);
    const includeImages = photos.length > 0 && totalImageBytes <= MAX_TOTAL_IMAGE_BYTES;
    console.log(`Photos: count=${photos.length}, totalBytes=${totalImageBytes}, includeImages=${includeImages}`);

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

      <h3>Fahrzeugfotos (${(data.photos || []).length}):</h3>
      ${includeImages ? `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 10px;">
          ${photos.map((photo, index) => `
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 5px;">
              <p style="margin: 0 0 10px 0; font-weight: bold;">Foto ${index + 1}: ${photo.name}</p>
              <img src="${photo.data}" style="max-width: 100%; height: auto; display: block; border-radius: 3px;" alt="Fahrzeugfoto ${index + 1}" />
            </div>
          `).join('')}
        </div>
      ` : `${(data.photos || []).length > 0 ? `<p>${(data.photos || []).length} Foto(s) übermittelt. Aufgrund der Gesamtgröße nicht eingebettet.</p>` : '<p>Keine Fotos hochgeladen</p>'}`}
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
    // Log detailed error server-side only
    console.error("Email send error:", error?.message || "Unknown error");
    console.error("Error stack:", error?.stack || "No stack trace");
    
    // Return generic error to client - no internal details exposed
    return new Response(
      JSON.stringify({ 
        error: "Beim Versenden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
