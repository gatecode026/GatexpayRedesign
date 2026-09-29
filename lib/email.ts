import { Enquiry } from "@/models/enquiry.model";

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  loggedOnly?: boolean;
}

export interface LeadEmailPayload {
  _id: string | any;
  fullName: string;
  companyName?: string;
  email?: string;
  phone: string;
  countryCode?: string;
  serviceCategory: string;
  timeline?: string;
  message?: string;
  source: string;
  createdAt?: string | Date;
}

/**
 * Server-side Admin Lead Notification Service
 * Sends an email notification to the configured administrator whenever a new merchant enquiry is submitted.
 * Designed to fail gracefully without disrupting the user's enquiry submission.
 */
export async function sendAdminLeadNotification(
  lead: LeadEmailPayload
): Promise<SendEmailResult> {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@gatexpay.com";
  const fromEmail = process.env.EMAIL_FROM || "notifications@gatexpay.com";
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const submittedDate = lead.createdAt
    ? new Date(lead.createdAt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString("en-IN");

  const fullPhone = `${lead.countryCode || "+91"} ${lead.phone}`;
  const subject = `New GateXPay Merchant Enquiry — ${lead.fullName}`;
  const adminConsoleUrl = `${appUrl}/admin/dashboard`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05); }
    .header { background: #080D23; padding: 28px 32px; border-bottom: 2px solid #0284c7; }
    .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
    .header p { margin: 6px 0 0 0; color: #00C0FD; font-size: 13px; font-weight: 500; }
    .content { padding: 32px; }
    .title { font-size: 17px; font-weight: 700; color: #080D23; margin: 0 0 16px 0; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; }
    .table td.label { width: 38%; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.04em; }
    .table td.value { color: #0f172a; font-weight: 500; }
    .badge { display: inline-block; background: #f0f9ff; color: #0284c7; border: 1px solid #bae6fd; padding: 3px 9px; border-radius: 6px; font-weight: 600; font-size: 12px; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-bottom: 24px; }
    .message-box p { margin: 0; font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-wrap; }
    .btn-wrap { text-align: center; margin: 30px 0 10px 0; }
    .btn { display: inline-block; background: #0284c7; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 9px; font-size: 13.5px; font-weight: 600; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.3); }
    .footer { background: #f8fafc; padding: 18px 32px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11.5px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>GateXPay Admin Notification</h1>
      <p>Instant Merchant Lead Ingestion Alert</p>
    </div>
    <div class="content">
      <div class="title">New Merchant Enquiry Received</div>
      <table class="table">
        <tr>
          <td class="label">Merchant Name</td>
          <td class="value"><strong>${lead.fullName}</strong></td>
        </tr>
        <tr>
          <td class="label">Company</td>
          <td class="value">${lead.companyName || "Not specified"}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value">${lead.email ? `<a href="mailto:${lead.email}" style="color:#0284c7; text-decoration:none;">${lead.email}</a>` : "Not provided"}</td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td class="value"><a href="tel:${fullPhone.replace(/\s+/g, '')}" style="color:#0284c7; text-decoration:none;">${fullPhone}</a></td>
        </tr>
        <tr>
          <td class="label">Service Requested</td>
          <td class="value"><span class="badge">${lead.serviceCategory}</span></td>
        </tr>
        <tr>
          <td class="label">Timeline</td>
          <td class="value">${lead.timeline || "Immediately"}</td>
        </tr>
        <tr>
          <td class="label">Lead Source</td>
          <td class="value" style="text-transform: capitalize;">${lead.source ? lead.source.replace("_", " ") : "Direct"}</td>
        </tr>
        <tr>
          <td class="label">Submitted At</td>
          <td class="value">${submittedDate}</td>
        </tr>
      </table>

      ${
        lead.message
          ? `
      <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Customer Note / Message:</div>
      <div class="message-box">
        <p>${lead.message}</p>
      </div>`
          : ""
      }

      <div class="btn-wrap">
        <a href="${adminConsoleUrl}" class="btn" target="_blank">View Lead in Admin Console →</a>
      </div>
    </div>
    <div class="footer">
      GateXPay Technologies Management Console &bull; Automated System Delivery
    </div>
  </div>
</body>
</html>
`;

  // Check if Resend API key is configured
  if (!resendApiKey) {
    console.log(
      `[Admin Email Notification] (Mock/Dry-Run - RESEND_API_KEY not set in .env.local)`
    );
    console.log(`To: ${adminEmail} | Subject: "${subject}"`);
    console.log(
      `Lead: ${lead.fullName} (${fullPhone}) - Service: ${lead.serviceCategory}`
    );

    // Record notification timestamp in DB if lead has an ID
    if (lead._id) {
      try {
        await Enquiry.findByIdAndUpdate(lead._id, {
          $set: { emailNotificationSentAt: new Date() },
        });
      } catch (err) {
        console.error("Failed to update emailNotificationSentAt:", err);
      }
    }

    return {
      success: true,
      loggedOnly: true,
      messageId: `mock_${Date.now()}`,
    };
  }

  // Live transactional email delivery via Resend API
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[Admin Email Error from Resend]:", data);
      return {
        success: false,
        error: data.message || "Resend API returned an error",
      };
    }

    // Mark as sent in DB
    if (lead._id) {
      await Enquiry.findByIdAndUpdate(lead._id, {
        $set: { emailNotificationSentAt: new Date() },
      });
    }

    return {
      success: true,
      messageId: data.id,
    };
  } catch (error) {
    console.error("[Admin Email Delivery Exception]:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}

/**
 * Diagnostic helper to test the email notification service
 */
export async function testAdminEmailService(targetEmail?: string) {
  const adminEmail = targetEmail || process.env.ADMIN_EMAIL || "admin@gatexpay.com";

  return sendAdminLeadNotification({
    _id: "test_verification_" + Date.now(),
    fullName: "Adit Sharma (Test)",
    companyName: "Sharma Retailers Pvt Ltd",
    email: "adit@sharmaretail.in",
    phone: "9822334455",
    countryCode: "+91",
    serviceCategory: "Payment Gateway Integration",
    timeline: "Immediately",
    message: "This is a verified test lead sent from GateXPay Admin Console.",
    source: "contact_page",
    createdAt: new Date(),
  });
}
