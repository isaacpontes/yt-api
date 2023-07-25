const BookingService = require("./BookingService.js");
const BookingRepository = require("./BookingRepository.js");

describe("BookingService Unit Tests", () => {
  let bookingService;
  const bookingMock = {
    roomId: 1,
    guestName: "John Doe",
    checkInDate: "2023-08-01",
    checkOutDate: "2023-08-05"
  }

  beforeEach(() => {
    const bookingRepository = new BookingRepository();
    bookingService = new BookingService(bookingRepository);
  });

  it("should create a new booking", () => {
    const booking = bookingService.createBooking(bookingMock);

    expect(booking).toHaveProperty("roomId", 1);
    expect(booking).toHaveProperty("guestName", "John Doe");
    expect(booking).toHaveProperty("checkInDate", "2023-08-01");
    expect(booking).toHaveProperty("checkOutDate", "2023-08-05");
  });

  it("should return all bookings", () => {
    const booking = bookingService.createBooking(bookingMock);

    const bookings = bookingService.findAllBookings();

    expect(bookings.length).toBe(1);
    expect(bookings).toContain(booking);
  })

  it("should throw an error for overlapping dates", () => {
    bookingService.createBooking(bookingMock);

    expect(() =>
      bookingService.createBooking({
        roomId: 1,
        guestName: "Jane Smith",
        checkInDate: "2023-08-03",
        checkOutDate: "2023-08-06"
      })
    ).toThrowError("The room is already booked for the selected dates.");
  });

  it("should not throw an error if checkInDate is the same as checkOutDate", () => {
    bookingService.createBooking(bookingMock);

    const booking = bookingService.createBooking({
      roomId: 1,
      guestName: "Jane Smith",
      checkInDate: "2023-08-05",
      checkOutDate: "2023-08-06"
    });

    expect(booking).toHaveProperty("id");
    expect(booking).toHaveProperty("roomId", 1);
    expect(booking).toHaveProperty("guestName", "Jane Smith");
    expect(booking).toHaveProperty("checkInDate", "2023-08-05");
    expect(booking).toHaveProperty("checkOutDate", "2023-08-06");
  });

  it("should not throw an error if checkOutDate is the same as checkInDate", () => {
    bookingService.createBooking(bookingMock);

    const booking = bookingService.createBooking({
      roomId: 1,
      guestName: "Jane Smith",
      checkInDate: "2023-07-29",
      checkOutDate: "2023-08-01"
    });

    expect(booking).toHaveProperty("id");
    expect(booking).toHaveProperty("roomId", 1);
    expect(booking).toHaveProperty("guestName", "Jane Smith");
    expect(booking).toHaveProperty("checkInDate", "2023-07-29");
    expect(booking).toHaveProperty("checkOutDate", "2023-08-01");
  });
});