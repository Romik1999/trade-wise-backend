import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ComponentService {
  constructor(private prisma: PrismaService) {}

  create(createComponentDto: CreateComponentDto) {
    return this.prisma.component.create({
      data: createComponentDto,
    });
  }

  findAll(
    search?: string,
    sort?: { field: string; order: 'asc' | 'desc' }[],
    price?: { min?: number; max?: number },
    createdAt?: { from?: Date; to?: Date },
    page: number = 1,
    pageSize: number = 10,
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    return this.prisma.component.findMany({
      orderBy: sort?.map(({ field, order }) => ({ [field]: order })) || {
        createdAt: 'desc',
      },
      where: {
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { description: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
          price
            ? {
                price: {
                  gt: price.min,
                  lt: price.max,
                },
              }
            : {},
          createdAt
            ? {
                createdAt: {
                  gte: createdAt.from,
                  lte: createdAt.to,
                },
              }
            : {},
        ],
      },
      include: {
        products: true,
      },
      skip,
      take,
    });
  }

  async findOne(id: string) {
    const component = await this.prisma.component.findUnique({
      where: {
        id,
      },
    });

    if (!component) throw new NotFoundException('Компонент не найден');

    return component;
  }

  async update(id: string, updateComponentDto: UpdateComponentDto) {
    await this.findOne(id);

    return this.prisma.component.update({
      where: { id },
      data: updateComponentDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.component.delete({
      where: { id },
    });
  }
}
