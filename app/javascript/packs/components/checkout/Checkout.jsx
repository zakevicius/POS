import React, { useEffect, useState } from 'react';
import Selection from './Selection';
import { getExchangeRates } from '../functions/api';
import { click } from '../functions/actions';

// const Checkout = ({
//   location: {
//     state: { order = { id: 123, price_amount: 123, price_currency: 'EUR' } },
//   },
// }) => {
const Checkout = ({
  order = { id: 123, price_amount: 123, price_currency: 'EUR' },
}) => {
  const [rates, setRates] = useState({
    BTC: {
      name: 'Bitcoin',
      rate: '',
      short: 'BTC',
    },
    LTC: {
      name: 'Litecoin',
      rate: '',
      short: 'LTC',
    },
    BCH: {
      name: 'Bitcoin Cash',
      rate: '',
      short: 'BCH',
    },
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState();

  useEffect(() => {
    // setLoading(true);
    // setTimeout(() => {
    setLoading(false);
    // }, 1500);
    // fetchRates();
  }, [order.id, order.amount]);

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

  const handleSelection = (e) => {
    const el = e.target.closest('.selection');
    setError();
    setSelected(el.dataset.value);
    setTimeout(() => {
      click(el);
    }, 1);
  };

  const handleSubmit = (e) => {
    if (!selected || e.target.classList.contains('disabled')) {
      setError('Select currency for payment');
    } else {
      console.log(selected);
      console.log('submitting ccheckout');
    }
  };

  const renderSelections = () => {
    let data = [];
    for (let key in rates) {
      data.push(
        <Selection
          key={key}
          data={{
            info: rates[key],
            amount: order.price_amount,
            selected,
          }}
          onSelection={handleSelection}
        />
      );
    }
    return data;
  };

  return (
    <div id="checkout">
      <div className="info">
        <span>Simple</span>
        <span>{`${order.price_amount} ${order.price_currency}`}</span>
      </div>
      <div className="currency">
        <h2>Select payment currency</h2>
        {loading ? <div id="loading">Loading</div> : renderSelections()}
      </div>
      <div id="error" className={error ? 'active' : ''}>
        {error}
      </div>
      <div className="buttons">
        <div
          className={`btn btn-confirm ${selected ? '' : 'disabled'}`}
          onClick={handleSubmit}
        >
          Pay {selected ? `with ${rates[selected].name}` : ''}
        </div>
        <div className="btn btn-cancel">Cancel</div>
      </div>
    </div>
  );
};

export default Checkout;
