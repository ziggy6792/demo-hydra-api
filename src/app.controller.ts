import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Headers } from '@nestjs/common';
import { verifyWithHydra } from './verify-with-hydra';
import { verifyWithJwk } from './verify-with-jwk';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // async getHello(@Headers() headers): Promise<any> {
  //   const accessToken = headers.authorization;
  //   const decoded = await verifyWithHydra(accessToken);
  //   if (!decoded.data.active) throw new Error('Token expired');
  //   return decoded.data;
  // }

  @Get()
  async getHello(@Headers() headers): Promise<any> {
    const accessToken = headers.authorization;
    const decoded = verifyWithJwk(accessToken);
    return decoded;
  }
}
