import Head from 'next/head';
import cx from 'classnames';

import Button from 'components/utils/button/Button';
import CreativeImage from '../components/creative/creative-image/CreativeImage';
import MainLayout from '../components/layouts/main-layout/MainLayout';

import styles from 'styles/Home.module.scss';

export default function Home() {
    return (
        <>
            <Head>
                <title>Neo Snowboarding</title>
            </Head>
            <main>
                <section className={styles['hero']} role="banner">
                    <div className={styles['hero_wrapper']}></div>
                    <div className={styles['hero_content']}>
                        <h1 className={styles['hero_title']}>
                            Neo Snowboarding
                        </h1>
                        <p className={styles['hero_subtitle']}>
                            The best snowboarding in the world
                        </p>
                        <Button
                            variant="primary"
                            value="Shop Snowboards"
                            icon="/utils/chevron-right.svg"
                        />
                    </div>
                </section>

                <section
                    className={cx(
                        styles['section'],
                        styles['creative_section']
                    )}
                >
                    <CreativeImage
                        title="Feel Safe Helmet"
                        image="/snowboard_helmet.webp"
                        alt="snowboard helmet"
                        buttonText="Shop Helmets Now"
                        buttonLink="#"
                    />
                    <CreativeImage
                        title="Burton Snowboards"
                        image="/man_on_snowboard.jpeg"
                        alt="man on snowboard"
                        buttonText="Shop Snowboards"
                        buttonLink="#"
                    />
                    <CreativeImage
                        title="Quality Boots"
                        image="/snowboard_boots.jpeg"
                        alt="snowboard boots"
                        buttonText="Shop Boots Now"
                        buttonLink="#"
                    />
                    <CreativeImage
                        title="Game Changing Goggles"
                        image="/snowboard_goggles.jpeg"
                        alt="snowboard goggles"
                        buttonText="Shop Goggles Now"
                        buttonLink="#"
                    />
                </section>
            </main>
        </>
    );
}

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;
