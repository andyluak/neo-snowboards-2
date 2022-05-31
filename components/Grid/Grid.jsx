import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function Grid({
    width,
    mobileRCDimensions,
    desktopRCDimensions,
    isCentered,
    columnGap,
    rowGap,
    children,
}) {
    const formattedChildren = React.Children.map(children, (child) => (
        <div className="grid_item">{child}</div>
    ));

    return (
        <div>
            <style jsx>
                {`
                    .grid {
                        display: grid;
                        width: ${width};
                        grid-template-columns: repeat(
                            auto-fill,
                            minmax(${mobileRCDimensions['width']}, auto)
                        );
                        grid-auto-rows: minmax(
                            ${mobileRCDimensions['height']},
                            auto
                        );
                        grid-gap: ${columnGap} ${rowGap};

                        @media (min-width: 1024px) {
                            grid-template-columns: repeat(
                                auto-fill,
                                minmax(${desktopRCDimensions['width']}, auto)
                            );
                            grid-auto-rows: minmax(
                                ${desktopRCDimensions['height']},
                                auto
                            );
                        }

                        ${isCentered ? 'justify-content: center;' : ''}
                    }
                `}
            </style>
            <div className={cx('grid')}>{formattedChildren}</div>
        </div>
    );
}

Grid.propTypes = {
    width: PropTypes.string,
    mobileRCDimensions: PropTypes.object,
    desktopRCDimensions: PropTypes.object,
    isCentered: PropTypes.bool,
    columnGap: PropTypes.string,
    rowGap: PropTypes.string,
};

Grid.defaultProps = {
    width: '100%',
    mobileRCDimensions: {
        width: '250px',
        height: '400px',
    },
    desktopRCDimensions: {
        width: '350px',
        height: '500px',
    },
    isCentered: false,
    columnGap: '0px',
    rowGap: '0px',
};

export default Grid;
