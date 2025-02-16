import {
  NOTIFICATIONS_SERVICE,
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import Stripe from 'stripe';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentsService {
  private notificationsService: NotificationsServiceClient;
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly client: ClientGrpc,
  ) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2025-01-27.acacia',
    },
  );

  async createCharge({ card, amount, email }: PaymentCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card: {
    //     cvc: card.cvc,
    //     exp_month: card.expMonth,
    //     exp_year: card.expYear,
    //     number: card.number,
    //   },
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      confirm: true,
      payment_method_types: ['card'],
    });

    if (!this.notificationsService) {
      this.notificationsService =
        this.client.getService<NotificationsServiceClient>(
          NOTIFICATIONS_SERVICE_NAME,
        );
    }
    this.notificationsService
      .notifyEmail({
        email,
        text: `Your payment of $${amount} has completed successfully!`,
      })
      .subscribe(() => {});

    return paymentIntent;
  }
}
