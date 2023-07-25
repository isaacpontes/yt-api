const express = require('express');
const BookingRepository = require("./bookings/BookingRepository.js");
const BookingService = require("./bookings/BookingService.js");
const BookingController = require('./bookings/BookingController.js');

const app = express();

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);

app.use(express.json());

app.post("/api/bookings", bookingController.save);
app.get("/api/bookings", bookingController.index);

module.exports = app;
