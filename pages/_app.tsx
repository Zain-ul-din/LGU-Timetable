import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';


const progress = new ProgressBar({
    size: 4,
    color: '#60a5fa',
    className: 'bar-of-progress',
    delay: 0
});

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
    progress.start();
    progress.finish();
}

Router.events.on('routeChangeStart', () => progress.start());
Router.events.on('routeChangeComplete', () => progress.finish());
Router.events.on('routeChangeError', () => progress.finish());

export default function App({ Component, pageProps }: AppProps) {
    
    return <Component {...pageProps} />;
}

