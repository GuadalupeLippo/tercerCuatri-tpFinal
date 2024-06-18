import { Injectable } from '@nestjs/common';
import { CreateRecipDto } from './dto/create-recip.dto';
import { UpdateRecipDto } from './dto/update-recip.dto';

const base_url :string = 'http://localhost:3030/recips/'

@Injectable()
export class RecipsService {
  
  async findAllRecips() : Promise<any> {
    const resp = await fetch(base_url);
    const recips = resp.json();
    return recips;
  }
  
  async findOneRecip(id: string) : Promise<any> {
    const res= await fetch (base_url + id);
    const recip = res.json();
    return recip;
  }
  create(createRecipDto: CreateRecipDto) {
    return 'This action adds a new recip';
  }
  
  update(id: string, updateRecipDto: UpdateRecipDto) {
    return `This action updates a #${id} recip`;
  }

  remove(id: string) {
    return `This action removes a #${id} recip`;
  }
}
