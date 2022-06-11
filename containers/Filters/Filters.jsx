import React, { useState } from 'react';
import FilterGroup from '../../components/Filter/FilterGroup/FilterGroup';

import s from './style.module.scss';

function Filters({ filters }) {
    let filterTypes = Object.keys(filters);
    return (
        <section className={s['filters_section']}>
            {filterTypes.map((type, index) => {
                return (
                    <FilterGroup
                        key={index}
                        type={type}
                        filters={filters[type]}
                    />
                );
            })}
        </section>
    );
}

export default Filters;
