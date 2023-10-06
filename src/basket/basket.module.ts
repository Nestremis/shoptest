import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [ShopModule],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
