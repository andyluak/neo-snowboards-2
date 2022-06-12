import React from 'react';

import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';

function DeliveryPage() {
    return <section>delivery</section>;
}

DeliveryPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export default DeliveryPage;
