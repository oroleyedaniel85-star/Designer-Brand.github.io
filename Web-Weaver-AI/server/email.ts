import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendQuoteEmail(data: {
  name: string;
  email: string;
  projectType: string;
  message: string;
  selectedDesigns?: string | null;
}) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "oroleyedaniel85@gmail.com",
    subject: `Design Quote Request from ${data.name}`,
    text: `
Name: ${data.name}
Email: ${data.email}
Project Type: ${data.projectType}
Selected Designs: ${data.selectedDesigns || "None"}

Message:
${data.message}
    `,
    replyTo: data.email,
  };

  return transporter.sendMail(mailOptions);
}
