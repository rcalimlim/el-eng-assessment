import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodtrucksModule } from './foodtrucks/foodtrucks.module';

@Module({
  imports: [FoodtrucksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
