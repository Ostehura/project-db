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
import { CourierService } from './courier.services';

@Controller('couriers')
export class CouriersController {
  constructor(private courierService: CourierService) {}

  @Get()
  @Render('couriers/list')
  async findAll() {
    const couriers = await this.courierService.getAllCouriers();

    return { couriers };
  }

  @Post('/:id')
  async updateCourier(
    @Param('id') id: string,
    @Body() updateCourierDto,
    @Res() res,
  ) {
    const { name, webpage } = updateCourierDto;
    await this.courierService.updateCouriers(id, name, webpage);
    res.redirect('/couriers');
  }

  @Get('/edit/:id')
  @Render('couriers/edit')
  async getCourier(@Param('id') id: string) {
    const courier = await this.courierService.getCourier(id);
    return { courier };
  }

  @Get('/delete/:id')
  async DeleteCourier(@Param('id') id: string, @Res() res) {
    await this.courierService.deleteCourier(id);
    res.redirect('/couriers');
    return {};
  }

  @Get('/create')
  @Render('couriers/create')
  async createCourierPage() {
    return {};
  }

  @Post()
  async addCourier(@Body() courier, @Res() res) {
    await this.courierService.createCourier(
      courier.idCuriers,
      courier.name,
      courier.webpage,
    );
    res.redirect('/couriers');
    return;
  }
}
