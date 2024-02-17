import { EmailService } from '../../services/email.service';

interface SendEmailVerifyUseCase {
  execute: (to: string, token: string) => Promise<boolean>;
}

export class SendEmailVerify implements SendEmailVerifyUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(to: string, token: string) {
    const subject = 'TROCAR - Verificacion de usuario';
    const html = `
  <h3>Hola ${to} por favor verifica tu email ingresando al siguiente link:</h3>
  <a href='${process.env.URL_VERIFY}?token=${token}'>Verify your email</a>
  `;

    try {
      await this.emailService.sendEmail({
        to,
        subject,
        html,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
