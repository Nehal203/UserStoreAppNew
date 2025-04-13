import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll(@Query('name') name?: string, @Query('email') email?: string, @Query('role') role?: string) {
    return this.usersService.findAll({ name, email, role });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  updatePassword(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updatePassword(req.user.id, updateUserDto.password);
  }
}