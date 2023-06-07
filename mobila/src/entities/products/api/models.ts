export enum ShopCategory {
  Phones = 'phones',
  Headphones = 'headphones',
}

export interface Category {
  category: ShopCategory;
}

interface Product {
  id?: string;
  imagePath: string;
  price: number;
  description: string;
  firm: string;
  model: string;
}

export interface Phone extends Product {}
export interface Headphones extends Product {}

export interface RestSmartphone {
  id?: string;
  s_img: string;
  s_firm: string;
  smodel: string;
  s_price: number;
  s_des: string;
  headphones: RestHeadphones[];
}
export interface RestHeadphones {
  id?: string;
  h_img: string;
  h_firm: string;
  h_model: string;
  h_price: number;
  h_des: string;
}

export type RestCategoryType = RestSmartphone | RestHeadphones;
export type CategoryType = Phone | Headphones;

export type CategoryProducts = { [category: string]: CategoryType[] };

export const categoriesUrls: { [key in ShopCategory]: string } = {
  [ShopCategory.Phones]: 'smartphones',
  [ShopCategory.Headphones]: 'headphones',
};

export function getEmptyObjectByCategory(category: ShopCategory) {
  switch (category) {
    case ShopCategory.Phones:
      return { id: '', name: '', price: 0, imagePath: '', description: '', model: '', firm: '' } as Phone;
    case ShopCategory.Headphones:
      return {
        id: '',
        name: '',
        price: 0,
        imagePath: '',
        description: '',
        model: '',
        firm: '',
        smartphoneId: '',
      } as Headphones;
  }
  throw new Error('not implemented category');
}
