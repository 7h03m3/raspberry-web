import { Test, TestingModule } from '@nestjs/testing';
import { MotorGatewayGateway } from './motor-gateway.gateway';

describe('MotorGatewayGateway', () => {
  let gateway: MotorGatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotorGatewayGateway],
    }).compile();

    gateway = module.get<MotorGatewayGateway>(MotorGatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
