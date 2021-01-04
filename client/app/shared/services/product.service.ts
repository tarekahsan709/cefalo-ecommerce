import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, IProductResults } from '../models/product.model';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs-compat/observable/ErrorObservable';


@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProductResults> {
    return this.http.get<IProductResults>(`/api/v1/products`)
      .pipe(
        catchError(ProductService.handleError)
      );
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/api/v1/products/${id}`)
      .pipe(
        catchError(ProductService.handleError)
      );
  }

  private static handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return ErrorObservable.create(errMessage);
    }
    return ErrorObservable.create(error || 'Node.js server error');
  }

}
