import React from 'react';
import useDeviceSize from 'utils/hooks/useDeviceSize';

import CustomImage from 'components/utils/CustomImage';
import Button from 'components/utils/button/Button';

import s from './style.module.scss';

function CreativeImage({ title, image, alt, buttonText, buttonLink }) {
  const [width] = useDeviceSize();

  const getDeviceType = () => {
    if (width > 768) {
      if (width > 1440) {
        return 'largeDesktop';
      }
      return 'desktop';
    } else {
      return 'mobile';
    }
  };
  const imageSizesBasedOnDevice = {
    mobile: {
      width: '250px',
      height: '300px',
    },
    desktop: {
      width: '300px',
      height: '400px',
    },
    largeDesktop: {
      width: '400px',
      height: '500px',
    },
  };
  return (
    <div className={s['creative_image_wrapper']}>
      <div className={s['creative_image_overlay']} />
      <CustomImage
        src={image}
        width={imageSizesBasedOnDevice[getDeviceType()].width}
        height={imageSizesBasedOnDevice[getDeviceType()].height}
        layout="fill"
        className={s['creative_image_image']}
        alt={alt}
      />
      <div className={s['creative_image_content']}>
        <p className={s['creative_image_content_text']}>{title}</p>
        <Button
          className={s['creative_image_button']}
          value={buttonText}
          icon="/utils/chevron-right.svg"
          hasLink={buttonLink ? true : false}
          link={buttonLink}
        />
      </div>
    </div>
  );
}

export default CreativeImage;
