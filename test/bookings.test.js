const app = require("../src/app");

describe('Hotel Booking API Integration Tests', () => {
  const bookingMock = {
    roomId: 1,
    guestName: 'John Doe',
    checkInDate: '2023-08-03',
    checkOutDate: '2023-08-05',
  }

  it('should create a new booking', async () => {
    const response = await app.inject({ method: 'POST', path: '/api/bookings', body: bookingMock });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toHaveProperty('message', 'Booking created successfully.');
    expect(response.json()).toHaveProperty('booking');
  });

  it('should return all bookings', async () => {
    await app.inject({ method: 'POST', path: '/api/bookings', body: bookingMock });

    const response = await app.inject({ method: 'GET', path: '/api/bookings' });

    expect(response.statusCode).toBe(200);
    expect(response.json().length).toBe(1);
  })

  it('should not create a booking with missing fields', async () => {
    const invalidBooking = {
      roomId: 1,
      checkInDate: '2023-08-03',
      checkOutDate: '2023-08-05',
    };

    const response = await app.inject({ method: 'POST', path: '/api/bookings', body: invalidBooking });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty('message', 'All fields are required.');
  });

  it('should not create a booking for overlapping checkInDate', async () => {
    await app.inject({ method: 'POST', path: '/api/bookings', body: bookingMock });
    const overlappingBooking = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-04',
      checkOutDate: '2023-08-06',
    };

    const response = await app.inject({ method: 'POST', path: '/api/bookings', body: overlappingBooking });

    expect(response.statusCode).toBe(409);
    expect(response.json()).toHaveProperty(
      'message',
      'The room is already booked for the selected dates.'
    );
  });

  it('should not create a booking for overlapping checkOutDate', async () => {
    await app.inject({ method: 'POST', path: '/api/bookings', body: bookingMock });
    const overlappingBooking = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-01',
      checkOutDate: '2023-08-04',
    };

    const response = await app.inject({ method: 'POST', path: '/api/bookings', body: overlappingBooking });

    expect(response.statusCode).toBe(409);
    expect(response.json()).toHaveProperty(
      'message',
      'The room is already booked for the selected dates.'
    );
  });

  it('should create a booking when checkInDate is the same as checkOutDate', async () => {
    await app.inject({ method: 'POST', path: '/api/bookings', body: bookingMock });
    const validBooking = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-05',
      checkOutDate: '2023-08-06',
    };

    const response = await app.inject({ method: 'POST', path: '/api/bookings', body: validBooking });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toHaveProperty('message', 'Booking created successfully.');
    expect(response.json()).toHaveProperty('booking');
  });

  it('should create a booking when checkOutDate is the same as checkInDate', async () => {
    await app.inject({ method: 'POST', path: '/api/bookings', body: bookingMock });
    const validBooking = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-01',
      checkOutDate: '2023-08-03',
    };

    const response = await app.inject({ method: 'POST', path: '/api/bookings', body: validBooking });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toHaveProperty('message', 'Booking created successfully.');
    expect(response.json()).toHaveProperty('booking');
  });
});
