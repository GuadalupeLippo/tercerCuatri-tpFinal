import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecipsService } from './recips.service';
import { CreateRecipDto } from './dto/create-recip.dto';
import { UpdateRecipDto } from './dto/update-recip.dto';
import { AlphanumericPipe } from './pipes/alphanumeric.pipe';
import { iRecips } from './recips.interface';



@Controller('recips')
export class RecipsController {
  constructor(private readonly recipsService: RecipsService) {}
 @Get()
  async findAllRecips(): Promise<iRecips[]> {
    return await this.recipsService.findAllRecips();
  }
  
  @Get(':id')
  async findOneRecip(@Param('id', AlphanumericPipe) id: string) : Promise<iRecips[]>  {
     return this.recipsService.findOneRecip(id);
  }

  @Get('search/name')
  async getRecipByName(@Query('name') nameRecip: string): Promise<iRecips[]> {
      return await this.recipsService.getRecipByName(nameRecip);
  }
  @Post()
  async create(@Body() CreateRecipDto: CreateRecipDto) : Promise<iRecips[]> {
    return await this.recipsService.create(CreateRecipDto);
  }
  
  @Patch(':id')
   async update(@Param('id') id: string, @Body() UpdateRecipDto: UpdateRecipDto) : Promise<iRecips[]> {
    return await this.recipsService.update(id, UpdateRecipDto);
  }

  @Delete(':id')
  async removeRecip(@Param('id') id: string) : Promise<iRecips[]>  {
    return await this.recipsService.removeRecip(id);
  }
}
