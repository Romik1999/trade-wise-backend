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

  findAll() {
    return this.prisma.component.findMany();
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
