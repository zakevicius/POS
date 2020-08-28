import { token } from './token.json';

const CORS =
  window.location.hostname === 'localhost'
    ? 'https://cors-anywhere.herokuapp.com/'
    : '';
const ENDPOINT = 'https://api-sandbox.coingate.com/v2/orders';

export const submitOrder = async (data) => {
  const body = new URLSearchParams();

  body.append('price_amount', data.amount);
  body.append('price_currency', data.currency);
  body.append('receive_currency', 'EUR');
  body.append('order_id', data.order_id);
  body.append('cancel_url', `${window.location.origin}/${data.order_id}`);
  body.append('success_url', `${window.location.origin}/${data.order_id}`);

  try {
    const response = await fetch(`${CORS.concat(ENDPOINT)}`, {
      body,
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.status === 200) return response.json();

    throw new Error('Could not create new order');
  } catch (err) {
    return err;
  }
};

export const submitCheckout = async (data) => {
  const body = new URLSearchParams();

  body.append('pay_currency', data.currency);

  try {
    const response = await fetch(
      `${CORS.concat(ENDPOINT)}/${data.id}/checkout`,
      {
        body,
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200) return response.json();

    throw new Error('Could not create new order');
  } catch (err) {
    return err;
  }
};

export const getOrder = async (id) => {
  try {
    let response = await fetch(`${CORS.concat(ENDPOINT)}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.status === 200) {
      let result = await response.json();

      result = result.orders.find((item) => item.order_id === id);

      if (result) return result;
    }

    throw new Error('Could not get order information');
  } catch (err) {
    return err;
  }
};

export const getExchangeRates = async (currencies) => {
  let result = {};
  let tempResult = [];

  const response = await Promise.all(
    currencies.map((cur) =>
      fetch(`${CORS}https://api.coingate.com/v2/rates/merchant/EUR/${cur}`)
    )
  );

  tempResult = await Promise.all(response.map((r) => r.json()));

  tempResult.forEach((v, i) => {
    result[currencies[i]] = new Object({ rate: v });
  });

  return result;
};
