import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/utils/button/Button';
import { setShowFilters } from 'redux/slices/shopSlice';

import s from './style.module.scss';

function FilterHeader() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const productCount = state.shop.filteredProducts.length;
    return (
        <div className={s['filter_header_wrapper']}>
            <div className={s['filter_header_column_left']}>
                <Button
                    variant="tertiary"
                    value="Hide Filters"
                    onClick={() => dispatch(setShowFilters())}
                />
            </div>

            <div className={s['filter_header_column_right']}>
                <div className={s['filter_header_column_right_item']}>
                    <p>Bestsellers</p>
                    <p>Price: High to Low</p>
                    <p>Price: Low to High</p>
                </div>

                <div className={s['filter_header_column_right_item']}>
                    <p>{productCount}</p>
                    <p>|</p>
                    <p>View All</p>
                </div>
            </div>
        </div>
    );
}

export default FilterHeader;
