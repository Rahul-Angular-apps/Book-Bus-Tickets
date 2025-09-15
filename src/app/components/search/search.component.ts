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
import { debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

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
  skip = 0;
  limit = 10;
  total = 0;
  loading = false;
  endReached = false;
  loadMore = false;
  searchValue = '';
  animationState: 'visible' | 'hidden' = 'hidden';
  private timer: ReturnType<typeof setTimeout> | null = null;

  searchProduct: FormControl = new FormControl("")

  ngOnInit(): void {
    this.showAd();
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.searchProduct.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => {
        this.searchValue = value.trim()
        if (!value || value === '') {
          this.productsData = [];
          this.total = 0;
          return of({ products: [], total: 0 });
        }
        this.loading = true;
        this.skip = 0;
        return this.service.getProducts(value.trim(), this.skip, this.limit)
      }),
      map(data => {
        this.total = data.total
        return data.products
      })
    ).subscribe({
      next: (products) => {
        this.productsData = products;
        this.skip = this.limit;
        this.loading = false;
      },
      error: (err) => {
        console.log('error while fetching the data', err);
        this.productsData = [];
        this.total = 0;
        this.loading = false;
      }
    })
  }

  onScrollLoadData(e: Event): void {
    const target = e.target as HTMLElement;
    const distanceFromBottom = 30;
    if (!this.loadMore && this.skip < this.total &&
      target.scrollTop + target.clientHeight >= target.scrollHeight - distanceFromBottom
    ) {
      this.loadMoreData();
    }
  }

  loadMoreData(): void {
    this.loadMore = true;
    this.service.getProducts(this.searchValue, this.skip, this.limit).subscribe({
      next: (products) => {
        this.loadMore = false;
        this.productsData.push(...products.products);
        this.skip += this.limit
      },
      error: (err) => {
        console.log('Error while loading more data',  err);
      }
    })
  }

  showAd():void {
    this.clearTimeForAdd();
    this.timer= setTimeout(() => {
      this.animationState = 'visible'
    }, 1500)
  }

  closeAd():void {
    this.animationState = 'hidden';
    this.resetSearch();
    this.showAd();
  };

  resetSearch(): void {
    this.searchProduct.setValue('');
    this.productsData = [];
    this.skip = 0;
    this.total = 0;
  }

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
