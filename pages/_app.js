import '../styles/globals.scss';
import { Provider } from 'react-redux';
import getStore from '/redux/store';

function MyApp({ Component, pageProps }) {
    const store = getStore(pageProps.initialState);
    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
