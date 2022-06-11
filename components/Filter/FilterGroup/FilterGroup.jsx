import React from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import createTaggedFiltersObject from 'utils/filters/createTaggedFilters';
import { setFilters, selectTaggedFilters } from 'redux/slices/shopSlice';

import s from './style.module.scss';

function FilterGroup({ type, filters }) {
    const dispatch = useDispatch();
    const taggedFilters = useSelector(selectTaggedFilters);
    console.log(type);
    const brandFilters = () => {
        const onChange = (e) =>
            dispatch(
                setFilters(
                    createTaggedFiltersObject(type,e.target.value,taggedFilters) //prettier-ignore
                )
            );
        return filters.map((filter, index) => (
            <div key={index} className={s['filter_group_checkbox_container']}>
                <input
                    type="checkbox"
                    name={filter.brand}
                    id={filter.brand}
                    value={filter.brand}
                    className={s['checkbox_container_input']}
                    onChange={onChange}
                />
                <label
                    htmlFor={filter.brand}
                    className={cx('capitalize', s['checkbox_container_label'])}
                >
                    {filter.brand}
                </label>
            </div>
        ));
    };

    const sizeFilters = () => {
        const onChange = (e) => {
            dispatch(setFilters( createTaggedFiltersObject(type,e.target.value,taggedFilters) )); //prettier-ignore
        }

        return filters.map((filter, index) => {
            return (
                <div key={index} className={s['filter_group_size_container']}>
                    <button onClick={onChange} value={filter}>{filter}</button>
                </div>
            )
        })
    }
    if (type === 'brand') {
        return (
            <div className={s['filter_group']}>
                <h5 className={s['filter_group_title']}>Brands</h5>
                {brandFilters()}
            </div>
        );
    }

    if ( type === 'size' ) {
        return (
            <div className={s['filter_group']}>
                <h5 className={s['filter_group_title']}>Sizes</h5>
                {sizeFilters()}
            </div>
        )
    }
    return <div>FilterGroup</div>;
}

export default FilterGroup;
