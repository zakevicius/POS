import React, { useState, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CellButton from "./CellButton";
import Row from "./Row";
import { click, shake, updateAmount, reset } from "./functions/actions";
import { submitOrder } from "./functions/api";

const PointOfSale = () => {
  //History
  let history = useHistory();
  // State
  const [amount, setAmount] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  // Refs
  const amountDislpay = useRef();
  // Vars
  const CURRENCY = "EUR";
  const CELLS_PER_ROW = 3;
  const buttonValues = [
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "00",
    "0",
    "C",
  ];

  const onCellClick = (e, value) => {
    if (error) setError(null);
    click(e.target);

    if (value === "C") {
      setAmount();
      return reset();
    }

    try {
      setAmount(updateAmount(value) || amount);
    } catch (err) {
      setError(err.msg);
    }
  };

  const onSubmit = async () => {
    if (!amount || amount === 0) {
      setError("Enter amount");
      shake(amountDislpay.current);
    } else {
      let order;
      if (error) setError();
      setLoading(true);
      try {
        order = await submitOrder(amount);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
      history.push({
        pathname: "/checkout",
        state: {
          order,
        },
      });
    }
  };

  const renderCellButtons = () => {
    let rows = [];
    let cellData = [];

    for (let i = 0; i < buttonValues.length / CELLS_PER_ROW; i++) {
      for (let j = 0; j < CELLS_PER_ROW; j++) {
        let value = buttonValues[i * CELLS_PER_ROW + j];
        if (value === undefined) break;
        cellData.push(
          <CellButton key={value} value={value} onCellClick={onCellClick} />
        );
      }
      rows.push(<Row key={i} cells={cellData} />);
      cellData = [];
    }
    return rows;
  };

  const renderLoading = () => <div className='bigLoading'>LOADING...</div>;

  const renderPOS = () => (
    <table>
      <tbody>
        <tr>
          <td colSpan={CELLS_PER_ROW}>Simple</td>
        </tr>
        <tr>
          <td colSpan={CELLS_PER_ROW} id='value' ref={amountDislpay}>
            {`${amount ? amount.toFixed(2) : `0.00`} ${CURRENCY}`}
          </td>
        </tr>
        <tr id='error' className={error ? "active" : ""}>
          <td colSpan={CELLS_PER_ROW} id='errorMessage'>
            {error}
          </td>
        </tr>

        {renderCellButtons()}

        <tr>
          <td
            colSpan={CELLS_PER_ROW}
            id='submit'
            className='btn btn-confirm'
            onClick={onSubmit}
          >
            OK
          </td>
        </tr>
      </tbody>
    </table>
  );

  return loading ? renderLoading() : renderPOS();
};

export default PointOfSale;
