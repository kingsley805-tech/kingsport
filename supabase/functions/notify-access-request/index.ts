import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { requester_name, requester_email, project_title, request_type } = await req.json();

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.log("RESEND_API_KEY not set, skipping email");
      return new Response(JSON.stringify({ message: "Email skipped - no API key" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const resend = new Resend(resendKey);

    const requestLabel = request_type === "github_profile" ? "GitHub Profile" : `Project: ${project_title}`;

    await resend.emails.send({
      from: "Portfolio <noreply@resend.dev>",
      to: ["kingsleyyeboah805@gmail.com"],
      subject: `🔔 New GitHub Access Request from ${requester_name}`,
      html: `
        <h2>New Access Request</h2>
        <p><strong>From:</strong> ${requester_name} (${requester_email})</p>
        <p><strong>Requesting:</strong> ${requestLabel}</p>
        <p>Log in to your dashboard to approve or deny this request.</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
