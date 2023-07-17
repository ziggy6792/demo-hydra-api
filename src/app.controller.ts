import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
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
  //   if (!decoded.data.active)
  //     throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //   return decoded.data;
  // }

  @Get()
  async getHello(@Headers() headers): Promise<any> {
    const accessToken = headers.authorization;
    try {
      const decoded = verifyWithJwk(accessToken);
      return decoded;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
