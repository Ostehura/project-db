import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { CourierService } from './courier.services';
import { CouriersController } from './couriers.controller';

@Module({
  controllers: [CouriersController],
  providers: [CourierService],
  imports: [PrismaModule],
})
export class CourierModule {}
