import React, { useEffect, useState } from 'react';
import { getExchangeRates } from '../functions/api';
import Selection from './Selection';

const Checkout = ({
  location: {
    state: { order = { id: 123, price_amount: 123, price_currency: 'EUR' } },
  },
}) => {
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // setLoading(false);
    fetchRates();
  }, [order.id]);

  const fetchRates = async () => {
    try {
      let [BTCr, BCHr, LTCr] = await getExchangeRates();
      setRates({
        ...rates,
        BTC: {
          ...rates.BTC,
          rate: +BTCr,
        },
        LTC: {
          ...rates.LTC,
          rate: +LTCr,
        },
        BCH: {
          ...rates.BCH,
          rate: +BCHr,
        },
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Could not get exchange rates. Please try again later');
    }
  };

  const renderSelections = () => {
    console.log(rates);
    let data = [];
    for (let key in rates) {
      data.push(
        <Selection
          key={key}
          data={{ rates: rates[key], amount: order.price_amount }}
        />
      );
    }
    return data;
  };

  if (loading) return <div>Loading</div>;

  return (
    <div id="checkout">
      <div className="info">
        <span>Simple</span>
        <span>{`${order.price_amount} ${order.price_currency}`}</span>
      </div>
      <div className="currency">
        <h2>Select payment currency</h2>
        {loading ? <div>Loading</div> : renderSelections()}
      </div>
      <div className="buttons">
        <div className="btn btn-confirm disabled">Pay</div>
        <div className="btn btn-cancel">Cancel</div>
      </div>
    </div>
  );
};

export default Checkout;
