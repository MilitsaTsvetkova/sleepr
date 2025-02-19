import { INestApplication } from '@nestjs/common';

let app: INestApplication;

const setApp = (newApp: INestApplication) => {
  app = newApp;
};

export { app, setApp };
