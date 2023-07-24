class ReservationRepository {
  constructor() {
    this.bookedRooms = [];
  }

  findAll() {
    return this.bookedRooms;
  }

  create(reservation) {
    this.bookedRooms.push(reservation);
  }
}

module.exports = ReservationRepository;
