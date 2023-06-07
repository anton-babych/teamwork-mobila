import { createReducer, on, Action, createFeature } from '@ngrx/store';
import {
  createProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
  loadAllProductsSuccess,
  loadAllCompatibleProductsSuccess,
  createCompatibleProductSuccess,
} from './product.actions';
import { Phone, Headphones, CategoryType, CategoryProducts } from '../api';
import { ShopCategory } from '../api';
import { state } from '@angular/animations';

export const PRODUCT_FEATURE_KEY = 'products';

export interface ProductState extends CategoryProducts {}

const initialProductState: ProductState = Object.values(ShopCategory).reduce(
  (state: ProductState, category: ShopCategory) => {
    state[category] = [];
    return state;
  },
  {}
);

export function productReducer(state: ProductState | undefined, action: Action) {
  return reducer(state, action);
}
const reducer = createReducer<ProductState>(
  initialProductState,

  on(createProductSuccess, (state, { category, product }) => {
    return { ...state, [category]: [...state[category], product] };
  }),

  on(createCompatibleProductSuccess, (state, { category, product }) => {
    console.log('in reducers', category, product);
    return { ...state, [category]: [...state[category], product] };
  }),

  on(loadAllProductsSuccess, (state, { products }) => {
    const nextState: ProductState = { ...state };
    Object.keys(products).forEach((category) => {
      nextState[category] = products[category];
    });
    return nextState;
  }),

  on(updateProductSuccess, (state, { category, product }) => {
    return {
      ...state,
      [category]: state[category].map((x) => (x.id === product.id ? product : x)),
    };
  }),
  on(deleteProductSuccess, (state, { category, productId }) => {
    return { ...state, [category]: state[category].filter((s) => s.id !== productId) };
  })
);
