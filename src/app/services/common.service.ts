import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductById, ProductsResponse } from '../Models/commonModels';
import { Observable } from 'rxjs';
import { ApiUrls } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  private http = inject(HttpClient);

  getProducts(search: string, skip: number, limit: number): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${ApiUrls.search}`, {
      params: {
        q: search,
        skip: skip,
        limit: limit,
        select: 'title',
      }
    })
  }

  getProductsById(id: string): Observable<ProductById> {
    return this.http.get<ProductById>(`${ApiUrls.productById}/${id}`)
  }
}
