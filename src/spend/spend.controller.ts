import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { spendDTO } from 'src/dtos/spend.dto';
import { SpendService } from './spend.service';

@Controller('api/spend')
export class SpendController {
  constructor(readonly userService: SpendService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  createUser(@Request() res: any, @Body() body: spendDTO) {
    return this.userService.createSpend(res.user.id, body);
  }

  @Get('spots')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getAllSpotByActualYear(@Request() res: any) {
    return this.userService.getAllSpotsBycurrentYear(res.user.id);
  }

  @Get('years')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getAllSpends(@Request() res: any) {
    return this.userService.getAllSpends(res.user.id);
  }

  @Get('spensdByYear/:year')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getAllSpendsByYear(@Request() res: any, @Param('year') year: number) {
    return this.userService.getAllSpendsByYear(res.user.id, year);
  }
}
