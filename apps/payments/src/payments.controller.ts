import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/common';
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';
import { PaymentsService } from './payments.service';

@Controller()
@PaymentsServiceControllerMethods()
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe())
  async createCharge(data: PaymentCreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
