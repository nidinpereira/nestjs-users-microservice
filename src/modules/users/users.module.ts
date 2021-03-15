import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../database/database.module';
import { usersProviders } from './users.provider';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'GATEWAY_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.TRANSPORT_URL_API_GATEWAY,
          port: parseInt(process.env.TRANSPORT_PORT_API_GATEWAY),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
