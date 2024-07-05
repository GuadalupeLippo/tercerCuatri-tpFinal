import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipDto } from './dto/create-recip.dto';
import { UpdateRecipDto } from './dto/update-recip.dto';
import { iRecips } from './recips.interface';




const base_url :string = 'http://localhost:3030/recips/'

@Injectable()
export class RecipsService {
  
  async findAllRecips() : Promise<iRecips[]> {
    const resp = await fetch(base_url);
    const recips = resp.json();
    return recips;
  }
  
  async findOneRecip(id: string) : Promise<iRecips[]> {
    try{ 
      const res= await fetch (base_url + id);
      const recip = await res.json(); 
      return recip;
    } 
     catch (error){ 
      throw new NotFoundException(`the recip with id: ${id}, does not exists`);
    }
    }
  
  async getRecipByName(nameRecip: string): Promise<iRecips[]> {
    const res = await fetch(base_url);
    const recips = await res.json();

    //Distingo mayusculas minusculas y espacios en la palabra que ingresa
    const normalizedSearchName = nameRecip.trim().toLowerCase();

    // Filtro las recetas
    const recipfiltered = recips.filter((recip: iRecips) => {
        // hago lo mismo con el nombre de la receta actual
        const normalizedRecipName = recip.name.trim().toLowerCase();
        // Verifico si el nombre de la receta contiene la palabra buscada
        return normalizedRecipName.includes(normalizedSearchName);
    });

    // Lanzo una excepción si no se encuentra la palabra en ninguna receta
    if (recipfiltered.length === 0) {
        throw new NotFoundException(`No recipes found containing "${nameRecip}"`);
    }

    return recipfiltered;
}

  

  async create(CreateRecipDto: CreateRecipDto): Promise<iRecips[]> {
    const newRecip = {...CreateRecipDto}
    const res = await fetch (base_url,{
      method:'POST' ,
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newRecip)
    });
    const parsedRes= await res.json()
    return parsedRes
  }
  
  async update(id: string, UpdateRecipDto: UpdateRecipDto) : Promise<iRecips[]> {
    const isRecips = await this.findOneRecip(id);
    if (!Object.keys(isRecips).length) return; //validacion para saber si existe el recurso
    const updateRecip = {...UpdateRecipDto,id}
    const res= await fetch(base_url + id,{
      method: 'PATCH',
      headers: {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify(updateRecip)
    });
    const parsedRes = res.json()
    return parsedRes;
  }

  async removeRecip(id: string): Promise<iRecips[]>  {
    const resp= await fetch(base_url+id,{
      method:'DELETE',
    });
    const parsedRes= resp.json();
    return parsedRes;
  }
}
