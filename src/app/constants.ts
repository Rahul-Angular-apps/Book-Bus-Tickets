
const apiUrl = "https://projectapi.gerasim.in/api/BusBooking";


function endPoint(path: string): string {
    return `${apiUrl}${path}`
}

export const ApiUrls = {
  getLocations: endPoint("/api/BusBooking/GetBusLocations"),
  searchBus: endPoint("/api/BusBooking/searchBus"),
  GetBusScheduleById: endPoint("/api/BusBooking/GetBusScheduleById"),
  GetBookedSeats: endPoint("/api/BusBooking/getBookedSeats"),
  register: endPoint("/api/Complaint/AddNewUser"),
  PostBusBooking: endPoint("/api/BusBooking/PostBusBooking"),
  search: "https://dummyjson.com/products",
};
