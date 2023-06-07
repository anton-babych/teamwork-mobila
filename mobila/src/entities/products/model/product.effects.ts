import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Phone, ProductService } from '../api';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  createProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
  createProductFailure,
  updateProductFailure,
  deleteProductFailure,
  loadAllProducts,
  loadAllProductsFailure,
  loadAllProductsSuccess,
  createCompatibleProduct,
  createCompatibleProductSuccess,
  createCompatibleProductFailure,
} from './product.actions';
import { of } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      mergeMap((action) =>
        this.productService.create(action.product, action.category).pipe(
          map((product) => createProductSuccess({ category: action.category, product })),
          catchError((error) => of(createProductFailure({ category: action.category, error })))
        )
      )
    )
  );

  createCompatibleProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCompatibleProduct),
      mergeMap((action) =>
        this.productService
          .createCompatibleProduct(
            action.product,
            action.fromCategory,
            action.idLinkedProduct,
            action.category
          )
          .pipe(
            map((product) => createCompatibleProductSuccess({ category: action.category, product: product })),
            catchError((error) => of(createCompatibleProductFailure({ category: action.category, error })))
          )
      )
    )
  );

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllProducts),
      mergeMap((action) =>
        this.productService.readAll().pipe(
          map((products) => loadAllProductsSuccess({ products: products })),
          catchError((error) => of(loadAllProductsFailure({ error })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      mergeMap((action) =>
        this.productService.update(action.product, action.category).pipe(
          map(() => updateProductSuccess({ category: action.category, product: action.product })),
          catchError((error) => of(updateProductFailure({ category: action.category, error })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap((action) =>
        this.productService.delete(action.id, action.category).pipe(
          map(() => deleteProductSuccess({ category: action.category, productId: action.id })),
          catchError((error) => of(deleteProductFailure({ category: action.category, error })))
        )
      )
    )
  );
}
