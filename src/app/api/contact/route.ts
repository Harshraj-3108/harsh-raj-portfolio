import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabaseClient";
import { site } from "@/config/site";
import { isValidEmail } from "@/lib/emailValidation";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!email || !message) {
      return NextResponse.json(
        { error: "Please fill in both your email and message." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.error(
        "Contact API: Supabase is not configured (missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)."
      );
      return NextResponse.json(
        { error: "Server is not configured correctly." },
        { status: 500 }
      );
    }

    // 1. Save the message to Supabase first — this is the source of truth.
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({ email, message });

    if (dbError) {
      console.error("Contact API: Supabase insert failed:", dbError);
      return NextResponse.json(
        { error: "Could not save your message. Please try again." },
        { status: 500 }
      );
    }

    // 2. Send the email notification. The API only reports success to the
    // visitor if this step also succeeds — the message is already safely
    // stored either way, but we don't want to claim a false success.
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error(
        "Contact API: RESEND_API_KEY is not set. Message was saved to Supabase but no email notification was sent."
      );
      return NextResponse.json(
        {
          error:
            "Your message was saved, but the notification email could not be sent.",
        },
        { status: 502 }
      );
    }

    const resend = new Resend(resendApiKey);
    const submittedAt = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });

    const { error: emailError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: site.email,
      replyTo: email,
      subject: "New Portfolio Contact Message",
      text: `Name/Email: ${email}\n\nMessage:\n${message}\n\nSubmitted: ${submittedAt}`,
      html: `<div style="font-family: sans-serif; line-height: 1.6; color: #111;">
  <p><strong>Name/Email:</strong> ${escapeHtml(email)}</p>
  <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  <p><strong>Submitted:</strong> ${submittedAt}</p>
</div>`,
    });

    if (emailError) {
      console.error("Contact API: Resend email failed:", emailError);
      return NextResponse.json(
        {
          error:
            "Your message was saved, but the notification email could not be sent.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API: unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
