export interface LocationsResponse {
  locationId: number;
  locationName: string;
  code: string;
}

export interface BusSchedule {
  availableSeats: number;
  totalSeats: number;
  price: number;
  arrivalTime: string;
  scheduleId: number;
  departureTime: string;
  busName: string;
  busVehicleNo: string;
  fromLocationName: string | null;
  toLocationName: string | null;
  vendorName: string | null;
  scheduleDate: string;
  vendorId: number;
}

export interface busSearchModal {
  fromLocation: string;
  toLocation: string;
  travelDate: string;
}

export interface Register {
  userId: number;
  userName: string;
  emailId: string;
  fullName: string;
  role: string;
  createdDate: Date;
  password: string;
  projectName: string;
  refreshToken: string;
  refreshTokenExpiryTime: Date;
}

export interface RegResponse {
  message: string;
  result: boolean;
  data: Register;
}

export interface Passenger {
  passengerId: number;
  bookingId: number;
  passengerName: string;
  age: number;
  gender: string;
  seatNo: number;
}

export interface BusBooking {
  bookingId: number;
  custId: number;
  bookingDate: Date;
  scheduleId: number | undefined;
  BusBookingPassengers: Passenger[];
}
