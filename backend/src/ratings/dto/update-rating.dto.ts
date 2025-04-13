import { IsInt, Min, Max } from 'class-validator';

export class UpdateRatingDto {
  @IsInt()
  storeId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}