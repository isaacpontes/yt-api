const request = require("supertest");
const app = require("../src/app");

describe('Hotel Booking API Integration Tests', () => {
  const reservationMock = {
    roomId: 1,
    guestName: 'John Doe',
    checkInDate: '2023-08-03',
    checkOutDate: '2023-08-05',
  }

  it('should create a new reservation', async () => {
    const response = await request(app).post('/api/reservations').send(reservationMock);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Reservation created successfully.');
    expect(response.body).toHaveProperty('reservation');
  });

  it('should return all reservations', async () => {
    await request(app).post('/api/reservations').send(reservationMock);

    const response = await request(app).get('/api/reservations')

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  })

  it('should not create a reservation with missing fields', async () => {
    const invalidReservation = {
      roomId: 1,
      checkInDate: '2023-08-03',
      checkOutDate: '2023-08-05',
    };

    const response = await request(app).post('/api/reservations').send(invalidReservation);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'All fields are required.');
  });

  it('should not create a reservation for overlapping checkInDate', async () => {
    await request(app).post('/api/reservations').send(reservationMock);
    const overlappingReservation = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-04',
      checkOutDate: '2023-08-06',
    };

    const response = await request(app).post('/api/reservations').send(overlappingReservation);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      'message',
      'The room is already booked for the selected dates.'
    );
  });

  it('should not create a reservation for overlapping checkOutDate', async () => {
    await request(app).post('/api/reservations').send(reservationMock);
    const overlappingReservation = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-01',
      checkOutDate: '2023-08-04',
    };

    const response = await request(app).post('/api/reservations').send(overlappingReservation);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      'message',
      'The room is already booked for the selected dates.'
    );
  });

  it('should create a reservation when checkInDate is the same as checkOutDate', async () => {
    await request(app).post('/api/reservations').send(reservationMock);
    const validReservation = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-05',
      checkOutDate: '2023-08-06',
    };

    const response = await request(app).post('/api/reservations').send(validReservation);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Reservation created successfully.');
    expect(response.body).toHaveProperty('reservation');
  });

  it('should create a reservation when checkOutDate is the same as checkInDate', async () => {
    await request(app).post('/api/reservations').send(reservationMock);
    const validReservation = {
      roomId: 1,
      guestName: 'Jane Smith',
      checkInDate: '2023-08-01',
      checkOutDate: '2023-08-03',
    };

    const response = await request(app).post('/api/reservations').send(validReservation);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Reservation created successfully.');
    expect(response.body).toHaveProperty('reservation');
  });
});
