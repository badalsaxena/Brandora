import nodemailer from 'nodemailer';

const recipient = process.env.LEADS_EMAIL || 'brandoraagencyy1@gmail.com';

function getTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Email delivery is not configured. Set SMTP_USER and SMTP_PASS.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export async function sendEnquiryEmail(enquiry) {
  const transporter = getTransporter();
  const subject = `New Brandora lead: ${enquiry.fullName} — ${enquiry.businessName}`;

  try {
    await transporter.verify();
    console.log('[email] SMTP verification succeeded');
  } catch (error) {
    console.error(`[email] SMTP verification failed: ${error.message}`);
    throw error;
  }

  console.log('[email] Sending enquiry notification');
  await transporter.sendMail({
    from: `"Brandora Website" <${process.env.SMTP_USER}>`,
    to: recipient,
    replyTo: process.env.SMTP_USER,
    subject,
    text: [
      'A new enquiry was submitted on the Brandora website.',
      '',
      `Full name: ${enquiry.fullName}`,
      `Business name: ${enquiry.businessName}`,
      `Phone: ${enquiry.phone}`,
      `Package: ${enquiry.package}`,
      `Location: ${enquiry.location}`,
      '',
      'Project requirements:',
      enquiry.requirements
    ].join('\n')
  });
  console.log('[email] Email sent successfully');
}
