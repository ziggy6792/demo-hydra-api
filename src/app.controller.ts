import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Headers } from '@nestjs/common';
import { verifyWithHydra } from './verify-with-hydra';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Headers() headers): Promise<any> {
    console.log(headers);

    const accessToken = headers.authorization;

    const decoded = await verifyWithHydra(accessToken);

    if (!decoded.data.active) throw new Error('Token expired');

    return decoded.data;
  }
}
