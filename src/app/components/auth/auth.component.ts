import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  @ViewChild('modal') myModal!: ElementRef;
  @ViewChild('modalOverlay') modalOverlay!: ElementRef;
  @ViewChild('rbNav') header!: ElementRef;
  isLoggedIn = true;

  private service = inject(CommonService);

  openModal(mode: string): void {
    if (mode === 'open') {
      this.myModal.nativeElement.classList.remove('fade');
      this.myModal.nativeElement.classList.add('d-block');
      this.modalOverlay.nativeElement.classList.add('show');
      this.modalOverlay.nativeElement.style.display = 'block';
    } else if (mode === 'close') {
      this.myModal.nativeElement.classList.add('fade');
      this.myModal.nativeElement.classList.remove('d-block');
      this.modalOverlay.nativeElement.classList.remove('show');
      this.modalOverlay.nativeElement.style.display = 'none';
    }
  }

  toggleNav() {
    this.header.nativeElement.classList.toggle('collapse');
  }

  register():void {
    console.log('user')
  }
}
