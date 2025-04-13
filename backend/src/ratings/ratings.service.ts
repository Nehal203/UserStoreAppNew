import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { CreateRatingDto, UpdateRatingDto } from './dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}

  async create(userId: number, createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = this.ratingRepository.create({
      ...createRatingDto,
      user: { id: userId },
      store: { id: createRatingDto.storeId },
    });
    return this.ratingRepository.save(rating);
  }

  async update(userId: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    const rating = await this.ratingRepository.findOne({
      where: { user: { id: userId }, store: { id: updateRatingDto.storeId } },
    });
    if (!rating) throw new NotFoundException('Rating not found');
    rating.rating = updateRatingDto.rating;
    return this.ratingRepository.save(rating);
  }
}

export default RatingsService;