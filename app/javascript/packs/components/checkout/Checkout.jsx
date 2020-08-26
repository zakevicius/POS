import React, { useEffect, useState } from 'react';
import { getExchangeRates } from '../functions/api';
import Selection from './Selection';

// {
//   location: {
//     state: { order },
//   },
// }

const Checkout = ({ order = { id: 123 } }) => {
  const [rates, setRates] = useState({
    BTC: {
      name: 'Bitcoin',
      rate: 'fetching',
      short: 'BTC',
    },
    LTC: {
      name: 'Litecoin',
      rate: 'fetching',
      short: 'LTC',
    },
    BCH: {
      name: 'Bitcoin Cash',
      rate: 'fetching',
      short: 'BCH',
    },
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    // fetchRates();
  }, [order.id]);

  const fetchRates = async () => {
    try {
      let [BTCr, BCHr, LTCr] = await getExchangeRates();
      setRates({
        ...rates,
        BTC: {
          ...rates.BTC,
          rate: BTCr,
        },
        LTC: {
          ...rates.LTC,
          rate: LTCr,
        },
        BCH: {
          ...rates.BCH,
          rate: BCHr,
        },
      });
    } catch (err) {
      setError('Could not get exchange rates. Please try again later');
    }
    setLoading(false);
  };

  const renderSelections = () => {
    rates.map((rate) => <Selection data={rate} />);
  };

  if (loading) return <div>Loading</div>;

  return (
    <div id="checkout">
      <div class="info">
        <span>Simple</span>
        <span>0.21 EUR</span>
      </div>
      <div class="currency">
        <h2>Select payment currency</h2>
        {renderSelections()}
      </div>
      <div class="buttons">
        <div class="btn btn-confirm disabled">Pay</div>
        <div class="btn btn-cancel">Cancel</div>
      </div>
    </div>
  );
};

export default Checkout;
