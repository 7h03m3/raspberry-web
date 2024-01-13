import { Test, TestingModule } from '@nestjs/testing';
import { MotorApiService } from './motor-api.service';

describe('MotorApiService', () => {
  let service: MotorApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotorApiService],
    }).compile();

    service = module.get<MotorApiService>(MotorApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
