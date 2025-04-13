import { Controller, Post, Body, Patch, UseGuards, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto, UpdateRatingDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('NORMAL')
  @Post()
  create(@Request() req, @Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(req.user.id, createRatingDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('NORMAL')
  @Patch()
  update(@Request() req, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(req.user.id, updateRatingDto);
  }
}