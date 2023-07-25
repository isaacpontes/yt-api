class BookingController {
  constructor(service) {
    this.service = service;
  }

  index() {
    try {
      const bookings = this.service.findAllBookings();
      return { code: 200, body: bookings };
    } catch (error) {
      return { code: 409, body: { message: error.message } };
    }
  }

  save(request) {
    try {
      const { roomId, guestName, checkInDate, checkOutDate } = request.body;

      if (!roomId || !guestName || !checkInDate || !checkOutDate) {
        return { code: 400, body: { message: "All fields are required." } };
      }

      const booking = this.service.createBooking({ roomId, guestName, checkInDate, checkOutDate });

      return { code: 201, body: { message: "Booking created successfully.", booking } };
    } catch (error) {
      return { code: 409, body: { message: error.message } };
    }
  }
}

module.exports = BookingController;
