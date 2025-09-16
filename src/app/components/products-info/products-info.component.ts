import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ProductById } from '../../Models/commonModels';

@Component({
  selector: 'app-products-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products-info.component.html',
  styleUrl: './products-info.component.scss'
})
export class ProductsInfoComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private service = inject(CommonService);
  productId!: string | null;
  productsDataById!:ProductById;
  loading = false;

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (this.productId) {
      this.loading = true;
      this.service.getProductsById(this.productId).subscribe({
        next: (data) => {
          this.productsDataById = data;
          this.loading = false;
        },
        error: (error) => {
          console.log('error while fetching the products by id', error);
          this.loading = false;
        }
      })
    }
  }
}
