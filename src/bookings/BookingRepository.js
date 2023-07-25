class BookingRepository {
  constructor() {
    this.bookedRooms = [];
  }

  findAll() {
    return this.bookedRooms;
  }

  create(booking) {
    this.bookedRooms.push(booking);
  }
}

module.exports = BookingRepository;
