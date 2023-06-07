import { CategoryType, ShopCategory } from '../api';

export interface FilterConfig {
  category: ShopCategory;
  maxPrice?: number;
  minPrice?: number;
  name?: string;
}

export interface FilteredProduct {
  payload: CategoryType;
  enabled: boolean;
}
