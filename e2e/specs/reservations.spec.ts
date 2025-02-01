describe('Reservations E2E', () => {
  let jwt: string;
  beforeAll(async () => {
    const user = {
      email: 'sleeprnestapp@gmail.com',
      password: 'StrogPassword123!@',
    };
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    jwt = await response.text();
  });

  test('Create and Get a reservation', async () => {
    const createdReservation = await createReservation();
    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );

    const reservation = await responseGet.json();
    expect(createdReservation).toEqual(reservation);
  });

  const createReservation = async () => {
    const reservation = {
      startDate: '12-25-2022',
      endDate: '12-25-2023',
      placeId: '123',
      invoiceId: '123',
      charge: {
        amount: 17,
        card: {
          cvc: '123',
          exp_month: 12,
          exp_year: 2026,
          number: '4242 4242 4242 4242',
        },
      },
    };

    const response = await fetch('http://reservations:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify(reservation),
    });

    expect(response.status).toBe(201);
    return response.json();
  };
});
