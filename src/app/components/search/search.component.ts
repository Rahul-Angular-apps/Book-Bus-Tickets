import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Observable } from 'rxjs';
import {
  BusSchedule,
  busSearchModal,
  LocationsResponse,
} from '../../Models/locationsData';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule, DatePipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private service = inject(CommonService);

  locations$: Observable<LocationsResponse[]> = new Observable<
    LocationsResponse[]
  >();
  busSchedule$: Observable<BusSchedule[]> = new Observable<BusSchedule[]>();

  busScheduleData: BusSchedule[] = [];

  ngOnInit(): void {
    this.getLocationsData();
  }

  searchObj: busSearchModal = {
    fromLocation: '',
    toLocation: '',
    travelDate: '',
  };

  getLocationsData() {
    this.locations$ = this.service.getLocations();
  }

  getSearchBusData() {
    const {
      fromLocation: from,
      toLocation: to,
      travelDate: date,
    } = this.searchObj;
    
    this.service.searchBus(from, to, date).subscribe(data => {
      this.busScheduleData = data;
    });
  }
}
