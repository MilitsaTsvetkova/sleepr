import { Controller } from '@nestjs/common';

@Controller('/')
export class HealthController {
  constructor() {}

  getHealth(): boolean {
    return true;
  }
}
