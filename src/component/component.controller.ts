import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ComponentService } from './component.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FindProductsDto, GetComponentDto } from './dto/get-component.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

const checkSort = (sort: FindProductsDto) => {
  return Object.entries(sort)
    .filter(([key]) => key.startsWith('sort['))
    .map(([key, value]) => {
      const sortKey = key.slice(5, -1);
      return { [sortKey]: value };
    });
};

@Auth()
@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Метод Создания компонента' })
  @ApiBody({
    type: CreateComponentDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешное создание продукта',
    type: GetComponentDto,
  })
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentService.create(createComponentDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Получить список продуктов с фильтрацией, сортировкой и пагинацией',
  })
  @ApiBody({
    type: FindProductsDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: [GetComponentDto],
  })
  findAll(@Query() query: FindProductsDto) {
    const price =
      query['price[min]'] && query['price[max]']
        ? {
            min: Number(query['price[min]']),
            max: Number(query['price[max]']),
          }
        : undefined;

    const createdAt =
      query['createdAt[from]'] && query['createdAt[to]']
        ? {
            from: query['createdAt[from]'] as Date,
            to: query['createdAt[to]'] as Date,
          }
        : undefined;

    const sortBy = checkSort(query);

    return this.componentService.findAll(
      query.search,
      sortBy,
      price,
      createdAt,
      query.page,
      query.pageSize,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить продукт по его id',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: GetComponentDto,
  })
  findOne(@Param('id') id: string) {
    return this.componentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Обновить данные продукта по его id',
  })
  @ApiBody({
    type: CreateComponentDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: GetComponentDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    return this.componentService.update(id, updateComponentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удалить продукт по его id',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
  })
  remove(@Param('id') id: string) {
    return this.componentService.remove(id);
  }
}
