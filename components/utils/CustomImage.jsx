import React from 'react';
import Image from 'next/image';

function CustomImage({ src, alt, width, height, ...rest }) {
    return (
        <div style={{ position: 'relative', width, height }} {...rest}>
            <Image src={src} alt={alt} layout="fill" />
        </div>
    );
}

export default CustomImage;
