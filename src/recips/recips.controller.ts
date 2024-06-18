import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipsService } from './recips.service';
import { CreateRecipDto } from './dto/create-recip.dto';
import { UpdateRecipDto } from './dto/update-recip.dto';

@Controller('recips')
export class RecipsController {
  constructor(private readonly recipsService: RecipsService) {}
 @Get()
  findAllRecips(): Promise<any> {
    return this.recipsService.findAllRecips();
  }
  
  @Get(':id')
  findOneRecip(@Param('id') id: string) : Promise<any>  {
    return this.recipsService.findOneRecip(id);
  }

  @Post()
  create(@Body() createRecipDto: CreateRecipDto) {
    return this.recipsService.create(createRecipDto);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipDto: UpdateRecipDto) {
    return this.recipsService.update(id, updateRecipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipsService.remove(id);
  }
}
