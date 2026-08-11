import nodemailer from "nodemailer";

export type LeadEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
  websiteUrl?: string;
  source?: string;
};

export async function sendLeadNotificationEmail(payload: LeadEmailPayload) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "contact@aeronoxsolutions.com";

  if (!user || !pass) {
    console.warn(
      `[Email Service Warning] SMTP_USER or SMTP_PASS is missing in .env.local. ` +
      `Lead received for ${payload.name} (${payload.email}), but email notification was skipped.`
    );
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for 587/25
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const subject = `🚀 New Lead Received: ${payload.name} (${payload.service || payload.source || "Website"})`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #120b18; color: #ffffff; padding: 30px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255,190,0,0.3);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #ffbe00; font-size: 24px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: 2px;">Aeronox Solutions</h1>
          <p style="color: #dcd7e3; font-size: 13px; margin-top: 4px;">New Incoming Lead Alert</p>
        </div>

        <div style="background-color: #1a1122; padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px;">
          <h2 style="color: #ffffff; font-size: 18px; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">Lead Details</h2>
          
          <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #ffbe00;">Name:</strong> ${payload.name}</p>
          <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #ffbe00;">Email:</strong> <a href="mailto:${payload.email}" style="color: #00c2ff; text-decoration: none;">${payload.email}</a></p>
          <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #ffbe00;">Phone:</strong> ${payload.phone || "N/A"}</p>
          ${payload.service ? `<p style="margin: 8px 0; font-size: 14px;"><strong style="color: #ffbe00;">Service Required:</strong> <span style="background-color: #ffbe00; color: #120b18; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">${payload.service}</span></p>` : ""}
          ${payload.budget ? `<p style="margin: 8px 0; font-size: 14px;"><strong style="color: #ffbe00;">Estimated Budget:</strong> <span style="color: #4ade80; font-weight: bold;">${payload.budget}</span></p>` : ""}
          ${payload.websiteUrl ? `<p style="margin: 8px 0; font-size: 14px;"><strong style="color: #ffbe00;">Website:</strong> <a href="${payload.websiteUrl}" target="_blank" style="color: #00c2ff; text-decoration: none;">${payload.websiteUrl}</a></p>` : ""}
          <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #ffbe00;">Source:</strong> ${payload.source || "Website Contact Form"}</p>
        </div>

        ${payload.message ? `
          <div style="background-color: #1a1122; padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px;">
            <h3 style="color: #ffffff; font-size: 15px; margin-top: 0; margin-bottom: 8px;">Message / Project Brief:</h3>
            <p style="color: #dcd7e3; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${payload.message}</p>
          </div>
        ` : ""}

        <div style="text-align: center; margin-top: 30px;">
          <a href="mailto:${payload.email}" style="background-color: #ffbe00; color: #1a1122; font-weight: bold; padding: 12px 28px; border-radius: 30px; text-decoration: none; display: inline-block; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
            Reply to ${payload.name}
          </a>
        </div>

        <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #a19bb0;">
          This is an automated lead notification from Aeronox Solutions Web Platform.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Aeronox Leads" <${user}>`,
      to: adminEmail,
      subject,
      html: htmlContent,
      replyTo: payload.email,
    });

    console.log(`[Email Service] Successfully sent lead notification email for ${payload.name} to ${adminEmail}`);
    return true;
  } catch (error) {
    console.error(`[Email Service Error] Failed to send email for ${payload.name}:`, error);
    return false;
  }
}
