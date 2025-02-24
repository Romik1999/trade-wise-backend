import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ComponentService } from './component.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FindProductsDto } from './dto/get-component.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Auth()
@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Post()
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentService.create(createComponentDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Получить список продуктов с фильтрацией, сортировкой и пагинацией',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ',
    type: [FindProductsDto],
  })
  findAll(@Query() query: FindProductsDto) {
    const price =
      query['price[min]'] && query['price[max]']
        ? {
            min: Number(query['price[min]']),
            max: Number(query['price[max]']),
          }
        : undefined;

    return this.componentService.findAll(
      query.search,
      query.sort,
      price,
      query.createdAt,
      query.page,
      query.pageSize,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    return this.componentService.update(id, updateComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentService.remove(id);
  }
}
