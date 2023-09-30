import { Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from '../interfaces/shop';

@Injectable()
export class ShopService {
  getProducts(): GetListOfProductsResponse {
    return [
      {
        name: 'bike',
        description: 'spec',
        price: 5500,
      },
      {
        name: 'helmet',
        description: 'bell',
        price: 300,
      },
      {
        name: 'counter',
        description: 'blackburn',
        price: 100,
      },
    ];
  }
}
