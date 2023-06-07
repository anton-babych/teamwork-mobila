import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import type {
  CategoryProducts,
  CategoryType,
  Headphones,
  Phone,
  RestHeadphones,
  RestSmartphone,
} from './models';
import { categoriesUrls, RestCategoryType, ShopCategory } from './models';
import { getEnvironment } from 'shared/environments';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  readAll(): Observable<CategoryProducts> {
    const categories = Object.values(ShopCategory);
    const requests$ = categories.map((category) => this.readByCategory(category));

    return forkJoin(requests$).pipe(
      map((results) => {
        const categoryProducts: CategoryProducts = {};
        categories.forEach((category, index) => {
          if (results[index] !== null) {
            categoryProducts[category] = results[index] as CategoryType[];
          }
        });
        return categoryProducts;
      })
    );
  }

  readByCategory(category: ShopCategory): Observable<CategoryType[]> {
    const url = `${getEnvironment().apiUrl}/${this.getUrlByCategory(category)}`;
    return this.http.get<RestCategoryType[]>(url).pipe(
      map((x) => {
        console.log(x, 'read by', category);
        return this.convertFromRestArray(x, category);
      }),
      catchError((error) => {
        console.log('Error:', error);
        return of([]);
      })
    );
  }

  loadCompatibleProducts(
    id: string | number,
    categoryFrom: ShopCategory,
    categoryTo: ShopCategory
  ): Observable<CategoryType[]> {
    return this.http
      .get<RestCategoryType[]>(
        `${getEnvironment().apiUrl}/${this.getUrlByCategory(categoryFrom)}/${id}/${this.getUrlByCategory(
          categoryTo
        )}`
      )
      .pipe(map((x) => this.convertFromRestArray(x, categoryTo)));
  }

  update(item: CategoryType, category: ShopCategory): Observable<CategoryType> {
    let jsonItem = this.convertToRest(item, category);
    return this.http
      .put<RestCategoryType>(
        `${getEnvironment().apiUrl}/update/${this.getUrlByCategory(category)}/${item.id}`,
        {
          ...jsonItem,
        }
      )
      .pipe(map((x) => this.convertFromRest(x, category)));
  }

  create(item: CategoryType, category: ShopCategory): Observable<CategoryType> {
    let jsonItem = this.convertToRest(item, category);
    console.log(jsonItem, 'create');
    return this.http
      .post<RestCategoryType>(`${getEnvironment().apiUrl}/add/${this.getUrlByCategory(category)}`, {
        ...jsonItem,
      })
      .pipe(map((x) => this.convertFromRest(x, category)));
  }

  createCompatibleProduct(
    item: CategoryType,
    fromCategory: ShopCategory,
    id: string,
    toCategory: ShopCategory
  ): Observable<CategoryType> {
    let restObject = this.convertToRest(item, toCategory);
    console.log(restObject, 'started creating comptible obj');
    return this.http
      .post<RestCategoryType>(
        `${getEnvironment().apiUrl}/add/${this.getUrlByCategory(fromCategory)}/${id}/${this.getUrlByCategory(
          toCategory
        )}`,
        {
          ...restObject,
        }
      )
      .pipe(map((x) => this.convertFromRest(x, toCategory)));
  }

  delete(id: string | number, category: ShopCategory) {
    return this.http.delete<void>(
      `${getEnvironment().apiUrl}/delete/${this.getUrlByCategory(category)}/${id}`
    );
  }

  private getUrlByCategory(category: ShopCategory): string {
    switch (category) {
      case ShopCategory.Phones:
        return categoriesUrls.phones;
      case ShopCategory.Headphones:
        return categoriesUrls.headphones;
    }

    throw new Error('not implemented shop category');
  }

  private convertFromRest(restObject: RestCategoryType, category: ShopCategory): CategoryType {
    switch (category) {
      case ShopCategory.Phones:
        let restPhone = restObject as RestSmartphone;
        return {
          id: restObject.id,
          description: restPhone.s_des,
          firm: restPhone.s_firm,
          model: restPhone.smodel,
          imagePath: restPhone.s_img,
          price: restPhone.s_price,
        } as Phone;
      case ShopCategory.Headphones:
        let restHeadphones = restObject as RestHeadphones;
        return {
          id: restObject.id,
          description: restHeadphones.h_des,
          firm: restHeadphones.h_firm,
          model: restHeadphones.h_model,
          imagePath: restHeadphones.h_img,
          price: restHeadphones.h_price,
        } as Headphones;
    }

    throw new Error('not implement category here');
  }

  private convertToRest(obj: CategoryType, category: ShopCategory): RestCategoryType {
    switch (category) {
      case ShopCategory.Phones:
        let phone = obj as Phone;
        return {
          //id: phone.id,
          s_des: phone.description,
          s_firm: phone.firm,
          smodel: phone.model,
          s_img: phone.imagePath,
          s_price: phone.price,
        } as RestSmartphone;
      case ShopCategory.Headphones:
        let headphones = obj as Headphones;
        return {
          //id: headphones.id,
          h_des: headphones.description,
          h_firm: headphones.firm,
          h_model: headphones.model,
          h_img: headphones.imagePath,
          h_price: headphones.price,
        } as RestHeadphones;
    }

    throw new Error('not implement category here');
  }

  private convertFromRestArray(restArray: RestCategoryType[], category: ShopCategory) {
    let ar: CategoryType[] = restArray.map((x) => this.convertFromRest(x, category));
    return ar;
  }
}
