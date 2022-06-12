import React from 'react';

import s from './style.module.scss';

function QuantitySelector({
    onIncrement,
    onDecrement,
    onSetQuantity,
    quantity,
}) {
    return (
        <div className={s['product_quantity']}>
            <button onClick={onDecrement}>-</button>
            <input
                type="text"
                value={quantity}
                onChange={onSetQuantity} //prettier-ignore
            />
            <button onClick={onIncrement}>+</button>
        </div>
    );
}

export default QuantitySelector;
