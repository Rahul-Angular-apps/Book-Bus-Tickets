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
      emailId: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  openModal(mode: string): void {
    if (mode === 'open') {
      // show modal (Tailwind): remove hidden, set block
      this.myModal.nativeElement.classList.remove('hidden');
      this.myModal.nativeElement.classList.add('block');
      this.modalOverlay.nativeElement.classList.remove('hidden');
      this.modalOverlay.nativeElement.classList.add('block');
      this.modalOverlay.nativeElement.style.display = 'block';
    } else if (mode === 'close') {
      // hide modal
      this.myModal.nativeElement.classList.add('hidden');
      this.myModal.nativeElement.classList.remove('block');
      this.modalOverlay.nativeElement.classList.add('hidden');
      this.modalOverlay.nativeElement.classList.remove('block');
      this.modalOverlay.nativeElement.style.display = 'none';
    }
  }

  toggleNav() {
    // toggle Tailwind responsive menu: toggle hidden class
    this.header.nativeElement.classList.toggle('hidden');
  }

  onRegister():void {
    if (this.register.valid) {
      this.service.onRegistration(this.register.value).pipe().subscribe(data => {
        console.log(data)
      })
    } else {
      this.register.markAllAsTouched()
    }
  }
}
