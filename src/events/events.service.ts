import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, client, curiers, parcels } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async getAllParcels(): Promise<parcels[]> {
    const parcels = this.prisma.parcels.findMany();
    return parcels;
  }

  async getAllCouriers(): Promise<curiers[]> {
    const couriers = this.prisma.curiers.findMany();
    return couriers;
  }

  async createEvent(
    trackNumber: string,
    courierId: string,
    location: string,
    eventname: string,
    date: Date,
  ) {
    const newEvent = await this.prisma
      .$queryRaw`INSERT INTO parcels.events (tracknumber,courier,Date,eventname,location) VALUES (${trackNumber},${courierId},${date},${eventname},${location});`;
    return newEvent;
  }
}
