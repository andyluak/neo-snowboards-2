import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import getStore from '/redux/store';

function NeoSnowboarding({ Component, pageProps }) {
    const store = getStore(pageProps.initialState);
    let persistor = persistStore(store);
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {getLayout(<Component {...pageProps} />)}
            </PersistGate>
        </Provider>
    );
}

export default NeoSnowboarding;
