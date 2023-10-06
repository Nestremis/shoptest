import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GetListOfProductsResponse } from '../interfaces/shop';
import { BasketService } from 'src/basket/basket.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
import { Repository } from 'typeorm/repository/Repository';
// import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,

    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(): Promise<GetListOfProductsResponse> {
    return await this.shopItemRepository.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }

  // async getOneProduct(id: string): Promise<ShopItem> {
  //   return this.shopItemRepository.findOne(id);
  // }

  async getOneProduct(id: string): Promise<ShopItem> {
    return this.shopItemRepository.findOneOrFail({ where: { id } });
  }

  async removeProduct(id: string) {
    await this.shopItemRepository.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.price = 100;
    newItem.name = 'Bicycle';
    newItem.description = 'Opis roweru';

    await this.shopItemRepository.save(newItem);

    return newItem;
  }

  async addBoughtCounter(id: string) {
    const item = await this.shopItemRepository.findOneOrFail({ where: { id } });

    item.boughtCounter++;

    await this.shopItemRepository.save(item);
  }
}
