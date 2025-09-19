import { Routes } from '@angular/router';
import { ProductsInfoComponent } from './components/products-info/products-info.component';
import { BusesComponent } from './components/buses/buses.component';

export const routes: Routes = [
    { path: '', redirectTo: "buses", pathMatch: 'full'},
    { path: 'products-info/:id', component: ProductsInfoComponent},
    { path: '**', component: BusesComponent}
];