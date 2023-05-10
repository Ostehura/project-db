import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { EventController } from './events.contoller';
import { EventService } from './events.service';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [PrismaModule],
})
export class EventModule {}
