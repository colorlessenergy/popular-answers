import { useEffect } from 'react';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'light')
        }

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark')
        }
    }, []);
    
    return <Component {...pageProps} />
}

export default MyApp
