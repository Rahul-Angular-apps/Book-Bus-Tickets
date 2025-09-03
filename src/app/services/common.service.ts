import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BusBooking, BusSchedule, LocationsResponse, Register, RegResponse } from '../Models/locationsData';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  private http = inject(HttpClient);

  getLocations():Observable<LocationsResponse[]> {
    return this.http.get<LocationsResponse[]>(`${environment.apiUrl}/api/BusBooking/GetBusLocations`)
  }

  searchBus(from: string, to: string, date: string): Observable<BusSchedule[]> {
    // return this.http.get<BusSchedule[]>(ApiUrls.searchBus + `?fromLocation=${from}&toLocation=${to}&travelDate=${date}`)
    return this.http.get<BusSchedule[]>(`${environment.apiUrl}/api/BusBooking/searchBus`, {
      params: {
        fromLocation: from,
        toLocation: to,
        travelDate: date
      }
    })
  };

  getBusScheduleById(routeParam: string):Observable<BusSchedule> {
    return this.http.get<BusSchedule>(`${environment.apiUrl}/api/BusBooking/GetBusScheduleById`, {
      params: {
        id: routeParam
      }
    })
  }

  getBookedSeats(routeParam: string):Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/api/BusBooking/getBookedSeats`, {
      params: {
        scheduledId: routeParam
      }
    })
  }

  registerUser(body: Register):Observable<RegResponse> {
    return this.http.post<RegResponse>(`${environment.apiUrl}/api/Complaint/AddNewUser`, body)
  }

  postBooking(body: BusBooking):Observable<BusBooking> {
    return this.http.post<BusBooking>(`${environment.apiUrl}/api/BusBooking/PostBusBooking`, body)
  }
}
