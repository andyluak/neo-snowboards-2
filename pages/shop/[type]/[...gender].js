import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';
import Filters from 'containers/Filters/Filters';
import Products from 'containers/Products/Products';
import FilterHeader from 'components/Filter/FilterHeader/FilterHeader';

import getStore from '/redux/store';
import {
    getProducts,
    getFilters,
    selectFilteredProducts,
    selectFilters,
} from '/redux/slices/shopSlice';

import s from '/styles/shop.module.scss';

function ShopPageGender() {
    const filteredProducts = useSelector(selectFilteredProducts);
    const filters = useSelector(selectFilters);
    return (
        <section className={s['shop_section']}>
            <FilterHeader />
            <div className={s['shop_section_filters_products']}>
                <Filters filters={filters} />
                <Products products={filteredProducts} />
            </div>
        </section>
    );
}

ShopPageGender.getLayout = (page) => {
    return <MainLayout category={page.props.category}>{page}</MainLayout>;
};

export async function getServerSideProps(context) {
    const { type, gender } = context.query;
    const store = getStore();

    await store.dispatch(getProducts({ type, gender }));
    await store.dispatch(getFilters({ type, gender }));

    return {
        props: {
            initialState: store.getState(),
        },
    };
}

export default ShopPageGender;
