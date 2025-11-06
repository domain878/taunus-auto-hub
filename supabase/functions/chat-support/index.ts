import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY ist nicht konfiguriert");
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
          ...messages,
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
      console.error("AI Gateway Fehler:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI Service Fehler" }),
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
    console.error("Chat Fehler:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unbekannter Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
