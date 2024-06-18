import { Module } from '@nestjs/common';
import { RecipsService } from './recips.service';
import { RecipsController } from './recips.controller';

@Module({
  controllers: [RecipsController],
  providers: [RecipsService],
})
export class RecipsModule {}
