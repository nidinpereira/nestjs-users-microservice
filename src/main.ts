import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process.env.TRANSPORT_PORT_USER_SERVICE),
    },
  });

  return app.listen(() =>
    console.log(
      `User Microservice started on port: ${parseInt(
        process.env.TRANSPORT_PORT_USER_SERVICE,
      )}`,
    ),
  );
}
bootstrap();
