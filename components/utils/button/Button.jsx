import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CustomImage from 'components/utils/CustomImage';

import s from './style.module.scss';
import Link from 'next/link';

function Button({ variant, value, onClick, icon, hasLink, link, ...rest }) {
    // if there is a className on the rest object, add it to the className
    const className = cx(s.button, rest.className, s[variant]);
    delete rest.className;

    const button = (
        <button className={className} onClick={onClick} {...rest}>
            {hasLink ? (
                <Link href={link}>
                    <span className={s['button_value']}>
                        {value}
                        {icon && (
                            <CustomImage
                                src={icon}
                                alt=""
                                layout="fill"
                                width="16px"
                                height="16px"
                            />
                        )}
                    </span>
                </Link>
            ) : (
                <span className={s['button_value']}>
                    {value}
                    {icon && (
                        <CustomImage
                            src={icon}
                            alt=""
                            layout="fill"
                            width="16px"
                            height="16px"
                        />
                    )}
                </span>
            )}
        </button>
    );

    // if (hasLink) {
    //   return <Link href={link}> {button} </Link>
    // }

    return button;
}

Button.propTypes = {
    variant: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    hasLink: PropTypes.bool,
    link: PropTypes.string,
};

Button.defaultProps = {
    variant: 'primary',
    value: 'Button',
    onClick: () => {},
    icon: null,
    hasLink: false,
    link: null,
};

export default Button;
