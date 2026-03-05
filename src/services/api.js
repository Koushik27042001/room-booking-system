import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
});

export const getRooms = () => API.get("/rooms");
export const getRoomById = (id) => API.get(`/rooms/${id}`);

export const getBookings = () => API.get("/bookings");
export const getBookingById = (id) => API.get(`/bookings/${id}`);
export const createBooking = (data) => API.post("/bookings", data);
export const updateBooking = (id, data) => API.patch(`/bookings/${id}`, data);
export const deleteBooking = (id) => API.delete(`/bookings/${id}`);
