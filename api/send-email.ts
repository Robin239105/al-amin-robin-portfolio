import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import Busboy from 'busboy';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const busboy = Busboy({ headers: req.headers });
    const fields: Record<string, string> = {};
    let fileBuffer: Buffer | null = null;
    let fileName = '';
    let fileMime = '';

    busboy.on('field', (fieldname, val) => {
      fields[fieldname] = val;
    });

    busboy.on('file', (fieldname, file, info) => {
      const { filename, mimeType } = info;
      fileName = filename;
      fileMime = mimeType;

      const chunks: Buffer[] = [];
      file.on('data', (chunk) => {
        chunks.push(chunk);
      });

      file.on('end', () => {
        fileBuffer = Buffer.concat(chunks);
      });
    });

    busboy.on('finish', async () => {
      const { name, email, projectType, budget, timeline, message } = fields;

      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields (Name, Email, Message).' });
      }

      // Configure SMTP from Environment Variables
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpPort = parseInt(process.env.SMTP_PORT || '587');
      const smtpUser = process.env.SMTP_USER || 'contact@alaminrobin.com';
      const smtpPass = process.env.SMTP_PASSWORD;

      if (!smtpPass) {
        return res.status(500).json({
          success: false,
          message: 'SMTP credentials not configured on Vercel. Please set SMTP_PASSWORD in Vercel Environment Variables.'
        });
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // HTML Template Matching the Dark Mode Accent Glow Theme
      const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            background-color: #0A0A0C;
            color: #E2E8F0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .wrapper {
            background-color: #0A0A0C;
            padding: 40px 20px;
          }
          .container {
            background: #111115;
            border: 1px solid #222228;
            border-radius: 24px;
            max-width: 600px;
            margin: 0 auto;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          }
          .header {
            background: linear-gradient(135deg, #FA8334 0%, #EA580C 100%);
            padding: 30px 40px;
          }
          .header h1 {
            color: #0A0A0C;
            font-size: 24px;
            font-weight: 800;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .header p {
            color: rgba(10, 10, 12, 0.8);
            font-size: 14px;
            font-weight: 600;
            margin: 5px 0 0 0;
          }
          .content {
            padding: 40px;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .details-table td {
            padding: 12px 0;
            border-bottom: 1px solid #222228;
            font-size: 14px;
          }
          .details-table td.label {
            color: #FA8334;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 1.5px;
            width: 130px;
          }
          .details-table td.value {
            color: #FFFFFF;
            font-weight: 500;
          }
          .message-container {
            background: #18181F;
            border-left: 3px solid #FA8334;
            border-radius: 8px;
            padding: 20px;
            margin-top: 10px;
            margin-bottom: 30px;
          }
          .message-container p {
            color: #94A3B8;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
            white-space: pre-wrap;
          }
          .footer {
            background: #0A0A0C;
            padding: 24px 40px;
            border-top: 1px solid #222228;
            text-align: center;
          }
          .footer p {
            color: #64748B;
            font-size: 11px;
            margin: 0;
          }
          .attachment-badge {
            display: inline-flex;
            align-items: center;
            background: rgba(250, 131, 52, 0.1);
            border: 1px solid rgba(250, 131, 52, 0.2);
            color: #FA8334;
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>Project Brief</h1>
              <p>New request submitted via alaminrobin.com (Vercel Serverless)</p>
            </div>
            <div class="content">
              <table class="details-table">
                <tr>
                  <td class="label">Client Name</td>
                  <td class="value">${name}</td>
                </tr>
                <tr>
                  <td class="label">Client Email</td>
                  <td class="value"><a href="mailto:${email}" style="color: #FA8334; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td class="label">Project Type</td>
                  <td class="value">${projectType}</td>
                </tr>
                <tr>
                  <td class="label">Est. Budget</td>
                  <td class="value">${budget}</td>
                </tr>
                <tr>
                  <td class="label">Est. Timeline</td>
                  <td class="value">${timeline}</td>
                </tr>
              </table>

              <div style="color: #FA8334; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1.5px; margin-bottom: 10px;">Message Detail</div>
              <div class="message-container">
                <p>${message}</p>
              </div>

              ${fileBuffer ? `
              <div style="color: #FA8334; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 1.5px; margin-bottom: 5px;">Attached Document</div>
              <div class="attachment-badge">
                📁 File Attached: ${fileName}
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Al Amin Robin. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
      `;

      const mailOptions: nodemailer.SendMailOptions = {
        from: `"${name}" <${smtpUser}>`,
        to: 'contact@alaminrobin.com',
        replyTo: email,
        subject: `🔥 New Vercel Project Brief: ${projectType} from ${name}`,
        html: htmlBody,
      };

      if (fileBuffer) {
        mailOptions.attachments = [
          {
            filename: fileName,
            content: fileBuffer,
            contentType: fileMime,
          },
        ];
      }

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true });
    });

    req.pipe(busboy);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    return res.status(500).json({ success: false, message: err.message || 'Server error processing request.' });
  }
}
