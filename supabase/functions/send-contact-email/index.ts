import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per hour per IP

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
  const phoneRegex = /^[\d\s+\-()]{0,50}$/;
  return typeof phone === 'string' && phoneRegex.test(phone);
}

type EmailType = 'contact' | 'appointment' | 'purchase';

interface ContactRequest {
  type: 'contact';
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface AppointmentRequest {
  type: 'appointment';
  name: string;
  email: string;
  phone: string;
  appointmentType: string;
  date: string;
  time: string;
}

interface PurchaseRequest {
  type: 'purchase';
  name: string;
  email: string;
  phone: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
  condition?: string;
  message?: string;
}

type EmailRequest = ContactRequest | AppointmentRequest | PurchaseRequest;

function validateContactRequest(body: Record<string, unknown>): { valid: true; data: ContactRequest } | { valid: false; error: string } {
  if (!isValidString(body.name, 100) || (body.name as string).trim().length === 0) {
    return { valid: false, error: 'Name ist erforderlich.' };
  }
  
  if (!isValidEmail(body.email as string)) {
    return { valid: false, error: 'Ungültige E-Mail-Adresse.' };
  }
  
  if (body.phone && !isValidPhone(body.phone as string)) {
    return { valid: false, error: 'Ungültige Telefonnummer.' };
  }
  
  if (body.subject && !isValidString(body.subject, 200)) {
    return { valid: false, error: 'Betreff ist zu lang.' };
  }
  
  if (!isValidString(body.message, 2000) || (body.message as string).trim().length === 0) {
    return { valid: false, error: 'Nachricht ist erforderlich.' };
  }
  
  return {
    valid: true,
    data: {
      type: 'contact',
      name: (body.name as string).trim(),
      email: (body.email as string).trim(),
      phone: body.phone ? (body.phone as string).trim() : undefined,
      subject: body.subject ? (body.subject as string).trim() : undefined,
      message: (body.message as string).trim()
    }
  };
}

function validateAppointmentRequest(body: Record<string, unknown>): { valid: true; data: AppointmentRequest } | { valid: false; error: string } {
  if (!isValidString(body.name, 100) || (body.name as string).trim().length === 0) {
    return { valid: false, error: 'Name ist erforderlich.' };
  }
  
  if (!isValidEmail(body.email as string)) {
    return { valid: false, error: 'Ungültige E-Mail-Adresse.' };
  }
  
  if (!isValidPhone(body.phone as string) || (body.phone as string).trim().length === 0) {
    return { valid: false, error: 'Telefonnummer ist erforderlich.' };
  }
  
  const validTypes = ['probefahrt', 'besichtigung', 'bewertung', 'beratung'];
  if (!isValidString(body.appointmentType, 50) || !validTypes.includes(body.appointmentType as string)) {
    return { valid: false, error: 'Ungültige Terminart.' };
  }
  
  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isValidString(body.date, 10) || !dateRegex.test(body.date as string)) {
    return { valid: false, error: 'Ungültiges Datum.' };
  }
  
  // Validate time format (HH:MM)
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!isValidString(body.time, 5) || !timeRegex.test(body.time as string)) {
    return { valid: false, error: 'Ungültige Uhrzeit.' };
  }
  
  return {
    valid: true,
    data: {
      type: 'appointment',
      name: (body.name as string).trim(),
      email: (body.email as string).trim(),
      phone: (body.phone as string).trim(),
      appointmentType: body.appointmentType as string,
      date: body.date as string,
      time: body.time as string
    }
  };
}

function validatePurchaseRequest(body: Record<string, unknown>): { valid: true; data: PurchaseRequest } | { valid: false; error: string } {
  if (!isValidString(body.name, 100) || (body.name as string).trim().length === 0) {
    return { valid: false, error: 'Name ist erforderlich.' };
  }
  
  if (!isValidEmail(body.email as string)) {
    return { valid: false, error: 'Ungültige E-Mail-Adresse.' };
  }
  
  if (!isValidPhone(body.phone as string) || (body.phone as string).trim().length === 0) {
    return { valid: false, error: 'Telefonnummer ist erforderlich.' };
  }
  
  if (!isValidString(body.brand, 100) || (body.brand as string).trim().length === 0) {
    return { valid: false, error: 'Marke ist erforderlich.' };
  }
  
  if (!isValidString(body.model, 100) || (body.model as string).trim().length === 0) {
    return { valid: false, error: 'Modell ist erforderlich.' };
  }
  
  if (!isValidString(body.year, 10) || (body.year as string).trim().length === 0) {
    return { valid: false, error: 'Erstzulassung ist erforderlich.' };
  }
  
  if (!isValidString(body.mileage, 20) || (body.mileage as string).trim().length === 0) {
    return { valid: false, error: 'Kilometerstand ist erforderlich.' };
  }
  
  if (body.condition && !isValidString(body.condition, 200)) {
    return { valid: false, error: 'Zustand ist zu lang.' };
  }
  
  if (body.message && !isValidString(body.message, 2000)) {
    return { valid: false, error: 'Nachricht ist zu lang.' };
  }
  
  return {
    valid: true,
    data: {
      type: 'purchase',
      name: (body.name as string).trim(),
      email: (body.email as string).trim(),
      phone: (body.phone as string).trim(),
      brand: (body.brand as string).trim(),
      model: (body.model as string).trim(),
      year: (body.year as string).trim(),
      mileage: (body.mileage as string).trim(),
      condition: body.condition ? (body.condition as string).trim() : undefined,
      message: body.message ? (body.message as string).trim() : undefined
    }
  };
}

