class ReservationController {
  constructor(service) {
    this.service = service;
  }

  index = (req, res) => {
    try {
      const reservations = this.service.findAllReservations();
      return res.json(reservations);
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

      const reservation = this.service.createReservation({ roomId, guestName, checkInDate, checkOutDate });

      return res.status(201).json({ message: "Reservation created successfully.", reservation });
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }
}

module.exports = ReservationController;
