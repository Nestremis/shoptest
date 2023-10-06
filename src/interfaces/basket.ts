import { AddProductDto } from 'src/basket/dto/add-product.dto';

export type AddProductToBasketResponse =
  | {
      isSuccess: true;
      index: number;
    }
  | {
      isSuccess: false;
    };

export interface RemoveProductFromBasketResponse {
  isSuccess: boolean;
}

export type ListProductsInBasketResponse = AddProductDto[];

// eslint-disable-next-line prettier/prettier
export type GetTotalPriceResponse = number
  | { isSuccess: false; alternativeBasket: AddProductDto[] };
