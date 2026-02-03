import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloDto } from '@workspace/api';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): HelloDto {
    return {
      message: this.appService.getHello(),
    };
  }
}
