import { Module } from '@nestjs/common';
import { ServicesModule } from '../shared/services/services.module';
import { MotorGatewayGateway } from './motor-gateway/motor-gateway.gateway';

@Module({
  imports: [ServicesModule],
  controllers: [],
  providers: [MotorGatewayGateway],
})
export class GatewayModule {}
