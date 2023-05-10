import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientController } from './clients.contoller';
import { ClientService } from './clients.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [PrismaModule],
})
export class ClientModule {}