function generateEmailContent(data: EmailRequest): { subject: string; html: string } {
  switch (data.type) {
    case 'contact':
      return {
        subject: data.subject ? `Kontaktanfrage: ${escapeHtml(data.subject)}` : 'Neue Kontaktanfrage',
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <h3>Kontaktdaten:</h3>
          <ul>
            <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
            <li><strong>E-Mail:</strong> ${escapeHtml(data.email)}</li>
            ${data.phone ? `<li><strong>Telefon:</strong> ${escapeHtml(data.phone)}</li>` : ''}
            ${data.subject ? `<li><strong>Betreff:</strong> ${escapeHtml(data.subject)}</li>` : ''}
          </ul>
          <h3>Nachricht:</h3>
          <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
        `
      };
      
    case 'appointment':
      const typeLabels: Record<string, string> = {
        probefahrt: 'Probefahrt',
        besichtigung: 'Fahrzeugbesichtigung',
        bewertung: 'Fahrzeugbewertung',
        beratung: 'Beratungsgespräch'
      };
      return {
        subject: `Terminanfrage: ${typeLabels[data.appointmentType] || data.appointmentType}`,
        html: `
          <h2>Neue Terminanfrage</h2>
          <h3>Termindaten:</h3>
          <ul>
            <li><strong>Art:</strong> ${escapeHtml(typeLabels[data.appointmentType] || data.appointmentType)}</li>
            <li><strong>Wunschdatum:</strong> ${escapeHtml(data.date)}</li>
            <li><strong>Wunschzeit:</strong> ${escapeHtml(data.time)} Uhr</li>
          </ul>
          <h3>Kontaktdaten:</h3>
          <ul>
            <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
            <li><strong>E-Mail:</strong> ${escapeHtml(data.email)}</li>
            <li><strong>Telefon:</strong> ${escapeHtml(data.phone)}</li>
          </ul>
        `
      };
      
    case 'purchase':
      return {
        subject: `Ankaufanfrage: ${escapeHtml(data.brand)} ${escapeHtml(data.model)}`,
        html: `
          <h2>Neue Ankaufanfrage</h2>
          <h3>Fahrzeugdaten:</h3>
          <ul>
            <li><strong>Marke:</strong> ${escapeHtml(data.brand)}</li>
            <li><strong>Modell:</strong> ${escapeHtml(data.model)}</li>
            <li><strong>Erstzulassung:</strong> ${escapeHtml(data.year)}</li>
            <li><strong>Kilometerstand:</strong> ${escapeHtml(data.mileage)} km</li>
            ${data.condition ? `<li><strong>Zustand:</strong> ${escapeHtml(data.condition)}</li>` : ''}
          </ul>
          <h3>Kontaktdaten:</h3>
          <ul>
            <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
            <li><strong>E-Mail:</strong> ${escapeHtml(data.email)}</li>
            <li><strong>Telefon:</strong> ${escapeHtml(data.phone)}</li>
          </ul>
          ${data.message ? `
          <h3>Zusätzliche Informationen:</h3>
          <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
          ` : ''}
        `
      };
  }
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
      console.warn(`Rate limit exceeded for contact request from IP: ${clientIP}`);
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
    const emailType = rawData.type as string;

    // Validate based on type
    let validatedData: EmailRequest;
    
    if (emailType === 'contact') {
      const validation = validateContactRequest(rawData);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({ error: validation.error }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      validatedData = validation.data;
    } else if (emailType === 'appointment') {
      const validation = validateAppointmentRequest(rawData);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({ error: validation.error }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      validatedData = validation.data;
    } else if (emailType === 'purchase') {
      const validation = validatePurchaseRequest(rawData);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({ error: validation.error }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      validatedData = validation.data;
    } else {
      return new Response(
        JSON.stringify({ error: "Ungültiger Anfrage-Typ." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Received validated ${emailType} request from: ${validatedData.email}`);

    const { subject, html } = generateEmailContent(validatedData);

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

    console.log(`Attempting to send ${emailType} email via Strato SMTP...`);
    
    await client.send({
      from: "ankauf@hochtaunus-automobile.de",
      to: "info@hochtaunus-automobile.de",
      subject,
      content: html,
      html,
    });

    await client.close();
    
    console.log(`${emailType} email sent successfully`);

    return new Response(
      JSON.stringify({ success: true, message: "Anfrage erfolgreich gesendet" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Email send error:", error?.message || "Unknown error");
    console.error("Error stack:", error?.stack || "No stack trace");
    
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
