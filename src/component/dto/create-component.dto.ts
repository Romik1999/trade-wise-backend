import {
  ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum EnumUnitMeasure {
  PIECES = 'PIECES',
  PACKAGING = 'PACKAGING',
  GRAMS = 'GRAMS',
  METERS = 'METERS',
}

export class CreateComponentDto {
  @IsString({
    message: 'Название обязательно',
  })
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  @ApiProperty({
    example: 'Компонент 1',
    description: 'Название компонента',
    required: true,
  })
  title: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  @MaxLength(256, { message: 'Описание не может превышать 256 символов' })
  @ApiProperty({
    example: 'Описание компонента 1',
    description: 'Описание компонента, не более 256 символов',
    required: false,
  })
  description?: string;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @IsNotEmpty({ message: 'Цена не может быть пустой' })
  @ApiProperty({
    example: 1000,
    description: 'Цена компонента, строго число',
    required: true,
  })
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
  @ApiProperty({
    example: "['/uploads/no-user-image.png']",
    description: 'Фото компонентаб в виде массива, хотя бы одно',
    required: true,
  })
  images: string[];

  @IsString({ message: 'Ссылка на продавца должна быть строкой' })
  @IsOptional()
  @ApiProperty({
    example: 'sbfbdbdfbdfbf.ru',
    description: 'Ссылка на продаца',
    required: false,
  })
  seller_link?: string;

  @IsNumber({}, { message: 'Остаток должна быть числом' })
  @IsOptional()
  @ApiProperty({
    example: 100,
    description: 'Остаток дома/на складе',
    required: false,
  })
  remainder?: number;

  @IsEnum(EnumUnitMeasure, {
    message: 'Единицы измерения обязателен',
  })
  @ApiProperty({
    example: 'PIECES',
    description: 'Единицы измерения',
    required: true,
  })
  unit_measure: EnumUnitMeasure;

  @IsNumber({}, { message: 'Длинна должна быть числом' })
  @IsOptional()
  @ApiProperty({
    example: 100,
    description: 'Длинна',
    required: false,
  })
  length?: number;

  @IsNumber({}, { message: 'Ширина должна быть числом' })
  @IsOptional()
  @ApiProperty({
    example: 100,
    description: 'Ширина',
    required: false,
  })
  width?: number;

  @IsNumber({}, { message: 'Высота должна быть числом' })
  @IsOptional()
  @ApiProperty({
    example: 100,
    description: 'Высота',
    required: false,
  })
  height?: number;

  @IsNumber({}, { message: 'Диаметр должна быть числом' })
  @IsOptional()
  @ApiProperty({
    example: 100,
    description: 'Диаметр',
    required: false,
  })
  diameter?: number;
}
