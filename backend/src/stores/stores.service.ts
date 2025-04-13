import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(store);
  }

  async findAll(filters: any): Promise<Store[]> {
    return this.storeRepository.find({ where: filters });
  }

  async getRatingsForStoreOwner(userId: number) {
    const store = await this.storeRepository.findOne({
      where: { owner: { id: userId } },
      relations: ['ratings', 'ratings.user'],
    });
    if (!store) throw new NotFoundException('Store not found');
    const ratings = store.ratings.map((r) => ({ userId: r.user.id, rating: r.rating }));
    const averageRating = ratings.length ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0;
    return { ratings, averageRating };
  }
}

export default StoresService;