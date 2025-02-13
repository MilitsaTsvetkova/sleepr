import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import Stripe from 'stripe';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2025-01-27.acacia',
    },
  );

  async createCharge({ amount, email }: PaymentCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      confirm: true,
      payment_method_types: ['card'],
    });

    this.notificationService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has completed successfully!`,
    });

    return paymentIntent;
  }
}
