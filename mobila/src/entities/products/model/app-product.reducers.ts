import * as fromProduct from './product.reducers';
import * as fromStatus from './status.reducers';
import { combineReducers, createFeatureSelector } from '@ngrx/store';

export const APP_PRODUCT_FEATURE_KEY = 'productsData';

export interface AppProductState {
  [fromProduct.PRODUCT_FEATURE_KEY]: fromProduct.ProductState;
  [fromStatus.STATUS_FEATURE_KEY]: fromStatus.StatusState;
}

export const appProductReducer = (state: AppProductState | undefined, action: any) => {
  return combineReducers({
    [fromProduct.PRODUCT_FEATURE_KEY]: fromProduct.productReducer,
    [fromStatus.STATUS_FEATURE_KEY]: fromStatus.statusReducer,
  })(state, action);
};

export const appProductFeatureSelector = createFeatureSelector<AppProductState>(APP_PRODUCT_FEATURE_KEY);
