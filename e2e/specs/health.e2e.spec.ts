import { ping } from 'tcp-ping';

describe('Health E2E', () => {
  it('Reservations', async () => {
    const response = await fetch('http://reservations:3000');
    expect(response.ok).toBeTruthy();
  });
  it('Auth', async () => {
    const res = await fetch('http://auth:3001');
    expect(res.ok).toBeTruthy();
  });
  it('Payments', (done) => {
    ping(
      {
        address: 'payments',
        port: 3003,
      },
      (err) => {
        if (err) {
          fail();
        }
        done();
      },
    );
  });
  it('Notifications', (done) => {
    ping(
      {
        address: 'notifications',
        port: 3004,
      },
      (err) => {
        if (err) {
          fail();
        }
        done();
      },
    );
  });
});
