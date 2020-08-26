import { token } from './token.json';

const CORS = 'https://cors-anywhere.herokuapp.com';
const ENDPOINT = 'https://api-sandbox.coingate.com/v2/orders';

export const submitOrder = async (data) => {
  const body = new URLSearchParams();

  body.append('price_amount', data.amount);
  body.append('price_currency', data.currency);
  body.append('receive_currency', 'EUR');

  const response = await fetch(`${CORS}/${ENDPOINT}`, {
    body,
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.json();
};

export const submitCheckout = async (order) => {
  return '';
};

export const getOrders = async () => {
  fetch(`${CORS}/${ENDPOINT}?sort=created_at_desc`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export const getExchangeRates = async () => {
  const response = await Promise.all(
    ['BTC', 'ETH', 'LTC'].map((cur) =>
      fetch(`${CORS}/https://api.coingate.com/v2/rates/merchant/EUR/${cur}`)
    )
  );
  return Promise.all(response.map((r) => r.json()));
};
