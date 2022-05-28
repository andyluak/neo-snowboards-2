import React from 'react';

import CustomImage from 'components/utils/CustomImage';

import s from './style.module.scss';

function Footer() {
  return (
    <footer className={s['footer']}>
      <div className={s['footer_top_bar']}>
        <div className={s['footer_top_bar_icon_group']}>
          <CustomImage
            src="/utils/telephone.svg"
            alt="telephone"
            layout="fill"
            width="15px"
            height="15px"
          />
          <span>1 454 387 5677</span>
        </div>
        <div className={s['footer_top_bar_icon_group']}>
          <CustomImage
            src="/utils/email.svg"
            alt="telephone"
            layout="fill"
            width="18px"
            height="18px"
          />
          <span>Email us</span>
        </div>
      </div>
      <div className={s['footer_bottom_bar']}>
        <div className={s['footer_bottom_bar_lists']}>
          <ul className={s['footer_bottom_bar_list']}>
            <li className={s['footer_bottom_bar_list_header']}>Help</li>
            <li className={s['footer_bottom_bar_list_item']}>
              Customer Service
            </li>
            <li className={s['footer_bottom_bar_list_item']}>Track Order</li>
            <li className={s['footer_bottom_bar_list_item']}>
              {'Returns & Exchanges'}
            </li>
            <li className={s['footer_bottom_bar_list_item']}>Shipping</li>
            <li className={s['footer_bottom_bar_list_item']}>Contact Us</li>
          </ul>

          <ul className={s['footer_bottom_bar_list']}>
            <li className={s['footer_bottom_bar_list_header']}>Quick Links</li>
            <li className={s['footer_bottom_bar_list_item']}>
              {'Offers & Promotions'}
            </li>
          </ul>

          <ul className={s['footer_bottom_bar_list']}>
            <li className={s['footer_bottom_bar_list_header']}>
              About Neo Snowboards
            </li>
            <li className={s['footer_bottom_bar_list_item']}>Our Story</li>
            <li className={s['footer_bottom_bar_list_item']}>Careers</li>
            <li className={s['footer_bottom_bar_list_item']}>Terms Of Use</li>
            <li className={s['footer_bottom_bar_list_item']}>Privacy Policy</li>
          </ul>
        </div>
        <div className={s['footer_bottom_bar_social']}>
            <CustomImage src="/utils/facebook.svg" alt="facebook" layout="fill" width="20px" height="20px" />
            <CustomImage src="/utils/instagram.svg" alt="instagram" layout="fill" width="20px" height="20px" />
            <CustomImage src="/utils/twitter.svg" alt="twitter" layout="fill" width="20px" height="20px" />
            <CustomImage src="/utils/pinterest.svg" alt="pinterest" layout="fill" width="20px" height="20px" />
            <CustomImage src="/utils/linkedin.svg" alt="pinterest" layout="fill" width="20px" height="20px" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
