import { Module, forwardRef } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { BasketModule } from 'src/basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
import { BasketService } from 'src/basket/basket.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopItem]),
    forwardRef(() => BasketModule),
  ],
  controllers: [ShopController],
  providers: [ShopService, BasketService],
  exports: [ShopService],
})
export class ShopModule {}
