import React from 'react';

import Button from 'components/utils/button/Button';
import MainLayout from '/components/layouts/main-layout/MainLayout.jsx';

import s from 'styles/checkouttype.module.scss';

function CheckoutType() {
    return (
        <section>
            <div className={s['checkout_types']}>
                <div className={s['user_checkout']}>
                    <h1>Sign In</h1>
                    <form className={s['login_form']}>
                        <div className={s['input_group']}>
                            <label>Email</label>
                            <input type="email" required />
                        </div>

                        <div className={s['input_group']}>
                            <label>Password</label>
                            <input type="password" required />
                        </div>

                        <button type="submit">Sign In</button>
                    </form>
                </div>

                <div className={s['guest_checkout']}>
                    <h1>Guest Checkout</h1>
                    <Button
                        variant="primary"
                        value="Checkout As Guest"
                        link={`/checkout/delivery?mode=guest`}
                        icon="/utils/chevron-right.svg"
                        hasLink={true}
                    />
                </div>
            </div>
        </section>
    );
}

CheckoutType.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export default CheckoutType;
