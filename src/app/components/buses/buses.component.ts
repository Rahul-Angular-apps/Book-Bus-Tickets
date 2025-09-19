import { Component } from '@angular/core';
import { ShowAdComponent } from "../show-ad/show-ad.component";

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [ShowAdComponent],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.scss'
})
export class BusesComponent {

}
