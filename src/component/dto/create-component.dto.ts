import {
  ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EnumUnitMeasure } from '@prisma/client';

export class CreateComponentDto {
  @IsString({
    message: 'Название обязательно',
  })
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  title: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  @MaxLength(256, { message: 'Описание не может превышать 256 символов' })
  description?: string;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @IsNotEmpty({ message: 'Цена не может быть пустой' })
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

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  seller_link: string;

  @IsNumber({}, { message: 'Остаток должна быть числом' })
  @IsOptional()
  remainder: number;

  @IsEnum(EnumUnitMeasure, {
    message: 'Единицы измерения обязателен',
  })
  unit_measure: EnumUnitMeasure;

  @IsNumber({}, { message: 'Длинна должна быть числом' })
  @IsOptional()
  length: number;

  @IsNumber({}, { message: 'Ширина должна быть числом' })
  @IsOptional()
  width: number;

  @IsNumber({}, { message: 'Высота должна быть числом' })
  @IsOptional()
  height: number;

  @IsNumber({}, { message: 'Диаметр должна быть числом' })
  @IsOptional()
  diameter: number;
}
