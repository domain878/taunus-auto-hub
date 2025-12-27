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

// HTML escape function to prevent XSS/HTML injection
function escapeHtml(unsafe: string): string {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && email.length <= 255 && emailRegex.test(email);
}

function isValidString(value: unknown, maxLength: number = 200): value is string {
  return typeof value === 'string' && value.length <= maxLength;
}

function isValidPhone(phone: string): boolean {
  // Allow digits, spaces, +, -, (, )
  const phoneRegex = /^[\d\s+\-()]{0,50}$/;
  return typeof phone === 'string' && phoneRegex.test(phone);
}

function validateVehicleData(data: unknown): { valid: true; data: VehicleData } | { valid: false; error: string } {
  if (typeof data !== 'object' || data === null) {
    return { valid: false, error: 'Fahrzeugdaten fehlen.' };
  }
  
  const v = data as Record<string, unknown>;
  
  const requiredFields = ['marke', 'modell', 'erstzulassung', 'kilometerstand', 'kraftstoff', 'getriebe', 'leistung', 'farbe', 'vorbesitzer', 'tuv', 'zustand'];
  
  for (const field of requiredFields) {
    if (!isValidString(v[field], 200)) {
      return { valid: false, error: `Ungültiges Feld: ${field}` };
    }
  }
  
  return { valid: true, data: v as unknown as VehicleData };
}

function validateContactData(data: unknown): { valid: true; data: ContactData } | { valid: false; error: string } {
  if (typeof data !== 'object' || data === null) {
    return { valid: false, error: 'Kontaktdaten fehlen.' };
  }
  
  const c = data as Record<string, unknown>;
  
  if (!isValidString(c.vorname, 100) || (c.vorname as string).trim().length === 0) {
    return { valid: false, error: 'Vorname ist erforderlich.' };
  }
  
  if (!isValidString(c.nachname, 100)) {
    return { valid: false, error: 'Ungültiger Nachname.' };
  }
  
  if (!isValidEmail(c.email as string)) {
    return { valid: false, error: 'Ungültige E-Mail-Adresse.' };
  }
  
  if (!isValidPhone(c.telefon as string)) {
    return { valid: false, error: 'Ungültige Telefonnummer.' };
  }
  
  if (!isValidString(c.nachricht, 2000)) {
    return { valid: false, error: 'Nachricht ist zu lang.' };
  }
  
  return { valid: true, data: c as unknown as ContactData };
}

function validateDamagePoints(points: unknown): DamagePoint[] {
  if (!Array.isArray(points)) return [];
  
  return points
    .filter(p => 
      typeof p === 'object' && p !== null &&
      isValidString((p as any).id, 50) &&
      typeof (p as any).x === 'number' &&
      typeof (p as any).y === 'number' &&
      isValidString((p as any).view, 50) &&
      isValidString((p as any).type, 100)
    )
    .slice(0, 50) // Max 50 damage points
    .map(p => ({
      id: (p as any).id,
      x: (p as any).x,
      y: (p as any).y,
      view: (p as any).view,
      type: (p as any).type
    }));
}

function validatePhotos(photos: unknown): Photo[] {
  if (!Array.isArray(photos)) return [];
  
  const MAX_IMAGES = 6;
  const MAX_SINGLE_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB per image
  
  return photos
    .filter(p => {
      if (typeof p !== 'object' || p === null) return false;
      const photo = p as Record<string, unknown>;
      if (!isValidString(photo.name, 255)) return false;
      if (typeof photo.data !== 'string') return false;
      
      // Check base64 data size
      const dataSize = Math.floor((photo.data.length * 3) / 4);
      if (dataSize > MAX_SINGLE_IMAGE_BYTES) return false;
      
      // Validate base64 data URL format
      if (!photo.data.startsWith('data:image/')) return false;
      
      return true;
    })
    .slice(0, MAX_IMAGES)
    .map(p => ({ name: (p as any).name, data: (p as any).data }));
}

interface VehicleData {
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
}

interface ContactData {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  nachricht: string;
}

interface Photo {
  name: string;
  data: string;
}

interface DamagePoint {
  id: string;
  x: number;
  y: number;
  view: string;
  type: string;
}

interface ValuationRequest {
  vehicleData: VehicleData;
  contactData: ContactData;
  photos: Photo[];
  damagePoints: DamagePoint[];
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

