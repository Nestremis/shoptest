import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ShopModule } from './shop/shop.module';
// import { BasketModule } from './basket/basket.module';
import { BasketService } from './basket/basket.service';
import { BasketController } from './basket/basket.controller';

@Module({
  imports: [],
  // BasketModule, ShopModule],
  controllers: [AppController, BasketController],
  providers: [AppService, BasketService],
})
export class AppModule {}
