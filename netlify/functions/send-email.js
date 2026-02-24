const nodemailer = require('nodemailer');
const twilio = require('twilio');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Metodo no permitido' })
    };
  }

  try {
    const { tipo, guestEmail, mensaje } = JSON.parse(event.body);

    const TU_EMAIL = 'maycoljhordan07@gmail.com';
    const TU_NUMERO = '+51932387692';
    const NUMERO_MABEL = '+51932387692';

    // Configurar Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Configurar Twilio
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    if (tipo === 'aceptar') {
      
      // ========== CORREO 1: PARA MABEL (Confirmacion bonita) ==========
      const emailParaMabel = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
            .container { max-width: 580px; margin: 0 auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.25); }
            .header { background: linear-gradient(135deg, #FF6B9D 0%, #FF8E7F 100%); padding: 50px 30px; text-align: center; position: relative; }
            .header::before { content: ''; position: absolute; top: -30px; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; background: white; border-radius: 50%; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header h1 { color: white; margin: 30px 0 8px; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; }
            .header p { color: rgba(255,255,255,0.9); font-size: 15px; font-weight: 500; letter-spacing: 0.5px; }
            .emoji-large { font-size: 70px; margin-bottom: 15px; }
            .content { padding: 45px 35px; text-align: center; background: #ffffff; }
            .message { font-size: 16px; color: #404040; line-height: 1.8; margin-bottom: 35px; font-weight: 400; }
            .message strong { color: #FF6B9D; font-weight: 600; }
            .info-box { background: linear-gradient(135deg, #fff5f7 0%, #ffe8f0 100%); border: none; border-radius: 16px; padding: 28px; margin: 30px 0; text-align: left; border-left: 5px solid #FF6B9D; }
            .info-box h3 { color: #FF6B9D; margin: 0 0 22px; font-size: 17px; text-align: center; font-weight: 700; letter-spacing: 0.3px; }
            .info-row { display: flex; align-items: center; margin: 14px 0; font-size: 15px; color: #404040; }
            .info-row .icon { font-size: 22px; margin-right: 14px; width: 24px; }
            .info-row strong { color: #FF6B9D; font-weight: 600; min-width: 90px; }
            .user-message { background: linear-gradient(135deg, #ffeef2 0%, #fff0f5 100%); border-left: 5px solid #FF6B9D; padding: 22px; margin: 30px 0; border-radius: 12px; text-align: left; }
            .user-message h4 { color: #FF6B9D; margin: 0 0 10px; font-size: 15px; font-weight: 700; }
            .user-message p { color: #404040; margin: 0; font-style: italic; line-height: 1.6; font-size: 15px; }
            .signature { margin-top: 35px; color: #FF6B9D; font-size: 16px; font-weight: 600; }
            .footer { background: linear-gradient(135deg, #FF6B9D 0%, #FF8E7F 100%); color: white; padding: 25px; text-align: center; font-size: 13px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="emoji-large">✨</div>
              <h1>¡Sorpresa Confirmada!</h1>
              <p>Tu invitación especial está lista 🎁</p>
            </div>
            <div class="content">
              <div style="font-size: 50px; margin-bottom: 25px;">💝</div>
              <p class="message">
                ¡Hola hermosa! Tu aceptación ha sido <strong>confirmada exitosamente</strong>.<br><br>
                Me emociona mucho poder compartir esta sorpresa especial contigo.
                Te espera un lugar lleno de magia y aventura con momentos inolvidables.
              </p>
              
              <div class="info-box">
                <h3>📋 Detalles de la Sorpresa</h3>
                <div class="info-row">
                  <span class="icon">📅</span>
                  <span><strong>Fecha:</strong> Jueves 26 de Febrero 2026</span>
                </div>
                <div class="info-row">
                  <span class="icon">⏰</span>
                  <span><strong>Hora:</strong> 10:00 AM - 10:30 AM</span>
                </div>
                <div class="info-row">
                  <span class="icon">🌟</span>
                  <span><strong>Lugar:</strong> Un lugar lleno de magia y aventura</span>
                </div>
                <div class="info-row">
                  <span class="icon">🎁</span>
                  <span><strong>Sorpresa:</strong> Algo muy emocionante te espera</span>
                </div>
              </div>
              
              ${mensaje ? `
              <div class="user-message">
                <h4>💌 Tu mensaje para mí:</h4>
                <p>"${mensaje}"</p>
              </div>
              ` : ''}
              
              <div class="signature">
                Con mucho cariño y esperando verte pronto,<br>
                <strong>Tu persona favorita 💖</strong>
              </div>
            </div>
            <div class="footer">
              📧 Notificación de confirmación<br>
              ¡Nos vemos el jueves 26 de Febrero! 🌟
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"Sorpresa Especial 🎁" <' + process.env.EMAIL_USER + '>',
        to: 'maycoljhordan07@gmail.com',
        subject: '🎁 Tu Sorpresa Especial está Confirmada - Jueves 26 de Febrero',
        html: emailParaMabel
      });

      // ========== CORREO 2: PARA TI MAYCOL (Notificacion con su respuesta) ==========
      const emailParaMaycol = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
            .container { max-width: 580px; margin: 0 auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.25); }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 50px 30px; text-align: center; }
            .header h1 { color: white; margin: 0 0 8px; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
            .badge { background: rgba(255,255,255,0.2); color: white; padding: 8px 20px; border-radius: 20px; display: inline-block; font-weight: 600; margin-top: 12px; font-size: 13px; letter-spacing: 0.5px; }
            .success-icon { font-size: 60px; text-align: center; margin: 30px 0; animation: bounce 1s ease-in-out; }
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
            .content { padding: 45px 35px; background: #ffffff; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
            .info-card { background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 14px; padding: 20px; text-align: center; border: 1px solid #e5e7eb; }
            .info-card .icon { font-size: 32px; margin-bottom: 10px; }
            .info-card .label { color: #6b7280; font-size: 13px; font-weight: 600; letter-spacing: 0.3px; text-transform: uppercase; margin-bottom: 6px; }
            .info-card .value { color: #111827; font-size: 15px; font-weight: 700; }
            .message-box { background: linear-gradient(135deg, #fef3f2 0%, #fde8e1 100%); border-left: 5px solid #f97316; border-radius: 12px; padding: 22px; margin: 25px 0; text-align: left; }
            .message-box h4 { color: #f97316; margin: 0 0 10px; font-size: 14px; font-weight: 700; }
            .message-box p { color: #5a5a5a; margin: 0; font-style: italic; line-height: 1.6; font-size: 15px; }
            .cta-section { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 28px; text-align: center; margin: 30px 0; border-radius: 14px; }
            .cta-section p { margin: 0; font-size: 16px; font-weight: 600; }
            .footer { background: #1f2937; color: #e5e7eb; padding: 25px; text-align: center; font-size: 12px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 ¡ELLA HA ACEPTADO! 🎉</h1>
              <div class="badge">✓ SORPRESA CONFIRMADA</div>
            </div>
            <div class="success-icon">🎁</div>
            <div class="content">
              
              <div class="info-grid">
                <div class="info-card">
                  <div class="icon">📅</div>
                  <div class="label">Fecha</div>
                  <div class="value">Jueves 26<br>de Febrero</div>
                </div>
                <div class="info-card">
                  <div class="icon">⏰</div>
                  <div class="label">Hora</div>
                  <div class="value">10:00 AM<br>- 10:30 AM</div>
                </div>
              </div>
              
              <div class="info-card" style="margin: 20px 0; grid-column: 1 / -1;">
                <div class="icon">🌟</div>
                <div class="label">Sorpresa</div>
                <div class="value">Un lugar lleno de magia y aventura</div>
              </div>
              
              <div class="info-card" style="margin: 20px 0; grid-column: 1 / -1;">
                <div class="icon">📧</div>
                <div class="label">Confirmación</div>
                <div class="value">${guestEmail}</div>
              </div>
              
              ${mensaje ? `
              <div class="message-box">
                <h4>💌 Mensaje de ella para ti:</h4>
                <p>"${mensaje}"</p>
              </div>
              ` : '<p style="text-align: center; color: #999; margin: 20px 0; font-size: 14px;">No dejó mensaje adicional, ¡pero aceptó! 🎊</p>'}
              
              <div class="cta-section">
                <p>✨ ¡Prepárate para revelar la sorpresa! ✨</p>
              </div>
            </div>
            <div class="footer">
              📧 Notificación automática - ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"Sistema de Sorpresa 🎁" <' + process.env.EMAIL_USER + '>',
        to: TU_EMAIL,
        subject: '🎉 ¡ELLA HA ACEPTADO! - Sorpresa Jueves 26 Febrero',
        html: emailParaMaycol
      });

      // ========== SMS PARA TI ==========
      await twilioClient.messages.create({
        body: `🎉 ¡ELLA HA ACEPTADO LA SORPRESA! El jueves 26 de Febrero (10:00-10:30 AM) tu sorpresa está confirmada. ${mensaje ? 'Su mensaje: "' + mensaje + '"' : '¡Sin mensaje pero aceptó!'}`,
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });

      // ========== SMS PARA MABEL ==========
      await twilioClient.messages.create({
        body: '💕 ¡Hola! Tu sorpresa especial está confirmada para el Jueves 26 de Febrero (10:00-10:30 AM). Un lugar lleno de magia y aventura te espera. ¡Nos vemos pronto! 🎁',
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: NUMERO_MABEL
      });

    } else {
      // ========== DECLINAR: CORREO PARA TI ==========
      const emailDecline = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
            .container { max-width: 580px; margin: 0 auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.25); }
            .header { background: linear-gradient(135deg, #64748b 0%, #475569 100%); padding: 50px 30px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
            .content { padding: 45px 35px; text-align: center; background: #ffffff; }
            .icon-container { font-size: 60px; margin: 25px 0; opacity: 0.8; }
            .message { font-size: 16px; color: #555555; line-height: 1.8; margin: 25px 0; font-weight: 400; }
            .message-box { background: linear-gradient(135deg, #fef2f2 0%, #ffe4e4 100%); border-left: 5px solid #94a3b8; border-radius: 12px; padding: 22px; margin: 25px 0; text-align: left; }
            .message-box h4 { color: #64748b; margin: 0 0 10px; font-size: 14px; font-weight: 700; }
            .message-box p { color: #555555; margin: 0; font-style: italic; line-height: 1.6; font-size: 15px; }
            .info-card { background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 14px; padding: 22px; margin: 25px 0; border: 1px solid #e2e8f0; }
            .info-card .label { color: #64748b; font-size: 13px; font-weight: 600; letter-spacing: 0.3px; margin-bottom: 8px; }
            .info-card .value { color: #1e293b; font-size: 16px; font-weight: 600; }
            .encouragement { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; margin: 25px 0; color: #78350f; font-weight: 500; font-size: 15px; }
            .footer { background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: #e2e8f0; padding: 25px; text-align: center; font-size: 12px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Notificación sobre tu sorpresa</h1>
            </div>
            <div class="content">
              <div class="icon-container">😔</div>
              
              <div class="info-card">
                <div class="label">📅 SORPRESA PROGRAMADA PARA</div>
                <div class="value">Jueves 26 de Febrero</div>
              </div>
              
              <div class="message">
                Lamentablemente, la sorpresa ha sido <strong>declinada</strong>.
              </div>
              
              ${mensaje ? `
              <div class="message-box">
                <h4>💬 Mensaje de ella:</h4>
                <p>"${mensaje}"</p>
              </div>
              ` : '<div class="message-box"><p style="color: #666; margin: 0;">No dejó ningún mensaje adicional.</p></div>'}
              
              <div class="encouragement">
                <strong>💪 No te desanimes</strong> — Habrá más oportunidades para compartir momentos especiales. ¡Ánimo! 💙
              </div>
              
              <p style="color: #999; font-size: 14px; margin-top: 25px;">Seguiremos intentando en la próxima oportunidad.</p>
            </div>
            <div class="footer">
              📧 Notificación automática - ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"Sistema de Sorpresa 🎁" <' + process.env.EMAIL_USER + '>',
        to: TU_EMAIL,
        subject: 'Mabel ha declinado la sorpresa del 26 de Febrero',
        html: emailDecline
      });

      // SMS para ti
      await twilioClient.messages.create({
        body: 'Mabel ha declinado la sorpresa del Jueves 26 de Febrero. ' + (mensaje ? 'Mensaje: "' + mensaje + '"' : 'Sin mensaje.'),
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, mensaje: 'Correos y SMS enviados' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
