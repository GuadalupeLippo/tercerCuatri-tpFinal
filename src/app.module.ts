import { Module } from '@nestjs/common';
import { RecipsModule } from './recips/recips.module';

@Module({
  imports: [RecipsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
