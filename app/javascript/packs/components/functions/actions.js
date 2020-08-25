let amountArr = [];

export const updateAmount = (value) => {
	if (amountArr.length >= 8) return;
	if ((value === '0' || value === '00') && amountArr.length === 0) return;

	switch (value) {
		case '00':
			amountArr.push('0', '0');
			break;
		default:
			amountArr.push(value);
	}
	return getAmount(amountArr);
};

const getAmount = (arr) => {
	let amount = 0;
	for (let j = 0; j < arr.length; j++) {
		amount += (arr[j] * Math.pow(10, arr.length - j - 1)) / 100;
	}
	return parseFloat(amount.toFixed(2));
};

export const reset = () => {
	amountArr = [];
};

export const shake = (target) => {
	target.classList.add('shake');
	setTimeout(function () {
		target.classList.remove('shake');
	}, 200);
};

export const click = (target) => {
	target.classList.add('clicked');
	setTimeout(function () {
		target.classList.remove('clicked');
	}, 200);
};
