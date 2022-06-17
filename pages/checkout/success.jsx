import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';

import getStore from 'redux/store';
import { selectOrder, removeOrder } from 'redux/slices/orderSlice';

export default function CheckoutSuccessPage() {
    const dispatch = useDispatch();
    const order = useSelector(selectOrder);
    console.log(order);
    useEffect(() => {
        // set the order to null after 5 seconds
        setTimeout(() => {
            dispatch(removeOrder());
        }, 5000);
    }, []);

    return (
        <section>
            <h1>Your order has been succesfully placed</h1>
        </section>
    );
}

CheckoutSuccessPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};
