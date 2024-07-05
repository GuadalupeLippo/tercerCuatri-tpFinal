import {
     IsArray,
      IsNotEmpty,
      IsString,
      IsUrl,  
      Matches,  
      MaxLength,
      MinLength,
    } from "class-validator";


export class CreateRecipDto {
    @IsNotEmpty({
        message:'the name should not be empty.'
    })
    @IsString()
    name: string;
    @IsNotEmpty({
        message:'the image should not be empty.'
    })
    @IsUrl()
    image: string;

   
    @IsArray()
    @IsNotEmpty({
        message:'the ingredients should not be empty.'
    })
    ingredients: string[];

    @IsNotEmpty({
        message:'the instruction should not be empty.'
    })
    @MinLength(10,{
        message: 'The instruction is too short'
    }
    )
    @MaxLength(500,{
        message: 'The instruction is too long'
    }
    )
    instructions: string;

    @IsNotEmpty({
        message:'the cooking time should not be empty'
    })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s]+$/,{
        message: 'The cooking time must be written with numbers.'
    }
    )
    cooking_time: string;
}
