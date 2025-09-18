import { Component } from '@angular/core';
import { ShowAdComponent } from '../show-ad/show-ad.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShowAdComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
