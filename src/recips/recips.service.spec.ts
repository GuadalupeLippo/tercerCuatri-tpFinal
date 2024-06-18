import { Test, TestingModule } from '@nestjs/testing';
import { RecipsService } from './recips.service';

describe('RecipsService', () => {
  let service: RecipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipsService],
    }).compile();

    service = module.get<RecipsService>(RecipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
