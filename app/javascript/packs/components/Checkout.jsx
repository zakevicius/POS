import React from 'react';
import { getOrders } from './functions/api';

const Checkout = ({
	location: {
		state: { order }
	}
}) => {
	getOrders();
	return <div> Checkout </div>;
};

export default Checkout;
