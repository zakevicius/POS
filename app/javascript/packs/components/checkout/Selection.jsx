import React, { useEffect } from 'react';
import { exchange } from '../functions/actions';

const Selection = ({ data: { rates, amount } }) => {
  useEffect(() => {}, [rates.rate]);

  console.log(rates.rate);
  console.log(typeof rates.rate);

  return (
    <div className="selection">
      <img
        src={`https://assets.coingate.com/images/cryptocurrencies/${rates.name
          .toLowerCase()
          .replace(' ', '_')}.png`}
        alt={rates.name}
      />
      <p>
        {rates.name}
        <span>{`${exchange(amount, rates.rate)} ${rates.short}`}</span>
      </p>
    </div>
  );
};

export default Selection;
