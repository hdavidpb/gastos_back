import { ISpots } from 'src/interfaces/interfaces';

export const getLast6Months = (spots: ISpots[]): ISpots[] => {
  let last6Months: ISpots[] = [];

  if (spots.length > 6) {
    const diff = spots.length - 6;

    last6Months = spots
      .reverse()
      .slice(0, spots.length - diff)
      .sort((a, b) => {
        if (a.monthNumber < b.monthNumber) return -1;
        if (a.monthNumber > b.monthNumber) return 1;
        return 0;
      });
  } else {
    last6Months = spots;
  }

  return last6Months;
};
