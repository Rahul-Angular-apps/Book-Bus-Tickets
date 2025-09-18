import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdComponent } from './show-ad.component';

describe('ShowAdComponent', () => {
  let component: ShowAdComponent;
  let fixture: ComponentFixture<ShowAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
