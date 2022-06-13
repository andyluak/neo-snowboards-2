import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';
import { setDeliveryDetails } from 'redux/slices/orderSlice';

import s from 'styles/delivery.module.scss';

function DeliveryPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const getDateIn5Days = () => {
        const date = new Date();
        date.setDate(date.getDate() + 5);
        // convert date to string format
        const dateString = date.toLocaleDateString('en-US', { month: 'long' });
        return `${dateString} ${date.getDate()}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // get form data
        const formData = new FormData(e.target);
        const data = {};
        for (let key of formData.keys()) {
            data[key] = formData.get(key);
        }
        const {
            first_name,
            last_name,
            country,
            adress_line1,
            adress_line2,
            phone_number,
            email,
            postal_code,
            city,
        } = data;

        const deliveryAdress = {
            country,
            city,
            postal_code,
            adress_line1,
            adress_line2,
        };

        dispatch(
            setDeliveryDetails({
                first_name,
                last_name,
                phone_number,
                email,
                deliveryAdress,
            })
        );
        console.log(router);
        router.push('/checkout/payment');
    };

    return (
        <section className={s['delivery_page']}>
            <h1>Delivery Method</h1>
            <div className={s['delivery_price']}>
                <p>Express Delivery</p>
                <p>$25</p>
            </div>
            <p>Delivered before {getDateIn5Days()}</p>
            <span className="line"></span>

            <div className={s['delivery_info']}>
                <p>Delivery Adress</p>
                <form className={s['delivery_form']} onSubmit={handleSubmit}>
                    <div className={s['inline_input']}>
                        <div className={s['input_group']}>
                            <label>First Name</label>
                            <input type="text" required name="first_name" />
                        </div>
                        <div className={s['input_group']}>
                            <label>Last Name</label>
                            <input type="text" required name="last_name" />
                        </div>
                    </div>
                    <div className={s['input_group']}>
                        <label>Country</label>
                        <input type="text" required name="country" />
                    </div>
                    <div className={s['input_group']}>
                        <label>Adress Line 1</label>
                        <input type="text" required name="adress_line1" />
                    </div>
                    <div className={s['input_group']}>
                        <label>Adress Line 2</label>
                        <input type="text" required name="adress_line2" />
                    </div>
                    <div className={s['inline_input']}>
                        <div className={s['input_group']}>
                            <label>Postal Code</label>
                            <input type="text" required name="postal_code" />
                        </div>
                        <div className={s['input_group']}>
                            <label>City</label>
                            <input type="text" required name="city" />
                        </div>
                    </div>
                    <div className={s['input_group']}>
                        <label>Phone Number</label>
                        <input type="text" required name="phone_number" />
                    </div>
                    <div className={s['input_group']}>
                        <label>Email</label>
                        <input type="text" required name="email" />
                    </div>
                    <div className={s['input_group']}>
                        <label className={s['label_group']}>
                            {'I agree to the Terms & Conditions'}
                            <input type="checkbox" required />
                        </label>
                    </div>
                    <button className={s['submit_btn']}>
                        Proceed to Payment
                    </button>
                </form>
            </div>
        </section>
    );
}

DeliveryPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export default DeliveryPage;
