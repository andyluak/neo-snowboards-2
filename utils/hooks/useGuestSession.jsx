import React from 'react';

const useGuestSession = (isGuest) => {
    const [isGuestSession, setIsGuestSession] = React.useState(true);

    const setCookie = (name, value, days) => {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    };

    const checkIfCookieExists = (name) => {
        const nameExists = new RegExp(name + '=([^;]+)');
        const cookie = document.cookie.match(nameExists);
        return cookie ? cookie[1] : false;
    };

    React.useEffect(() => {
        const cookie = checkIfCookieExists('isGuestSession');
        if (!cookie & isGuest) {
            setCookie('isGuestSession', true, 1);
        }
    }, [isGuest]);
};

export default useGuestSession;
