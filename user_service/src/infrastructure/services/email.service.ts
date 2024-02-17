import { Transporter, createTransport } from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: Transporter = createTransport({
    service: process.env.MAILER_SERVICE,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, html, attachments = [] } = options;

    try {
      (await this.transporter.sendMail({
        to,
        subject,
        html,
        attachments,
      })) as SendMailOptions;

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
