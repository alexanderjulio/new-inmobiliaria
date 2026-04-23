import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PropertyCreateInput) {
    return this.prisma.property.create({
      data,
    });
  }

  async findAll(filters: any) {
    const { city, type, status, minPrice, maxPrice } = filters;
    
    return this.prisma.property.findMany({
      where: {
        city: city ? { name: city } : undefined,
        type: type || undefined,
        status: status || undefined,
        price: {
          gte: minPrice ? new Prisma.Decimal(minPrice) : undefined,
          lte: maxPrice ? new Prisma.Decimal(maxPrice) : undefined,
        },
      },
      include: {
        city: true,
        category: true,
        owner: {
          select: {
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.property.findUnique({
      where: { id },
      include: {
        city: true,
        category: true,
        owner: true,
        project: true,
      },
    });
  }
}
