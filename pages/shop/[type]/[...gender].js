import React from 'react';

import { server } from '/config';

import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';

import Filters from 'containers/Filters/Filters';

function ShopPageGender({ filters, products }) {
    console.log(products);
    return (
        <section>
            <Filters filters={filters} />
        </section>
    );
}

ShopPageGender.getLayout = (page) => {
    return <MainLayout category={page.props.category}>{page}</MainLayout>;
};

export async function getServerSideProps(context) {
    const { type, gender } = context.params;

    // fetch to fetch(`${server}/api/brand`) and send type and gender
    let res = await fetch(`${server}/api/filters`, {
        method: 'POST',
        body: JSON.stringify({
            type,
            gender,
        }),
    });

    let filters = await res.json();

    res = await fetch(`${server}/api/products`, {
        method: 'POST',
        body: JSON.stringify({
            type,
            gender,
        }),
    });

    let products = await res.json();
    return {
        props: {
            filters,
            products,
        },
    };
}

export default ShopPageGender;
