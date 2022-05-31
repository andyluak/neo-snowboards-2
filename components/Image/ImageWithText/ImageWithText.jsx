import React from 'react';
import Image from 'next/image';
import cx from 'classnames';

import s from './style.module.scss';

function ImageWithText({
    src,
    alt,
    children,
    imageOpacity,
    textPosition,
    textAlignment,
    textGap,
}) {
    const mapPositionToFlex = {
        top: 'flex-start',
        bottom: 'flex-end',
        center: 'center',
        left: 'flex-start',
        right: 'flex-end',
    };
    return (
        <>
            <style jsx>
                {`
                    .image_text {
                        justify-content: ${mapPositionToFlex[textAlignment]};
                        align-items: ${mapPositionToFlex[textPosition]};
                        gap: ${textGap};
                    }
                    .image_wrapper_wrapper {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        filter: opacity(${imageOpacity});
                        transition: filter 0.3s ease-in-out;
                    }

                    .image_wrapper:hover .image_wrapper_wrapper {
                        filter: opacity(${imageOpacity * 0.4});
                    }
                `}
            </style>
            <div className={cx(s['image_wrapper'], 'image_wrapper')}>
                <div className="image_wrapper_wrapper">
                    <Image
                        src={src}
                        alt={alt}
                        layout="fill"
                        className={cx(s['image'], 'image_with_text_image')}
                    />
                </div>

                <div className={cx(s['image_text'], 'image_text')}>
                    {children}
                </div>
            </div>
        </>
    );
}

export default ImageWithText;
