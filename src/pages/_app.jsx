import React, { useEffect } from 'react';
import '../styles/variables-global.scss';
import '../styles/critical.scss';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '../context/ThemeContext';
import { PageProvider } from '../context/PageContext';
import { InteractionProvider } from '../context/InteractionContext';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { isPerformanceSupported, mark, measure, reportPerformance } from '../utils/performance';

// Dynamic import for non-critical styles
const NonCriticalStyles = dynamic(() => import('../components/common/NonCriticalStyles'), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  // Check if component has custom layout
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  useEffect(() => {
    // Measure initial app load performance
    if (isPerformanceSupported()) {
      const endMark = mark('app-load-end');
      // Measure from navigation start to our mark
      const loadTime = performance.now();
      console.log('App initial load time:', loadTime.toFixed(2), 'ms');

      // Report performance after the page becomes idle
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          reportPerformance();
        });
      } else {
        setTimeout(() => {
          reportPerformance();
        }, 1000);
      }
    }

    // Import global.scss asynchronously after initial render
    import('../styles/global.scss');

    // Register service worker for better performance if in production
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch((err) => {
          console.error('Service worker registration failed:', err);
        });
      });
    }
  }, []);

  return (
    <PageProvider>
      <ThemeProvider>
        <InteractionProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/favicon.ico" />
            <title>iGEM Team 2025 - Synthetic Biology Innovation</title>
          </Head>
          {getLayout(<Component {...pageProps} />)}
          <NonCriticalStyles />
        </InteractionProvider>
      </ThemeProvider>
    </PageProvider>
  );
}

export default MyApp;
