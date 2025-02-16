import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateComponentDto {
  @IsString({
    message: 'Название обязательно',
  })
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  name: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  @MaxLength(256, { message: 'Описание не может превышать 256 символов' })
  description?: string;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @IsNotEmpty({ message: 'Цена не может быть пустой' })
  price: number;
}
