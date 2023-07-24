const express = require('express');
const ReservationRepository = require("./reservations/ReservationRepository.js");
const ReservationService = require("./reservations/ReservationService.js");
const ReservationController = require('./reservations/ReservationController.js');

const app = express();

const reservationRepository = new ReservationRepository();
const reservationService = new ReservationService(reservationRepository);
const reservationController = new ReservationController(reservationService);

app.use(express.json());

app.post("/api/reservations", reservationController.save);
app.get("/api/reservations", reservationController.index);

module.exports = app;
