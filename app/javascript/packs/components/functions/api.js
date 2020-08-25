export const submitOrder = async (amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`order: ${amount}`);
    }, 500);
  });
};

export const submitCheckout = async (order) => {
  return "";
};
