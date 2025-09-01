import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { BookingComponent } from './components/booking/booking.component';

export const routes: Routes = [
    { path: '', pathMatch:'full', redirectTo:'search' },
    { path: 'search', component:  SearchComponent},
    { path: 'booking/:id', component: BookingComponent }
];


