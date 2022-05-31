import React from 'react';

import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';

import Filters from 'containers/Filters/Filters';

function ShopPageGender() {
    return (
        <section>
            <Filters />
        </section>
    );
}

ShopPageGender.getLayout = (page) => {
    return <MainLayout category={page.props.category}>{page}</MainLayout>;
};

export default ShopPageGender;
