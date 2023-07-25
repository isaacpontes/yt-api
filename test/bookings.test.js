const request = require("supertest");
const app = require("../src/app");

describe('Hotel Booking API Integration Tests', () => {
  const bookingMock = {
    roomId: 1,
    guestName: 'John Doe',
    checkInDate: '2023-08-03',
    checkOutDate: '2023-08-05',
  }

  it('should create a new booking', async () => {
    const response = await request(app).post('/api/bookings').send(bookingMock);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Booking created successfully.');
    expect(response.body).toHaveProperty('booking');
  });

  it('should return all bookings', async () => {
    await request(app).post('/api/bookings').send(bookingMock);

    const response = await request(app).get('/api/bookings')

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  })

  it('should not create a booking with missing fields', async () => {
    const invalidBooking = {
      roomId: 1,
      checkInDate: '2023-08-03',
      checkOutDate: '2023-08-05',
    };

    const response = await request(app).post('/api/bookings').send(invalidBooking);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'All fields are required.');
  });

  it('should not create a booking for overlapping checkInDate', async () => {
    await request(app).post('/api/bookings').send(bookingMock);
    const overlappingBooking = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-04',
      checkOutDate: '2023-08-06',
    };

    const response = await request(app).post('/api/bookings').send(overlappingBooking);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      'message',
      'The room is already booked for the selected dates.'
    );
  });

  it('should not create a booking for overlapping checkOutDate', async () => {
    await request(app).post('/api/bookings').send(bookingMock);
    const overlappingBooking = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-01',
      checkOutDate: '2023-08-04',
    };

    const response = await request(app).post('/api/bookings').send(overlappingBooking);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      'message',
      'The room is already booked for the selected dates.'
    );
  });

  it('should create a booking when checkInDate is the same as checkOutDate', async () => {
    await request(app).post('/api/bookings').send(bookingMock);
    const validBooking = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-05',
      checkOutDate: '2023-08-06',
    };

    const response = await request(app).post('/api/bookings').send(validBooking);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Booking created successfully.');
    expect(response.body).toHaveProperty('booking');
  });

  it('should create a booking when checkOutDate is the same as checkInDate', async () => {
    await request(app).post('/api/bookings').send(bookingMock);
    const validBooking = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-01',
      checkOutDate: '2023-08-03',
    };

    const response = await request(app).post('/api/bookings').send(validBooking);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Booking created successfully.');
    expect(response.body).toHaveProperty('booking');
  });
});
