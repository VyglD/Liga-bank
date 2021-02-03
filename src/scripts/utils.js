import {MILLISECONDS_PER_DAY} from "./constants";

const getTwoDigitString = (number) => {
  return String(number).padStart(2, 0);
};

const getDateStringWithDots = (date) => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const getDateStringWithDashes = (date) => {
  const month = getTwoDigitString(date.getMonth() + 1);
  const day = getTwoDigitString(date.getDate());

  return `${date.getFullYear()}-${month}-${day}`;
};

const getDates = (dateStart, dateFinish) => {
  const dates = [];
  const start = dateStart.getTime();
  const finish = dateFinish.getTime();

  for (let date = start; date <= finish; date = date + MILLISECONDS_PER_DAY) {
    dates.push(getDateStringWithDots(new Date(date)));
  }

  return dates;
};

const getNumberWithComma = (number) => {
  return String(number).replace(`.`, `,`);
};

export {
  getDateStringWithDashes,
  getDateStringWithDots,
  getDates,
  getNumberWithComma,
};
