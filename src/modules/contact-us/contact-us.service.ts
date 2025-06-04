import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactUsDto } from '../../common/dto/create-contact-us.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactUsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactUsDto: CreateContactUsDto) {
    const contact = await this.prisma.contactUs.create({
      data: createContactUsDto,
    });

    // بعد ما يخزن الرسالة، ابعت إيميل شكر
    await this.sendThankYouEmail(contact.email, contact.name);

    return contact;
  }

  async findAll() {
    return this.prisma.contactUs.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.contactUs.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.contactUs.delete({ where: { id } });
  }

  // تابع لإرسال إيميل شكر (يمكنك تعديل الإعدادات حسب حسابك)
  private async sendThankYouEmail(email: string, name: string) {
    // إعداد transporter (يفضل تستخدم App Password لو حساب Gmail مفعّل 2FA)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mohamedabdelazim654@gmail.com', // اكتب هنا إيميلك
        pass: 'lbnh xhpo irec hkup', // هنا app password من جوجل مش الباس العادي
      },
    });

    // شكل الرسالة (تيمبلت بالإنجليزي)
    const mailOptions = {
      from: '"chemitec" <mohamedabdelazim654@gmail.com>',
      to: email,
      subject: 'Thank You for Contacting Us!',
      html: `
        <div style="font-family:sans-serif; max-width:600px; margin:auto;">
          <h2 style="color:#3B82F6;">Thank You, ${name}!</h2>
          <p>We have received your message. Our team will get in touch with you as soon as possible.</p>
          <p style="margin: 24px 0; background: #F3F4F6; padding: 20px; border-radius: 8px;">
            <strong>In the meantime, feel free to check our website for more information and updates.</strong>
          </p>
          <p>Best regards,<br>Your Company Team</p>
          <hr />
          <small>This is an automated message. Please do not reply to this email.</small>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  }
}
