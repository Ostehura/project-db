import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async getAllClients() {
    // await this.prisma.$queryRaw`Select * from client;`;
    //const clients = this.prisma.client.findMany()
    const clients = await this.prisma
      .$queryRaw`SELECT parcels.client.idclient, parcels.client.fullname, parcels.client.city FROM parcels.client WHERE 1=1`;
    return clients;
  }
  async updateClient(id: number, fullname: string, city: string) {
    const updatedClient = await this.prisma
      .$queryRaw`UPDATE parcels.client SET fullname = ${fullname}, city = ${city} WHERE (parcels.client.idclient = ${id})`;
    return updatedClient;
  }

  async getClient(id: number) {
    const client = await this.prisma
      .$queryRaw`SELECT parcels.client.idclient, parcels.client.fullname, parcels.client.city FROM parcels.client WHERE parcels.client.idclient = ${id} LIMIT 1 OFFSET 0;`;
    return client[0];
  }

  async createClient(fullname: string, city: string) {
    const newClient = await this.prisma
      .$queryRaw`INSERT INTO parcels.client (fullname,city) VALUES (${fullname},${city})`;
    return newClient;
  }

  async deleteClient(idclient: number) {
    await this.prisma
      .$queryRaw`DELETE FROM parcels.client WHERE (parcels.client.idclient = ${idclient})`;
  }
}
