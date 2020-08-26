import React from './react';

const Selection = (props) => {
  return (
    <div class="selection">
      <img
        src={`https://assets.coingate.com/images/cryptocurrencies/${props.name
          .toLowerCase()
          .split(' ')
          .join('_')}.png`}
        alt={props.name}
      />
      <p>
        {props.name}
        <span>{props.rate}</span>
      </p>
    </div>
  );
};

export default Selection;
