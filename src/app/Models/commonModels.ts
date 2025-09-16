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

export interface Product {
  id: number;
  title: string;
  category: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductById {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
