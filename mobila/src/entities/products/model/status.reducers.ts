import { createFeature, createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';

export const STATUS_FEATURE_KEY = 'status';

export interface StatusState {
  error: string | null;
  loading: boolean;
  loaded: boolean;
}

export const initialState: StatusState = {
  error: null,
  loading: false,
  loaded: false,
};

export const statusReducer = createReducer(
  initialState,
  on(
    ProductActions.loadAllProducts,
    ProductActions.createProduct,
    ProductActions.updateProduct,
    ProductActions.deleteProduct,
    ProductActions.createCompatibleProduct,
    (state): StatusState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })
  ),
  on(
    ProductActions.loadAllProductsSuccess,
    ProductActions.createProductSuccess,
    ProductActions.updateProductSuccess,
    ProductActions.deleteProductSuccess,
    ProductActions.createCompatibleProductSuccess,
    (state): StatusState => ({
      ...state,
      loading: false,
      loaded: true,
      error: null,
    })
  ),
  on(
    ProductActions.loadAllProductsFailure,
    ProductActions.createProductFailure,
    ProductActions.updateProductFailure,
    ProductActions.deleteProductFailure,
    ProductActions.createCompatibleProductFailure,
    (state, { error }): StatusState => ({
      ...state,
      loading: false,
      loaded: true,
      error,
    })
  )
);
