import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AlphanumericPipe implements PipeTransform {
  transform(value: any) {
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
    //validacion para que el si el id ingresado, el tipo no es un string o no cumple las expresiones regulares, lance un error 
    if (typeof value !== 'string' || !alphanumericRegex.test(value)) {
      throw new BadRequestException('Validation failed: the id must be composed of letters and numbers');
    }

    return value;
  }
}
