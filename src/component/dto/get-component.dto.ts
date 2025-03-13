import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class SortDto {
  @ApiProperty({ example: 'price', description: 'Поле для сортировки' })
  field: string;

  @ApiProperty({
    example: 'desc',
    enum: ['asc', 'desc'],
    description: 'Порядок сортировки',
  })
  order: 'asc' | 'desc';
}

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

  @ApiPropertyOptional({ type: [SortDto], description: 'Сортировка' })
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
