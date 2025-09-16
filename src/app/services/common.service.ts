import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BusBooking, BusSchedule, LocationsResponse, ProductById, ProductsResponse, Register, RegResponse } from '../Models/commonModels';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiUrls } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  private http = inject(HttpClient);

  getProducts(search: string, skip: number, limit: number): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${ApiUrls.search}/search`, {
      params: {
        q: search,
        skip: skip,
        limit: limit,
        select: 'title',
      }
    })
  }

  getProductsById(id: string): Observable<ProductById> {
    return this.http.get<ProductById>(`${ApiUrls.search}/${id}`)
  }

  getLocations():Observable<LocationsResponse[]> {
    return this.http.get<LocationsResponse[]>(`${environment.apiUrl}/BusBooking/GetBusLocations`)
  }

  searchBus(from: string, to: string, date: string): Observable<BusSchedule[]> {
    // return this.http.get<BusSchedule[]>(ApiUrls.searchBus + `?fromLocation=${from}&toLocation=${to}&travelDate=${date}`)
    return this.http.get<BusSchedule[]>(`${environment.apiUrl}/BusBooking/searchBus`, {
      params: {
        fromLocation: from,
        toLocation: to,
        travelDate: date
      }
    })
  };

  getBusScheduleById(routeParam: string):Observable<BusSchedule> {
    return this.http.get<BusSchedule>(`${environment.apiUrl}/BusBooking/GetBusScheduleById`, {
      params: {
        id: routeParam
      }
    })
  }

  getBookedSeats(routeParam: string):Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/BusBooking/getBookedSeats`, {
      params: {
        scheduledId: routeParam
      }
    })
  }

  registerUser(body: Register):Observable<RegResponse> {
    return this.http.post<RegResponse>(`${environment.apiUrl}/Complaint/AddNewUser`, body)
  }

  postBooking(body: BusBooking):Observable<BusBooking> {
    return this.http.post<BusBooking>(`${environment.apiUrl}/BusBooking/PostBusBooking`, body)
  }
}
