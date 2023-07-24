const express = require('express');
const ReservationRepository = require("./reservations/ReservationRepository.js");
const ReservationService = require("./reservations/ReservationService.js");

const app = express();

const reservationRepository = new ReservationRepository();
const reservationService = new ReservationService(reservationRepository);

app.use(express.json());

app.post("/api/reservations", async (req, res) => {
  try {
    const { roomId, guestName, checkInDate, checkOutDate } = req.body;

    if (!roomId || !guestName || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const reservation = reservationService.createReservation({ roomId, guestName, checkInDate, checkOutDate });

    return res.status(201).json({ message: "Reservation created successfully.", reservation });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
});

module.exports = app;
