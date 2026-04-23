import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async toggleFavorite(userId: string, propertyId: string) {
    const existing = await this.prisma.favorite.findUnique({
      where: {
        userId_propertyId: { userId, propertyId },
      },
    });

    if (existing) {
      return this.prisma.favorite.delete({
        where: { id: existing.id },
      });
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        propertyId,
      },
    });
  }

  async getFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            city: true,
            category: true,
          },
        },
      },
    });
  }
}
