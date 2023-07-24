const Reservation = require("./Reservation");

class ReservationService {
  constructor(repository) {
    this.repository = repository;
  }

  createReservation({ roomId, guestName, checkInDate, checkOutDate }) {
    const newReservation = new Reservation(roomId, guestName, checkInDate, checkOutDate);

    const overlappingReservation = this.repository.findAll().find((reservation) => {
      return (
        reservation.roomId === newReservation.roomId &&
        reservation.checkOutDate >= newReservation.checkInDate &&
        reservation.checkInDate <= newReservation.checkOutDate
      );
    });

    if (overlappingReservation) {
      throw new Error("The room is already booked for the selected dates.");
    }

    this.repository.create(newReservation);
    return newReservation;
  }
}

module.exports = ReservationService;
