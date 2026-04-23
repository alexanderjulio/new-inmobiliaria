import { Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':propertyId')
  async toggle(@Param('propertyId') propertyId: string, @Request() req) {
    return this.favoritesService.toggleFavorite(req.user.id, propertyId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.favoritesService.getFavorites(req.user.id);
  }
}
