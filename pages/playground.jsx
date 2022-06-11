import React from 'react';

import ImageWithText from '/components/Image/ImageWithText/ImageWithText';
import Grid from '/components/Grid/Grid';

import MainLayout from '/components/layouts/main-layout/MainLayout';

import getStore, {
    getPokemon,
    selectFilteredPokemon,
    selectSearch,
    rehydrate,
    setSearch,
} from '/redux/store';
import { useSelector } from 'react-redux';

function Playground() {
    const pokemon = useSelector(selectFilteredPokemon);
    console.log(pokemon);
    return (
        <>
            <section>
                <h1>Testing new grid</h1>
                <Grid rowGap="1rem" columnGap="1rem" isCentered={false}>
                    <ImageWithText
                        src="/images/boots/kids/1653401328699.jpg"
                        alt="1"
                        layout="fill"
                        textPosition="center"
                        textAlignment="center"
                        textGap="1rem"
                        imageOpacity="0.6"
                    >
                        <p>Salut</p>
                        <p>Salut</p>
                    </ImageWithText>
                    <ImageWithText
                        src="/images/boots/kids/1653401328699.jpg"
                        alt="1"
                        layout="fill"
                        textPosition="center"
                        textAlignment="center"
                        textGap="1rem"
                        imageOpacity="0.6"
                    >
                        <p>Salut</p>
                        <p>Salut</p>
                    </ImageWithText>
                    <ImageWithText
                        src="/images/boots/kids/1653401328699.jpg"
                        alt="1"
                        layout="fill"
                        textPosition="center"
                        textAlignment="center"
                        textGap="1rem"
                        imageOpacity="0.6"
                    >
                        <p>Salut</p>
                        <p>Salut</p>
                    </ImageWithText>

                    <ImageWithText
                        src="/images/boots/kids/1653401328699.jpg"
                        alt="1"
                        layout="fill"
                        textPosition="center"
                        textAlignment="center"
                        textGap="1rem"
                        imageOpacity="0.6"
                    >
                        <p>Salut</p>
                        <p>Salut</p>
                    </ImageWithText>
                </Grid>
            </section>
        </>
    );
}

Playground.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context) {
    const store = getStore();
    await store.dispatch(getPokemon());

    return {
        props: {
            initialState: store.getState(),
        },
    };
}

export default Playground;
