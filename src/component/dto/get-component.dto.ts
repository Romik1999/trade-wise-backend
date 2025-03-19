import { ApiPropertyOptional } from '@nestjs/swagger';

class PriceFilterDto {
  @ApiPropertyOptional({ example: 100, description: 'Минимальная цена' })
  min?: number;

  @ApiPropertyOptional({ example: 500, description: 'Максимальная цена' })
  max?: number;
}

class DateFilterDto {
  @ApiPropertyOptional({ example: '2024-01-01', description: 'Начальная дата' })
  from?: Date;

  @ApiPropertyOptional({ example: '2024-12-31', description: 'Конечная дата' })
  to?: Date;
}

export class FindProductsDto {
  @ApiPropertyOptional({ example: 'example', description: 'Поисковый запрос' })
  search?: string;

  sort?: string[];

  @ApiPropertyOptional({ type: PriceFilterDto, description: 'Фильтр по цене' })
  price?: PriceFilterDto;

  @ApiPropertyOptional({ type: DateFilterDto, description: 'Фильтр по дате' })
  createdAt?: DateFilterDto;

  @ApiPropertyOptional({ example: 1, description: 'Номер страницы' })
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Количество элементов на странице',
  })
  pageSize?: number;
}

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

export class GetComponentDto {
  @IsString({
    message: 'Название обязательно',
  })
  @ApiProperty({
    example: 'cm8gap6ez00000cjp0xur51kg',
    description: 'id компонента',
    required: true,
  })
  id: string;

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
