import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { curiers, Prisma } from '@prisma/client';

@Injectable()
export class CourierService {
  constructor(private prisma: PrismaService) {}

  async getAllCouriers() {
    const couriers = await this.prisma
      .$queryRaw`SELECT parcels.curiers.idCuriers, parcels.curiers.name, parcels.curiers.webpage FROM parcels.curiers WHERE 1=1;`;
    return couriers;
  }
  async updateCouriers(id: string, name: string, webpage: string) {
    const updatedCourier = await this.prisma
      .$queryRaw`UPDATE parcels.curiers SET name = ${name}, webpage = ${webpage} WHERE (parcels.curiers.idCuriers IN (${id}) AND (parcels.curiers.idCuriers = ${id} AND 1=1));`;
    return updatedCourier;
  }

  async getCourier(id: string) {
    const courier = await this.prisma
      .$queryRaw`SELECT parcels.curiers.idCuriers, parcels.curiers.name, parcels.curiers.webpage FROM parcels.curiers WHERE parcels.curiers.idCuriers = ${id} LIMIT 1 OFFSET 0;`;
    console.log(courier);
    return courier[0];
  }

  async createCourier(idCuriers: string, name: string, webpage: string) {
    const newCourier = await this.prisma
      .$queryRaw`INSERT INTO parcels.curiers (idCuriers,name,webpage) VALUES (${idCuriers},${name},${webpage})`;
    return newCourier;
  }

  async deleteCourier(idCuriers: string) {
    await this.prisma
      .$queryRaw`DELETE FROM parcels.curiers WHERE (parcels.curiers.idCuriers IN (${idCuriers}) AND (parcels.curiers.idCuriers = ${idCuriers} AND 1=1))`;
  }
}
