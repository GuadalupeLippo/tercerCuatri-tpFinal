import { Test, TestingModule } from '@nestjs/testing';
import { RecipsController } from './recips.controller';
import { RecipsService } from './recips.service';

describe('RecipsController', () => {
  let controller: RecipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipsController],
      providers: [RecipsService],
    }).compile();

    controller = module.get<RecipsController>(RecipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
