describe('Reservations E2E', () => {
  beforeAll(async () => {
    const user = {
      emailAddress: '',
      password: 'StrongPassword1!',
    };

    await fetch('http://auth:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  });
});
