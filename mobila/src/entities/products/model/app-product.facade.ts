import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  loadAllProducts,
  createCompatibleProduct,
} from './product.actions';
import { Observable } from 'rxjs';
import { ShopCategory, CategoryType, Phone, Headphones, ProductService } from '../api';
import { FilterConfig } from './product.models';
import { selectCategoryProductById, selectAllCategoryProducts, selectAllProducts } from './product.selectors';
import { selectError, selectLoaded, selectLoading } from './status.selectors';
import { AppProductState } from './index';

@Injectable({ providedIn: 'root' })
export class AppProductFacade {
  products$ = this.store.select(selectAllProducts);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  loaded$: Observable<boolean> = this.store.select(selectLoaded);
  errors$ = this.store.select(selectError);

  constructor(private store: Store<AppProductState>, private productsService: ProductService) {}

  getProductById(category: ShopCategory, id: string): Observable<CategoryType | undefined> {
    return this.store.select(selectCategoryProductById(id, category));
  }

  getProductByCategory(category: ShopCategory): Observable<CategoryType[] | undefined> {
    return this.store.select(selectAllCategoryProducts(category));
  }

  loadProducts(): void {
    this.store.dispatch(loadAllProducts());
  }

  loadCompatibleProducts(
    id: string,
    categoryFrom: ShopCategory,
    categoryTo: ShopCategory
  ): Observable<CategoryType[] | undefined> {
    return this.productsService.loadCompatibleProducts(id, categoryFrom, categoryTo);
  }

  createProduct(category: ShopCategory, product: CategoryType): void {
    this.store.dispatch(createProduct({ category, product }));
  }
  createProductToOtherCategory(
    fromCategory: ShopCategory,
    idLinkedProduct: string,
    toCategory: ShopCategory,
    product: CategoryType
  ): void {
    this.store.dispatch(
      createCompatibleProduct({ fromCategory, idLinkedProduct, category: toCategory, product })
    );
  }

  updateProduct(category: ShopCategory, product: CategoryType): void {
    this.store.dispatch(updateProduct({ category, product }));
  }

  deleteProductById(category: ShopCategory, id: string): void {
    this.store.dispatch(deleteProduct({ category, id }));
  }
}
