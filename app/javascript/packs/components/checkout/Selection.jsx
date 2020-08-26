import React, { useEffect, useRef } from 'react';
import { exchange } from '../functions/actions';

const Selection = ({
  data: {
    info: { rate, name, short },
    amount,
    selected,
  },
  onSelection,
}) => {
  const div = useRef();
  useEffect(() => {}, [rate, selected]);

  return (
    <div
      ref={div}
      className={`selection ${selected === short ? 'selected' : ''}`}
      onClick={onSelection}
      data-value={short}
    >
      <img
        src={`https://assets.coingate.com/images/cryptocurrencies/${name
          .toLowerCase()
          .replace(' ', '_')}.png`}
        alt={name}
      />
      <p>
        {name}
        <span>{`${exchange(amount, rate)} ${short}`}</span>
      </p>
    </div>
  );
};

export default Selection;
