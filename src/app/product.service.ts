import { Injectable } from '@angular/core';
import { Product, ProductResponse } from './models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products: Product[] = [];
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl);
  }

  create(data: Partial<Product>) {
    return this.http.post<Product>(this.apiUrl, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
