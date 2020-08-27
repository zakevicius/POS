import { getExchangeRates } from './api';

const MAX_LIMIT = 100000;
let amountArr = [];

export const updateAmount = (value) => {
  if ((value === '0' || value === '00') && amountArr.length === 0) return;

  switch (value) {
    case '00':
      amountArr.push('0', '0');
      break;
    default:
      amountArr.push(value);
  }
  let amount = getAmount(amountArr);

  if (amount > MAX_LIMIT) {
    if (value === '00') amountArr.pop();
    amountArr.pop();
    return new Error('Maximum amount is 100000');
  } else {
    return amount;
  }
};

const getAmount = (arr) => {
  let amount = 0;
  for (let j = 0; j < arr.length; j++) {
    amount += (arr[j] * Math.pow(10, arr.length - j - 1)) / 100;
  }
  return parseFloat(amount.toFixed(2));
};

export const reset = () => {
  amountArr = [];
};

export const shake = (target) => {
  target.classList.add('shake');
  setTimeout(function () {
    target.classList.remove('shake');
  }, 200);
};

export const click = (target) => {
  target.classList.add('clicked');
  setTimeout(function () {
    target.classList.remove('clicked');
  }, 200);
};

export const exchange = (amount, rate) => {
  const REALLY_BIG_NUMBER = 10000000000;
  let value = (rate * (amount * REALLY_BIG_NUMBER)) / REALLY_BIG_NUMBER;
  return value;
};

export const copy2dObject = (obj) => {
  console.log(obj);
  let newObj = {};

  for (let key in obj) {
    if (Object.keys(obj[key]).length > 0) {
      for (let innerKey in obj[key]) {
        newObj[key] = { ...newObj[key] };
        newObj[key][innerKey] = obj[key][innerKey];
      }
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
