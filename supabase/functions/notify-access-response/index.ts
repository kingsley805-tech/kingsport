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
    const { requester_email, status, github_url } = await req.json();

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.log("RESEND_API_KEY not set, skipping email");
      return new Response(JSON.stringify({ message: "Email skipped - no API key" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const resend = new Resend(resendKey);

    const isApproved = status === "approved";

    await resend.emails.send({
      from: "Portfolio <noreply@resend.dev>",
      to: [requester_email],
      subject: isApproved
        ? "✅ Your GitHub access request has been approved!"
        : "❌ Your GitHub access request was denied",
      html: isApproved
        ? `
          <h2>Access Approved!</h2>
          <p>Your request to view the GitHub repository has been approved.</p>
          ${github_url ? `<p><a href="${github_url}">Click here to view the repository</a></p>` : ''}
          <p>Thank you for your interest!</p>
        `
        : `
          <h2>Access Denied</h2>
          <p>Unfortunately, your request to access the GitHub repository was not approved at this time.</p>
          <p>Thank you for your interest.</p>
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
