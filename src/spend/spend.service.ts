import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { spendDTO } from 'src/dtos/spend.dto';
import { ISpots } from 'src/interfaces/interfaces';
import { SpendRepository } from 'src/repositories/spend.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { getLast6Months } from 'src/utils/utils';
const dayjs = require('dayjs');
@Injectable()
export class SpendService {
  constructor(
    private userRepository: UserRepository,
    private spenRepository: SpendRepository,
  ) {}

  async createSpend(userId: any, spend: spendDTO) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    console.log(spend);
    if (!user) throw new NotFoundException('user not found');

    const monthNumber = dayjs(spend.fullDate).get('M');
    const year = dayjs(spend.fullDate).get('year');

    const spendeIsntance = this.spenRepository.create({
      value: spend.value,
      description: spend.description,
      fullDate: spend.fullDate,
      monthNumber: monthNumber,
      year: year,
      user: user,
    });

    const newSpend = await this.spenRepository.save(spendeIsntance);

    const response = {
      ...newSpend,
      user: newSpend.user.id,
    };

    return {
      data: {
        statusCode: HttpStatus.OK,
        message: 'spend saved successfully',
        data: response,
      },
    };
  }

  async getAllSpends(userId: any) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException(`User not found`);

    const allSpends = await this.spenRepository.find({
      where: {
        user: user,
      },
    });

    const allYear = allSpends
      .map((spend) => spend.year)
      .sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      });
    const setData = new Set(allYear);
    const years = [...setData];

    return {
      statusCode: HttpStatus.OK,
      years,
    };
  }

  async getAllSpendsByYear(userId: any, year: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException(`User not found`);

    const spendsByUserAndYear = await this.spenRepository.find({
      where: {
        user: user,
        year: year,
      },
    });

    const totalSpendValue = spendsByUserAndYear.reduce(
      (acc, value) => acc + value.value,
      0,
    );

    return {
      statusCode: HttpStatus.OK,
      spends: spendsByUserAndYear,
      totalSpendValue,
    };
  }

  async getAllSpotsBycurrentYear(userId: any) {
    const actualDate = Date.now();
    const actualYear = dayjs(actualDate).get('y');
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException(`User not found`);

    const spendsIntance = await this.spenRepository.find({
      where: {
        user,
        year: actualYear,
      },
    });

    let spots: ISpots[] = [];
    spendsIntance.forEach((spend, index) => {
      let isThere = false;

      spots.forEach((spot) => {
        if (Object.values(spot).includes(spend.monthNumber)) {
          isThere = true;
          spot.value += spend.value;
        }
      });

      if (!isThere) {
        spots.push({
          monthNumber: spend.monthNumber,
          value: spend.value,
        });
      }

      isThere = false;
    });

    spots.sort((a, b) => {
      if (a.monthNumber < b.monthNumber) return -1;
      if (a.monthNumber > b.monthNumber) return 1;
      return 0;
    });

    const last6Months: ISpots[] = getLast6Months(spots);

    return {
      statusCode: HttpStatus.OK,
      spots: last6Months,
    };
  }
}
