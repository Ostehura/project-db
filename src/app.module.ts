import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParcelService } from './parcel/parcel.service';
import { ParcelController } from './parcel/parcel.controller';
import { ParcelModule } from './parcel/parcel.module';
import { PrismaModule } from './prisma/prisma.module';
import { CourierModule } from './couriers/courier.module';
import { CourierService } from './couriers/courier.services';
import { CouriersController } from './couriers/couriers.controller';
import { ClientModule } from './clients/clients.module';
import { ClientController } from './clients/clients.contoller';
import { ClientService } from './clients/clients.service';
import { EventModule } from './events/events.module';
import { EventController } from './events/events.contoller';
import { EventService } from './events/events.service';

@Module({
  imports: [
    ParcelModule,
    PrismaModule,
    CourierModule,
    ClientModule,
    EventModule,
    // AdminBotModule,
  ],
  controllers: [
    AppController,
    ParcelController,
    CouriersController,
    ClientController,
    EventController,
  ],
  providers: [
    AppService,
    ParcelService,
    CourierService,
    ClientService,
    EventService,
    // AdminBotService,
  ],
})
export class AppModule {}
