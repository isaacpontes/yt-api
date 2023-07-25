class BookingController {
  constructor(service) {
    this.service = service;
  }

  index = (req, res) => {
    try {
      const bookings = this.service.findAllBookings();
      return res.json(bookings);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }

  save = (req, res) => {
    try {
      const { roomId, guestName, checkInDate, checkOutDate } = req.body;

      if (!roomId || !guestName || !checkInDate || !checkOutDate) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const booking = this.service.createBooking({ roomId, guestName, checkInDate, checkOutDate });

      return res.status(201).json({ message: "Booking created successfully.", booking });
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }
}

module.exports = BookingController;
