import React from "react";

const Checkout = ({
  location: {
    state: { order },
  },
}) => {
  console.log(order);
  return <div> Checkout </div>;
};

export default Checkout;
