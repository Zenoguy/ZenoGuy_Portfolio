import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------- Rate limiting ----------------
const rateLimit = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQ = 3;

export async function POST(req: Request) {
  try {
    // ---- Rate limit per IP ----
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const timestamps = rateLimit.get(ip) || [];
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);

    if (recent.length >= MAX_REQ) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    recent.push(now);
    rateLimit.set(ip, recent);

    // ---- Parse body ----
    const { name, email, subject, message, company } = await req.json();

    // Honeypot (bots)
    if (company) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ---- Send Email via Resend ----
    await resend.emails.send({
      from: "onboarding@resend.dev", // sandbox-safe
      to: ["ghoshshreyan04042005@gmail.com"], // Resend account email
      replyTo: email,
      subject: subject || "New Contact Message",
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6;">
          <h2>New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "—"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    // ---- Discord Webhook ----
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "📬 New Contact Form Submission",
              color: 0x5865f2,
              fields: [
                { name: "Name", value: name, inline: true },
                { name: "Email", value: email, inline: true },
                {
                  name: "Subject",
                  value: subject || "—",
                },
                {
                  name: "Message",
                  value:
                    message.length > 1000
                      ? message.slice(0, 1000) + "…"
                      : message,
                },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
