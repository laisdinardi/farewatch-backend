const nodemailer = require('nodemailer');
const { logger } = require('../utils/logger');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

function formatBRL(amount) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}

function buildEmailHTML({ route, priceData, analysis, userName }) {
  const discountLabel = analysis.is50Deal ? '🔥 50%+ OFF' : '📉 20%+ OFF';
  const bgColor = analysis.is50Deal ? '#dc2626' : '#2563eb';
  const discountBadge = analysis.is50Deal ? '🔥 MEGA DEAL' : '📉 GREAT DEAL';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flight Deal Alert - FareWatch</title>
</head>
<body style="margin:0; padding:0; background:#f5f5f5; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width:600px; margin:32px auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background:#000; padding:24px 32px; text-align:center;">
      <h1 style="color:#fff; margin:0; font-size:22px; letter-spacing:2px; font-weight:300;">FAREWATCH</h1>
      <p style="color:#999; margin:4px 0 0; font-size:12px; letter-spacing:1px;">FLIGHT DEAL ALERT</p>
    </div>

    <!-- Deal Badge -->
    <div style="background:${bgColor}; padding:16px 32px; text-align:center;">
      <span style="color:#fff; font-size:20px; font-weight:700; letter-spacing:1px;">${discountBadge}</span>
      <div style="color:rgba(255,255,255,0.9); font-size:14px; margin-top:4px;">${discountLabel} below average price</div>
    </div>

    <!-- Route -->
    <div style="padding:32px; border-bottom:1px solid #f0f0f0;">
      <div style="text-align:center; margin-bottom:24px;">
        <span style="font-size:36px; font-weight:700; letter-spacing:2px;">${route.origin_iata}</span>
        <span style="font-size:20px; color:#999; margin:0 16px;">→</span>
        <span style="font-size:36px; font-weight:700; letter-spacing:2px;">${route.destination_iata}</span>
      </div>
      <div style="text-align:center; color:#666; font-size:14px;">
        ${route.origin_city || route.origin_iata} → ${route.destination_city || route.destination_iata}
      </div>
      ${route.travel_date ? `<div style="text-align:center; color:#666; font-size:13px; margin-top:4px;">📅 ${new Date(route.travel_date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>` : ''}
      ${route.flexible_month ? `<div style="text-align:center; color:#666; font-size:13px; margin-top:4px;">📅 ${new Date(route.flexible_month + '-01').toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}</div>` : ''}
    </div>

    <!-- Price Comparison -->
    <div style="padding:32px; background:#fafafa;">
      <table style="width:100%; border-collapse:collapse;">
        <tr>
          <td style="padding:12px; text-align:center; width:50%;">
            <div style="font-size:12px; color:#999; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Deal Price</div>
            <div style="font-size:32px; font-weight:700; color:#16a34a;">${formatBRL(priceData.price_brl)}</div>
          </td>
          <td style="padding:12px; text-align:center; width:50%; border-left:1px solid #e5e5e5;">
            <div style="font-size:12px; color:#999; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Normal Price</div>
            <div style="font-size:32px; font-weight:700; color:#999; text-decoration:line-through;">${formatBRL(analysis.baseline)}</div>
          </td>
        </tr>
      </table>
      
      <div style="text-align:center; margin-top:16px; padding:12px; background:#fff; border-radius:6px; border:1px solid #e5e5e5;">
        <span style="font-size:14px; color:#666;">You save: </span>
        <span style="font-size:18px; font-weight:700; color:#16a34a;">${formatBRL(analysis.savingsAmount)}</span>
        <span style="font-size:14px; color:#16a34a;"> (${Math.round(analysis.discountPercent)}% off)</span>
      </div>
    </div>

    <!-- Details -->
    <div style="padding:24px 32px; border-bottom:1px solid #f0f0f0;">
      ${priceData.airline && priceData.airline !== 'Unknown' ? `
      <div style="margin-bottom:8px; font-size:14px; color:#666;">
        ✈️ <strong>Airline:</strong> ${priceData.airline}
      </div>` : ''}
      ${priceData.stops !== undefined ? `
      <div style="margin-bottom:8px; font-size:14px; color:#666;">
        🛑 <strong>Stops:</strong> ${priceData.stops === 0 ? 'Direct flight' : `${priceData.stops} stop(s)`}
      </div>` : ''}
      ${priceData.duration_minutes ? `
      <div style="margin-bottom:8px; font-size:14px; color:#666;">
        ⏱️ <strong>Duration:</strong> ${Math.floor(priceData.duration_minutes / 60)}h ${priceData.duration_minutes % 60}m
      </div>` : ''}
    </div>

    <!-- CTA -->
    <div style="padding:32px; text-align:center;">
      <a href="${priceData.booking_link || '#'}" 
         style="display:inline-block; background:#000; color:#fff; padding:16px 40px; border-radius:4px; text-decoration:none; font-size:16px; font-weight:600; letter-spacing:1px;">
        BOOK NOW →
      </a>
      <p style="color:#999; font-size:12px; margin-top:16px;">Prices change quickly. Book before it's gone!</p>
    </div>

    <!-- Footer -->
    <div style="background:#f5f5f5; padding:20px 32px; text-align:center; border-top:1px solid #e5e5e5;">
      <p style="color:#999; font-size:12px; margin:0;">
        This alert was sent by FareWatch for ${userName || 'you'} | 
        <a href="${process.env.FRONTEND_URL}/settings" style="color:#999;">Manage alerts</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

async function sendDealAlert({ user, route, priceData, analysis }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    logger.warn('Email not configured, skipping email alert');
    return false;
  }

  try {
    const mailer = getTransporter();
    const discountLabel = analysis.is50Deal ? '🔥 50%+ DEAL' : '📉 20%+ DEAL';

    await mailer.sendMail({
      from: process.env.EMAIL_FROM || `"FareWatch" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: `${discountLabel}: ${route.origin_iata} → ${route.destination_iata} por ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceData.price_brl)}`,
      html: buildEmailHTML({ route, priceData, analysis, userName: user.name }),
    });

    logger.info(`Email alert sent to ${user.email}`, {
      route: `${route.origin_iata}-${route.destination_iata}`,
      price: priceData.price_brl,
    });
    return true;
  } catch (err) {
    logger.error('Failed to send email alert:', err);
    return false;
  }
}

module.exports = { sendDealAlert };