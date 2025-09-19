import { Routes } from '@angular/router';
import { ProductsInfoComponent } from './components/products-info/products-info.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'products-info/:id', component: ProductsInfoComponent},
    { path: '**', component: HomeComponent}
];


