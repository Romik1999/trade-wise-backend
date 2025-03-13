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
