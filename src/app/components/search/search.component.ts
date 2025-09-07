import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

import {
  BusSchedule,
  busSearchModal,
  LocationsResponse,
  Product,
} from '../../Models/commonModels';
import { DatePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  animations: [
    trigger('slideFade', [
      state('hidden', style({opacity: 0, transform: 'translateX(100%)'})),
      state('visible', style({opacity: 1, transform: 'translateX(0%)'})),
      transition('hidden => visible', [
        animate('0.8s ease-out')
      ]),
      transition('visible => hidden', [
        animate('0.8s ease-in')
      ])
    ])
  ]
})
export class SearchComponent implements OnInit {
  private service = inject(CommonService);

  locations: LocationsResponse[] = []
  busScheduleData: BusSchedule[] = [];
  productsData: Product[] = [];
  animationState: 'visible' | 'hidden' = 'hidden';
  private timer: ReturnType<typeof setTimeout> | null = null;

  searchProduct: FormControl = new FormControl("")

  ngOnInit(): void {
    this.showAd();
    this.searchProduct.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter((value: string) => value.trim().length > 3),
      switchMap(value => this.service.getProducts(value)),
      map(data => data.products)
    ).subscribe(products => {
      this.productsData = products
    })
  }

  showAd():void {
    this.clearTimeForAdd();
    this.timer= setTimeout(() => {
      this.animationState = 'visible'
    }, 2000)
  }

  closeAd():void {
    this.animationState = 'hidden';
    this.showAd();
  };

  clearTimeForAdd():void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  getBusLocations():void {
    this.service.getLocations().pipe().subscribe(data => {
      this.locations = data;
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
