import { Component, inject } from '@angular/core';
import { CommonService } from '../../services/common.service';

import {
  BusSchedule,
  busSearchModal,
  LocationsResponse,
} from '../../Models/locationsData';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private service = inject(CommonService);

  locations$: LocationsResponse[] = []
  busScheduleData: BusSchedule[] = [];

  getBusLocations():void {
    this.service.getLocations().pipe().subscribe(data => {
      this.locations$ = data;
    });
  }

  searchObj: busSearchModal = {
    fromLocation: '',
    toLocation: '',
    travelDate: '',
  };

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
