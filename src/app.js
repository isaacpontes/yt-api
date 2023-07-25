const fastify = require('fastify');
const BookingRepository = require("./bookings/BookingRepository.js");
const BookingService = require("./bookings/BookingService.js");
const BookingController = require('./bookings/BookingController.js');

const app = fastify({ logger: process.env.NODE_ENV !== 'test' });

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);

app.post("/api/bookings", (request, reply) => {
  const { code, body } = bookingController.save(request);
  reply.code(code).send(body);
});

app.get("/api/bookings", (request, reply) => {
  const { code, body } = bookingController.index();
  reply.code(code).send(body);
});

module.exports = app;
