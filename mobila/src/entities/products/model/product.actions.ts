import { createAction, props } from '@ngrx/store';
import { ShopCategory, CategoryType, CategoryProducts } from '../api';

export const loadAllProducts = createAction('[Products] Load All Product');
export const loadAllCompatibleProducts = createAction(
  '[Products] Load All Product compatible with certain product',
  props<{ id: string | number; categoryOfCertainProduct: ShopCategory; category: ShopCategory }>()
);
export const createProduct = createAction(
  '[Products] Create Product',
  props<{ category: ShopCategory; product: CategoryType }>()
);
export const createCompatibleProduct = createAction(
  '[Products] Create Product To Other Category',
  props<{
    fromCategory: ShopCategory;
    idLinkedProduct: string;
    category: ShopCategory;
    product: CategoryType;
  }>()
);
export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ category: ShopCategory; product: CategoryType }>()
);
export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ category: ShopCategory; id: string }>()
);

//success
export const loadAllProductsSuccess = createAction(
  '[Products] Load All Product Success',
  props<{ products: CategoryProducts }>()
);
export const loadAllCompatibleProductsSuccess = createAction(
  '[Products] Load All Product compatible with certain product',
  props<{ category: ShopCategory; productsOfCategory: CategoryType[] }>()
);
export const createProductSuccess = createAction(
  '[Products] Create Product Success',
  props<{ category: ShopCategory; product: CategoryType }>()
);
export const createCompatibleProductSuccess = createAction(
  '[Products] Create Product To Other Category Success',
  props<{ category: ShopCategory; product: CategoryType }>()
);
export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  props<{ category: ShopCategory; product: CategoryType }>()
);
export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success',
  props<{ category: ShopCategory; productId: string | number }>()
);

//failure
export const createProductFailure = createAction(
  '[Products] Create Product Failure',
  props<{ category: ShopCategory; error: any }>()
);
export const createCompatibleProductFailure = createAction(
  '[Products] Create Product To Other Category failure',
  props<{ category: ShopCategory; error: any }>()
);
export const loadAllProductsFailure = createAction(
  '[Products] Load All Products Failure',
  props<{ error: any }>()
);
export const loadAllCompatibleProductsFailure = createAction(
  '[Products] Load All Product compatible with certain product Failure',
  props<{ error: any }>()
);
export const updateProductFailure = createAction(
  '[Products] Update Product Failure',
  props<{ category: ShopCategory; error: any }>()
);
export const deleteProductFailure = createAction(
  '[Products] Delete Product Failure',
  props<{ category: ShopCategory; error: any }>()
);
