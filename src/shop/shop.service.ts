import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  GetListOfProductsResponse,
  GetPaginatedListOfProductsResponse,
} from '../interfaces/shop';
import { BasketService } from 'src/basket/basket.service';
// import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
// import { Repository } from 'typeorm/repository/Repository';
// import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  async getProducts(
    currentPage = 1,
  ): Promise<GetPaginatedListOfProductsResponse> {
    const maxPerPage = 3;

    const [items, count] = await ShopItem.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const pagesCount = Math.ceil(count / maxPerPage);

    return {
      items,
      pagesCount,
    };
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).items.some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).items.find((item) => item.name === name)
      .price;
  }

  // async getOneProduct(id: string): Promise<ShopItem> {
  //   return this.shopItemRepository.findOne(id);
  // }

  async getOneProduct(id: string): Promise<ShopItem> {
    return ShopItem.findOneOrFail({ where: { id } });
  }

  async removeProduct(id: string) {
    await ShopItem.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.price = 100;
    newItem.name = 'Bicycle';
    newItem.description = 'Opis roweru';

    await ShopItem.save(newItem);

    return newItem;
  }

  async addBoughtCounter(id: string) {
    await ShopItem.update(id, {
      wasEverBought: true,
    });

    const item = await ShopItem.findOneOrFail({ where: { id } });

    item.boughtCounter++;

    await item.save();
  }

  async findProducts(searchTerm: string): Promise<GetListOfProductsResponse> {
    return await ShopItem.find({
      select: ['id', 'price'],
      where: {
        description: searchTerm,
      },
    });
  }
}
