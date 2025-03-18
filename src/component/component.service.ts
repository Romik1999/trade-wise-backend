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

  async findAll(
    search?: string,
    sortBy?: { [key: string]: string }[],
    price?: { min?: number; max?: number },
    createdAt?: { from?: Date; to?: Date },
    page: number = 1,
    pageSize: number = 10,
  ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where = {
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
                gte: price.min,
                lte: price.max,
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
    };

    const [items, total] = await Promise.all([
      this.prisma.component.findMany({
        orderBy: sortBy,
        where,
        include: {
          products: true,
        },
        skip,
        take,
      }),
      this.prisma.component.count({ where }),
    ]);

    return {
      items,
      total,
    };
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

    await this.prisma.component.delete({
      where: { id },
    });

    return {
      statusCode: 200,
      data: {
        message: 'Компонент удален успешно',
      },
    };
  }
}
