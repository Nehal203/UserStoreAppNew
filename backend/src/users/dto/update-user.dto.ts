import { IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one uppercase letter and one special character',
  })
  password: string;
}