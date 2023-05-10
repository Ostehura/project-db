import { Module } from '@nestjs/common';

import { ParcelController } from './parcel.controller';
import { ParcelService } from './parcel.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ParcelController],
  providers: [ParcelService],
  imports: [PrismaModule],
})
export class ParcelModule {}
