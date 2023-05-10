import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { parcels, client, Prisma } from '@prisma/client';

@Injectable()
export class ParcelService {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query + '\n Params:' + event.params);
    });
  }

  async getParcel(trackNumber: string) {
    const events = await this.prisma
      .$queryRaw`SELECT parcels.events.tracknumber, parcels.events.courier, parcels.events.Date, parcels.events.eventname, parcels.events.location FROM parcels.events WHERE parcels.events.tracknumber IN (${trackNumber}) ORDER BY parcels.events.Date ASC`;
    return { Tracknumber: trackNumber, events: events };
  }

  async getAllParcels() {
    const parcels = await this.prisma.parcels.findMany({
      include: {
        client_parcels_SenderToclient: true,
        client_parcels_RecieverToclient: true,
      },
    });
    return parcels;
  }

  async getClientsList() {
    const clients = await this.prisma
      .$queryRaw`SELECT parcels.client.idclient, parcels.client.fullname, parcels.client.city FROM parcels.client WHERE 1=1`;
    return clients;
  }

  async createParcel(
    trackNumber: string,
    senderId: number,
    receiverId: number,
  ) {
    const newParcel = await this.prisma
      .$queryRaw`INSERT INTO parcels.parcels (Tracknumber,Sender,Reciever) VALUES (${trackNumber},${senderId},${receiverId})`;
    return newParcel;
  }

  async numberOfDeliveredBySenderCity() {
    const stat = await this.prisma
      .$queryRaw`SELECT parcels.client.city, COUNT(parcels.client.city) AS count
      FROM parcels.parcels
      JOIN parcels.client ON parcels.parcels.sender = parcels.client.idclient
      JOIN parcels.events ON parcels.events.tracknumber = parcels.parcels.Tracknumber
      WHERE parcels.events.eventname = 'Delivered'
      GROUP BY parcels.client.city
      ORDER BY parcels.client.city;
      `;
    return stat;
  }

  async numberOfDeliveredvByDeliveryCity() {
    const stat = await this.prisma
      .$queryRaw`SELECT parcels.client.city, COUNT(parcels.client.city) AS count
      FROM parcels.parcels
      JOIN parcels.client ON parcels.parcels.reciever = parcels.client.idclient
      JOIN parcels.events ON parcels.events.tracknumber = parcels.parcels.Tracknumber
      WHERE parcels.events.eventname = 'Delivered'
      GROUP BY parcels.client.city
      ORDER BY parcels.client.city;
      `;
    return stat;
  }
}
