import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({
    message: 'Название обязательно',
  })
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  title: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @MaxLength(256, { message: 'Описание не может превышать 256 символов' })
  description: string;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @IsOptional()
  price: number;

  @IsString({
    message: 'Укажите хотя бы одну картинку',
    each: true,
  })
  @ArrayMinSize(1, { message: 'Должна быть хотя бы одна картинка' })
  @IsNotEmpty({
    each: true,
    message: 'Путь к картинке не может быть пустым',
  })
  images: string[];
}
