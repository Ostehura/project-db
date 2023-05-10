import {
  Controller,
  Get,
  Render,
  Query,
  Post,
  Body,
  Res,
} from '@nestjs/common';

import { ParcelService } from './parcel.service';

@Controller('parcels')
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}

  @Get('/track')
  @Render('parcel-status')
  async getParcelStatuses(@Query('trackNumber') trackNumber: string) {
    console.log(trackNumber);
    const parcel = await this.parcelService.getParcel(trackNumber);
    console.log(parcel);

    return { parcel };
  }

  @Get()
  @Render('parcels')
  async getAllParces() {
    const parcels = await this.parcelService.getAllParcels();
    return { parcels };
  }

  @Get('/create')
  @Render('create-parcel')
  async createParcelPage() {
    const clients = await this.parcelService.getClientsList();
    return { clients };
  }

  @Post('/create')
  async createParcel() {
    const clients = await this.parcelService.getClientsList();
    return { clients };
  }

  @Post()
  async create(@Body() data, @Res() res) {
    const { trackNumber, sender, receiver } = data;
    try {
      // Use Prisma to create a new parcel record in the database
      this.parcelService.createParcel(
        trackNumber,
        Number.parseInt(sender),
        Number.parseInt(receiver),
      );
      res.redirect('/parcels');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating parcel');
    }
  }

  @Get('/stats')
  @Render('stats')
  async statsPage() {
    const statBySenderCity =
      await this.parcelService.numberOfDeliveredBySenderCity();
    const statByDestinationCity =
      await this.parcelService.numberOfDeliveredvByDeliveryCity();
    console.log(statBySenderCity);
    return { statBySenderCity, statByDestinationCity };
  }
}
