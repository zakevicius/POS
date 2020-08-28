import exactMath from 'exact-math';

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
    let multiplyBy = exactMath.pow(10, arr.length - j - 1);
    amount = exactMath.add(amount, exactMath.mul(arr[j], multiplyBy) / 100);
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
  return exactMath.mul(rate, amount);
};

export const copy2dObject = (obj) => {
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

export const makeID = (length) => {
  let id = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
};
