import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  Res,
} from '@nestjs/common';

import { EventService } from './events.service';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  @Render('events/create')
  async findAll() {
    const couriers = await this.eventService.getAllCouriers();
    const parcels = await this.eventService.getAllParcels();

    return { couriers, parcels };
  }

  @Post()
  async addEvent(@Body() event, @Res() res) {
    await this.eventService.createEvent(
      event.trackNumber,
      event.courierId,
      event.location,
      event.eventname,
      new Date(event.date),
    );
    res.redirect('/parcels');
    return;
  }
}
