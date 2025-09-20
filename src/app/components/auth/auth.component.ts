import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  @ViewChild('modal') myModal!: ElementRef;
  @ViewChild('modalOverlay') modalOverlay!: ElementRef;
  @ViewChild('rbNav') header!: ElementRef;
  isLoggedIn = true;

  register!:FormGroup

  private service = inject(CommonService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.register = this.fb.group({
      emailId: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

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

  onRegister():void {
    this.service.onRegistration(this.register.value).pipe().subscribe(data => {
      console.log(data)
    })
  }
}
