import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute

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

// Input validation constants
const MAX_MESSAGE_LENGTH = 1000;
const MAX_MESSAGES = 20;
const ALLOWED_ROLES = ['user', 'assistant'] as const;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

function validateMessage(msg: unknown): msg is Message {
  if (typeof msg !== 'object' || msg === null) return false;
  const m = msg as Record<string, unknown>;
  
  if (typeof m.role !== 'string' || !ALLOWED_ROLES.includes(m.role as any)) return false;
  if (typeof m.content !== 'string') return false;
  if (m.content.length === 0 || m.content.length > MAX_MESSAGE_LENGTH) return false;
  
  return true;
}

function validateRequest(body: unknown): { valid: true; data: ChatRequest } | { valid: false; error: string } {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, error: 'Ungültiges Anfrage-Format.' };
  }
  
  const req = body as Record<string, unknown>;
  
  if (!Array.isArray(req.messages)) {
    return { valid: false, error: 'Nachrichten müssen als Array übermittelt werden.' };
  }
  
  if (req.messages.length === 0) {
    return { valid: false, error: 'Mindestens eine Nachricht erforderlich.' };
  }
  
  if (req.messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Maximal ${MAX_MESSAGES} Nachrichten erlaubt.` };
  }
  
  for (const msg of req.messages) {
    if (!validateMessage(msg)) {
      return { valid: false, error: 'Ungültiges Nachrichtenformat.' };
    }
  }
  
  return { valid: true, data: { messages: req.messages as Message[] } };
}

// Sanitize content to prevent prompt injection
function sanitizeContent(content: string): string {
  // Remove potential system prompt injection patterns
  return content
    .replace(/\[SYSTEM\]/gi, '')
    .replace(/\[INST\]/gi, '')
    .replace(/<\|im_start\|>/gi, '')
    .replace(/<\|im_end\|>/gi, '')
    .trim();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';
    
    if (isRateLimited(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Ungültiges JSON-Format." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validation = validateRequest(body);
    if (!validation.valid) {
      console.warn(`Validation failed: ${validation.error}`);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = validation.data;
    
    // Sanitize all message contents
    const sanitizedMessages = messages.map(msg => ({
      role: msg.role,
      content: sanitizeContent(msg.content)
    }));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service vorübergehend nicht verfügbar." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Du bist ein freundlicher Kundenservice-Assistent für einen Autohandel. 
Du hilfst Kunden bei Fragen zu:
- Fahrzeugen im Angebot (Audi, BMW, Opel, etc.)
- Terminvereinbarungen für Probefahrten oder Besichtigungen
- Ankauf von Gebrauchtwagen
- Fahrzeugbewertungen
- Allgemeine Informationen über den Service

Öffnungszeiten:
- Mo-Fr: 09:00 - 18:00 Uhr
- Sa: 10:00 - 14:30 Uhr

Kontakt:
- Telefon: +49 6171 9781111
- Adresse: Zimmersmühlenweg 83, 61440 Oberursel (Taunus)

Sei höflich, hilfsbereit und informativ. Wenn du etwas nicht weißt, empfehle dem Kunden, direkt anzurufen oder die Kontaktseite zu besuchen.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...sanitizedMessages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service vorübergehend nicht verfügbar." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Service vorübergehend nicht verfügbar." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: aiMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Log detailed error server-side only
    console.error("Chat error:", error instanceof Error ? error.message : "Unknown error");
    console.error("Stack:", error instanceof Error ? error.stack : "No stack");
    
    // Return generic error to client
    return new Response(
      JSON.stringify({ error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
