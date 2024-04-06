import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'
import { Product } from '../interfaces/product.interface'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/product`)
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/product/${id}`)
  }
  createProducts(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/product/create`, product)
  }
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/product/delete?productID=${id}`)
  }
  updateProduct(id: string, product: Product): Observable<Product> {
    console.log(id, product)

    return this.http.put<Product>(`${this.baseUrl}/product/update?productID=${id}`, product)
  }
}
