import React, { useEffect, useState } from 'react';
import { getExchangeRates } from './functions/api';

// {
//   location: {
//     state: { order },
//   },
// }

const Checkout = ({ order = { id: 123 } }) => {
  const [rates, setRates] = useState({
    BTC: 'fetching',
    ETH: 'fetching',
    LTC: 'fetching',
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchRates();
  }, [order.id]);

  const fetchRates = async () => {
    try {
      let [BTC, ETH, LTC] = await getExchangeRates();
      setRates({
        ...rates,
        BTC,
        ETH,
        LTC,
      });
    } catch (err) {
      setError('Could not get exchange rates. Please try again later');
    }
    setLoading(false);
  };

  if (loading) return <div>Loading</div>;

  return (
    <div>
      {error ? (
        error
      ) : (
        <div>
          BTC: {rates.BTC}
          ETH: {rates.ETH}
          LTC: {rates.LTC}
        </div>
      )}
    </div>
  );
};

export default Checkout;
