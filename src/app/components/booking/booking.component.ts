import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BusBooking, BusSchedule, Passenger } from '../../Models/commonModels';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  private service = inject(CommonService);
  private activatedRoute = inject(ActivatedRoute);
  getRouteParam = '';
  busScheduleData: BusSchedule | undefined;
  totalSeats: number[] = [];
  bookedSeatsArray: number[] = [];
  userSelectedSeats: Passenger[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getRouteParam = params['id'];
    });
    this.getBusScheduleByIdData();
    this.getBookedSeatsData();
  }

  getBusScheduleByIdData() {
    this.service
      .getBusScheduleById(this.getRouteParam)
      .subscribe((data: BusSchedule) => {
        this.busScheduleData = data;
        for (let i = 1; i <= this.busScheduleData.totalSeats; i++) {
          this.totalSeats.push(i);
        }
      });
  }

  getBookedSeatsData() {
    this.service
      .getBookedSeats(this.getRouteParam)
      .subscribe((data: number[]) => {
        this.bookedSeatsArray = data;
      });
  }

  checkIfSeatBooked(seatNo: number): number {
    return this.bookedSeatsArray.indexOf(seatNo);
  }

  selectSeat(seatNo: number): void {
    const obj = {
      passengerId: 0,
      bookingId: 0,
      passengerName: 'string',
      age: 0,
      gender: 'string',
      seatNo: 0,
    };
    obj.seatNo = seatNo;
    this.userSelectedSeats.push(obj);
  }

  checkIsSeatSelected(seatNo: number) {
    return this.userSelectedSeats.findIndex((i) => i.seatNo === seatNo);
  }

  bookSeat() {
    const bookSeatPayload = {
      bookingId: 0,
      custId: 0, //take from logged user data
      bookingDate: new Date(),
      scheduleId: this.busScheduleData?.scheduleId,
      BusBookingPassengers: this.userSelectedSeats,
    };
    this.service.postBooking(bookSeatPayload).subscribe({
      next: (res: BusBooking) => {
        alert("Booking Done");
        console.log(res)
      },
      error: (err) => console.log('Error while booking ticket', JSON.stringify(err))
    });
  }
}
