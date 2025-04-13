import { IsString, Length, IsEmail, Matches, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(20, 60)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one uppercase letter and one special character',
  })
  password: string;

  @IsString()
  @Length(0, 400)
  address: string;

  @IsEnum(['ADMIN', 'NORMAL', 'STORE_OWNER'])
  role: string;
}