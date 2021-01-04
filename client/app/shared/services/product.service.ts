import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, IProductResults } from '../models/product.model';


@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProductResults> {
    return this.http.get<IProductResults>(`/api/v1/products`);
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/api/v1/products/${id}`);
  }

}
