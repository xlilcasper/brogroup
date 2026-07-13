/**
 * BRO - Brothers Reclaiming Ourselves
 * Cloudflare Worker
 */

async function handleContact(request, env) {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    if (!name || !email || !category || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400, headers: corsHeaders });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address.' }), { status: 400, headers: corsHeaders });
    }

    const categoryLabels = {
      'meeting-questions': 'Meeting Questions',
      'referral': 'Referral',
      'volunteering': 'Volunteering',
      'other': 'Other'
    };
    const categoryLabel = categoryLabels[category] || category;

    const emailHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" />
<style>
body{font-family:Inter,Arial,sans-serif;background:#f9f9f9;margin:0;padding:20px}
.container{max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.header{background:#1a1a2e;color:#E2B04A;padding:24px 32px}
.header h1{margin:0;font-size:20px}
.header p{margin:4px 0 0;opacity:0.7;font-size:13px}
.body{padding:24px 32px}
.field{margin-bottom:16px}
.label{font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#888;font-weight:600;margin-bottom:4px}
.value{font-size:15px;color:#1a1a2e}
.message-box{background:#f5f5f5;border-left:3px solid #E2B04A;padding:12px 16px;border-radius:4px;font-size:15px;line-height:1.6;white-space:pre-wrap}
.reply-btn{display:inline-block;margin-top:24px;background:#E2B04A;color:#1a1a2e;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;font-size:14px}
.footer{padding:16px 32px;border-top:1px solid #eee;font-size:12px;color:#999}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>New Contact Form Submission</h1>
    <p>BRO — Brothers Reclaiming Ourselves</p>
  </div>
  <div class="body">
    <div class="field"><div class="label">Name</div><div class="value">${escapeHtml(name)}</div></div>
    <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div></div>
    <div class="field"><div class="label">Category</div><div class="value">${escapeHtml(categoryLabel)}</div></div>
    <div class="field"><div class="label">Message</div><div class="message-box">${escapeHtml(message)}</div></div>
    <a href="mailto:${escapeHtml(email)}?subject=Re: BRO Contact" class="reply-btn">Reply to ${escapeHtml(name)}</a>
  </div>
  <div class="footer">Sent via brogroup.org/contact</div>
</div>
</body>
</html>`;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `BRO Contact <info@brogroup.org>`,
        to: env.NOTIFY_EMAIL,
        reply_to: email,
        subject: `[BRO] ${categoryLabel} — from ${name}`,
        html: emailHtml
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend error:', errText);
      return new Response(JSON.stringify({ error: 'Failed to send. Please try again.' }), { status: 500, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });

  } catch (err) {
    console.error('Contact error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error.' }), { status: 500, headers: corsHeaders });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.pathname === '/api/contact' && event.request.method === 'POST') {
    event.respondWith(handleContact(event.request, env));
    return;
  }

  event.respondWith(env.ASSETS.fetch(event.request));
});
