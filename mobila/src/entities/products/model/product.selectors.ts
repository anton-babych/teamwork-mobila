import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCT_FEATURE_KEY, ProductState } from './product.reducers';
import { appProductFeatureSelector } from './app-product.reducers';
import { ShopCategory } from '../api';
import { FilterConfig } from './product.models';

const productsFeatureSelector = createSelector(
  appProductFeatureSelector,
  (state) => state[PRODUCT_FEATURE_KEY]
);

export const selectCategoryProductById = (id: string, category: ShopCategory) =>
  createSelector(productsFeatureSelector, (state) => state[category].find((x) => x.id?.toString() === id));
export const selectAllCategoryProducts = (category: ShopCategory) =>
  createSelector(productsFeatureSelector, (state) => state[category]);

export const selectAllProducts = createSelector(productsFeatureSelector, (state) => state);
export const selectAllCompatibleProducts = (category: ShopCategory) =>
  createSelector(productsFeatureSelector, (state) => state);
