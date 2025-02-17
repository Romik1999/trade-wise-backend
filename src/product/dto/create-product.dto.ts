import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductComponentDto {
  @IsString({ message: 'ID компонента должен быть строкой' })
  @IsNotEmpty({ message: 'ID компонента не может быть пустым' })
  id: string;

  @IsNumber({}, { message: 'Количество должно быть числом' })
  @IsNotEmpty({ message: 'Количество не может быть пустым' })
  quantity: number;
}

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

  @ValidateNested({ each: true })
  @Type(() => ProductComponentDto)
  @IsOptional()
  components?: ProductComponentDto[];
}
