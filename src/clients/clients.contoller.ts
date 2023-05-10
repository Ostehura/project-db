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
import { ClientService } from './clients.service';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  @Render('clients/list')
  async findAll() {
    const couriers = await this.clientService.getAllClients();
    return { couriers };
  }

  @Post('/:id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto,
    @Res() res,
  ) {
    const { fullname, city } = updateClientDto;
    await this.clientService.updateClient(Number.parseInt(id), fullname, city);
    res.redirect('/clients');
  }

  @Get('/edit/:id')
  @Render('clients/edit')
  async getClient(@Param('id') id: string) {
    const client = await this.clientService.getClient(Number.parseInt(id));
    console.log(client);
    return { client };
  }

  @Get('/delete/:id')
  async DeleteClient(@Param('id') id: string, @Res() res) {
    await this.clientService.deleteClient(Number.parseInt(id));
    res.redirect('/clients');
    return {};
  }

  @Get('/create')
  @Render('clients/create')
  async createClientPage() {
    return {};
  }

  @Post()
  async addCourier(@Body() courier, @Res() res) {
    await this.clientService.createClient(courier.fullname, courier.city);
    res.redirect('/clients');
    return;
  }
}
