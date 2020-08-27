import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Selection from './Selection';
import { getExchangeRates, submitCheckout } from '../functions/api';
import { click, copy2dObject, shake } from '../functions/actions';

const Checkout = (props) => {
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
  const currencyArr = Object.keys(rates);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState();
  const errorRef = useRef();
  let history = useHistory();
  let order = props.location.state ? props.location.state.order : { id: null };

  useEffect(() => {
    if (!order.id) {
      history.push('/');
    } else {
      setLoading(true);
      fetchRates();
    }
  }, [order.id, order.amount]);

  const fetchRates = async () => {
    try {
      let newRates = copy2dObject(rates);
      let res = await getExchangeRates(currencyArr);

      for (let curr in res) {
        newRates = {
          ...newRates,
          [curr]: {
            ...newRates[curr],
            ...res[curr],
          },
        };
      }

      setRates({
        ...rates,
        ...newRates,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Could not get exchange rates. Please try again later');
      console.log(err.message);
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

  const handleSubmit = async (e) => {
    click(e.target);
    if (error) {
      return shake(errorRef.current);
    }
    if (!selected || e.target.classList.contains('disabled')) {
      setError('Select currency for payment');
    } else {
      setLoading(true);
      try {
        let res = await submitCheckout({
          id: order.id,
          currency: selected,
        });

        setLoading(false);
        if (res.status) {
          history.push({
            pathname: '/',
            state: {
              id: order.id,
            },
          });
        } else {
          setLoading(false);
          throw new Error('Something went wrong...');
        }
      } catch (err) {
        setError(err.message);
      }
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
      <div id="error" className={error ? 'active' : ''} ref={errorRef}>
        {error}
      </div>
      <div className="buttons">
        <div
          className={`btn btn-confirm ${selected && !error ? '' : 'disabled'}`}
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