    // Parse request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Ungültiges Anfrage-Format." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (typeof body !== 'object' || body === null) {
      return new Response(
        JSON.stringify({ error: "Ungültiges Anfrage-Format." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const rawData = body as Record<string, unknown>;

    // Validate vehicle data
    const vehicleValidation = validateVehicleData(rawData.vehicleData);
    if (!vehicleValidation.valid) {
      return new Response(
        JSON.stringify({ error: vehicleValidation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate contact data
    const contactValidation = validateContactData(rawData.contactData);
    if (!contactValidation.valid) {
      return new Response(
        JSON.stringify({ error: contactValidation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate and sanitize other fields
    const photos = validatePhotos(rawData.photos);
    const damagePoints = validateDamagePoints(rawData.damagePoints);
    
    // Validate estimated value if present
    let estimatedValue: { min: number; max: number } | undefined;
    if (rawData.estimatedValue && typeof rawData.estimatedValue === 'object') {
      const ev = rawData.estimatedValue as Record<string, unknown>;
      if (typeof ev.min === 'number' && typeof ev.max === 'number' && 
          ev.min >= 0 && ev.max >= ev.min && ev.max <= 10000000) {
        estimatedValue = { min: ev.min, max: ev.max };
      }
    }

    const data: ValuationRequest = {
      vehicleData: vehicleValidation.data,
      contactData: contactValidation.data,
      photos,
      damagePoints,
      estimatedValue
    };

    console.log("Received validated valuation request for:", data.vehicleData.marke, data.vehicleData.modell);

    // Prepare photos: limit and size guard
    const MAX_TOTAL_IMAGE_BYTES = 6 * 1024 * 1024; // ~6MB cap to avoid timeouts
    const totalImageBytes = photos.reduce((sum, p) => {
      const len = (p?.data?.length || 0);
      return sum + Math.floor((len * 3) / 4); // base64 -> bytes approx
    }, 0);
    const includeImages = photos.length > 0 && totalImageBytes <= MAX_TOTAL_IMAGE_BYTES;
    console.log(`Photos: count=${photos.length}, totalBytes=${totalImageBytes}, includeImages=${includeImages}`);

    // Create email content with HTML-escaped values
    const emailHtml = `
      <h2>Neue Fahrzeugbewertungsanfrage</h2>
      
      <h3>Fahrzeugdaten:</h3>
      <ul>
        <li><strong>Marke:</strong> ${escapeHtml(data.vehicleData.marke)}</li>
        <li><strong>Modell:</strong> ${escapeHtml(data.vehicleData.modell)}</li>
        <li><strong>Erstzulassung:</strong> ${escapeHtml(data.vehicleData.erstzulassung)}</li>
        <li><strong>Kilometerstand:</strong> ${escapeHtml(data.vehicleData.kilometerstand)} km</li>
        <li><strong>Kraftstoff:</strong> ${escapeHtml(data.vehicleData.kraftstoff)}</li>
        <li><strong>Getriebe:</strong> ${escapeHtml(data.vehicleData.getriebe)}</li>
        <li><strong>Leistung:</strong> ${escapeHtml(data.vehicleData.leistung)} PS</li>
        <li><strong>Farbe:</strong> ${escapeHtml(data.vehicleData.farbe)}</li>
        <li><strong>Vorbesitzer:</strong> ${escapeHtml(data.vehicleData.vorbesitzer)}</li>
        <li><strong>TÜV:</strong> ${escapeHtml(data.vehicleData.tuv)}</li>
        <li><strong>Zustand:</strong> ${escapeHtml(data.vehicleData.zustand)}</li>
      </ul>

      <h3>Kontaktdaten:</h3>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(data.contactData.vorname)} ${escapeHtml(data.contactData.nachname)}</li>
        <li><strong>E-Mail:</strong> ${escapeHtml(data.contactData.email)}</li>
        <li><strong>Telefon:</strong> ${escapeHtml(data.contactData.telefon)}</li>
      </ul>

      ${data.contactData.nachricht ? `
      <h3>Nachricht:</h3>
      <p>${escapeHtml(data.contactData.nachricht)}</p>
      ` : ''}

      ${data.estimatedValue ? `
      <h3>Geschätzter Wert:</h3>
      <p><strong>${data.estimatedValue.min.toLocaleString('de-DE')} € - ${data.estimatedValue.max.toLocaleString('de-DE')} €</strong></p>
      ` : ''}

      ${data.damagePoints && data.damagePoints.length > 0 ? `
      <h3>Markierte Schäden:</h3>
      <ul>
        ${data.damagePoints.map(point => `<li>${escapeHtml(point.type)} (${escapeHtml(point.view)})</li>`).join('')}
      </ul>
      ` : ''}

      <h3>Fahrzeugfotos (${photos.length}):</h3>
      ${includeImages ? `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 10px;">
          ${photos.map((photo, index) => `
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 5px;">
              <p style="margin: 0 0 10px 0; font-weight: bold;">Foto ${index + 1}: ${escapeHtml(photo.name)}</p>
              <img src="${photo.data}" style="max-width: 100%; height: auto; display: block; border-radius: 3px;" alt="Fahrzeugfoto ${index + 1}" />
            </div>
          `).join('')}
        </div>
      ` : `${photos.length > 0 ? `<p>${photos.length} Foto(s) übermittelt. Aufgrund der Gesamtgröße nicht eingebettet.</p>` : '<p>Keine Fotos hochgeladen</p>'}`}
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
      subject: `Neue Bewertungsanfrage: ${escapeHtml(data.vehicleData.marke)} ${escapeHtml(data.vehicleData.modell)}`,
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
