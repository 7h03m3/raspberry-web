import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

const cFunctions = require('../build/Release/c-module-native');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
