const fastify = require("fastify");
const ReservationRepository = require("./reservations/ReservationRepository.js");
const ReservationService = require("./reservations/ReservationService.js");

const app = fastify({ logger: true });

const reservationRepository = new ReservationRepository();
const reservationService = new ReservationService(reservationRepository);

app.post("/api/reservations", async (request, reply) => {
  try {
    const { roomId, guestName, checkInDate, checkOutDate } = request.body;

    if (!roomId || !guestName || !checkInDate || !checkOutDate) {
      return reply.code(400).send({ message: "All fields are required." });
    }

    const reservation = reservationService.createReservation(roomId, guestName, checkInDate, checkOutDate);

    return reply.code(201).send({ message: "Reservation created successfully.", reservation });
  } catch (error) {
    return reply.code(409).send({ message: error.message });
  }
});

module.exports = app;
