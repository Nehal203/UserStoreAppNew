import { IsInt, Min, Max } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  storeId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}