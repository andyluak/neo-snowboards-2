import React, { useState } from 'react';
import useGuestSession from 'utils/hooks/useGuestSession';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';
import {
    selectDeliveryAdress,
    selectFirstAndLastName,
    selectPhoneNumber,
    selectEmail,
} from '../../redux/slices/orderSlice';

import {
    selectCartItems,
    selectCartTotal,
    selectCartTotalQuantity,
} from 'redux/slices/cartSlice';

import s from 'styles/payment.module.scss';

function PaymentPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const delivery_adress = useSelector(selectDeliveryAdress);
    const { country, city, adress_line1, adress_line2, postal_code } =
        delivery_adress;
    const { first_name, last_name } = useSelector(selectFirstAndLastName);
    const phone_number = useSelector(selectPhoneNumber);
    const email = useSelector(selectEmail);
    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartTotal);
    const total = subtotal + 25;
    const totalQuantity = useSelector(selectCartTotalQuantity);

    const [paymentMethod, setPaymentMethod] = useState('card');

    const cardPayment = () => {
        return (
            <div className={s['card_payment']}>
                <div className={s['input_group']}>
                    <label>Card Number</label>
                    <input type="text" required name={'card_number'} />
                </div>
                <div className={s['input_group']}>
                    <label>Expiry Date</label>
                    <input type="text" required name={'expiry_date'} />
                </div>
                <div className={s['input_group']}>
                    <label>Name on card</label>
                    <input type="text" required name={'name_on_card'} />
                </div>
            </div>
        );
    };

    const bankTransfer = () => {
        return (
            <div className={s['bank_transfer']}>
                <ul>
                    <li>US Bank Routing Number: 082000549</li>
                    <li>State: US Bank Arkansas</li>
                    <li>Bank: Freedom Bank</li>
                </ul>
            </div>
        );
    };

    const cashOnDelivery = () => {
        return (
            <div className={s['cash_on_delivery']}>
                <p>
                    We will send out your package within 5 business days. Once
                    it arrives at your door, you will pay the delivery fee and
                    total price.
                </p>
            </div>
        );
    };

    const paymentTypeSelect = () => {
        return (
            <fieldset className={s['payment_type_radio']}>
                <legend>Payment type</legend>
                <div className={s['radio_input_group']}>
                    <input
                        type="radio"
                        id="card"
                        name="payment_type"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                    />
                    <label htmlFor="card">Card</label>
                </div>
                <div className={s['radio_input_group']}>
                    <input
                        type="radio"
                        id="cash_on_delivery"
                        name="payment_type"
                        value="cash_on_delivery"
                        checked={paymentMethod === 'cash_on_delivery'}
                        onChange={() => setPaymentMethod('cash_on_delivery')}
                    />
                    <label htmlFor="cash_on_delivery">Cash on Delivery</label>
                </div>

                <div className={s['radio_input_group']}>
                    <input
                        type="radio"
                        id="bank_transfer"
                        name="payment_type"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                    />
                    <label htmlFor="bank_transfer">Bank Transfer</label>
                </div>
            </fieldset>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        data.payment_method = paymentMethod;

        const body = {
            first_name,
            last_name,
            delivery_adress,
            phone_number,
            email,
            cartItems,
            subtotal,
            total,
            totalQuantity,
            payment_method: paymentMethod,
        };

        try {
            const response = await fetch('/api/orders/guest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.log(error);
        }

        router.push('/checkout/success');
    };

    return (
        <section className={s['payment_page']}>
            <h1>Payment</h1>
            <div className={s['delivery_information']}>
                <h2>Delivery Information</h2>
                <ul className={s['delivery_adress']}>
                    <li> {`${first_name} ${last_name}`} </li>
                    <li> {`${country} ${city}`} </li>
                    <li> {`${adress_line1}`} </li>
                    <li> {`${adress_line2}`} </li>
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={s['input_group']}>
                    <label className={s['label_group']}>
                        {'Billing Adress same as delivery adress'}
                        <input type="checkbox" required autoComplete="off" />
                    </label>
                </div>
                {paymentTypeSelect()}
                {paymentMethod === 'card' && cardPayment()}
                {paymentMethod === 'cash_on_delivery' && cashOnDelivery()}
                {paymentMethod === 'bank_transfer' && bankTransfer()}
                <button className={s['submit_btn']}>Order Now</button>
            </form>
        </section>
    );
}

PaymentPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export default PaymentPage;
