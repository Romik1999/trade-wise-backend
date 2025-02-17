import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { components, ...productData } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...productData,
        components: {
          create: components?.map(({ id, quantity }) => ({
            component: { connect: { id } },
            quantity,
          })),
        },
      },
      include: { components: true },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: { components: true },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        components: true,
      },
    });

    if (!product) throw new NotFoundException('Товар не найден');

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    const { components, ...productData } = updateProductDto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        components: {
          create: components?.map(({ id, quantity }) => ({
            component: { connect: { id } }, // Указываем ID компонента
            quantity, // Передаем количество
          })),
        },
      },
      include: { components: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
