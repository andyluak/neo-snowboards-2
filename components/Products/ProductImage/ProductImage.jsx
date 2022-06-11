import React from 'react';
import Image from 'next/image';

import s from './style.module.scss';
import { useRouter } from 'next/router';

const ProductImage = ({ image, name, className }) => {
    const router = useRouter();
    const { type, gender } = router.query;
    const stringGender = gender[0];

    return (
        <div className={s['product_image_wrapper']}>
            <Image src={`/images/${type}/${gender}/${image}`} alt={name} width={275} height={300} className={className}/>
        </div>
    );
}


export default ProductImage;
