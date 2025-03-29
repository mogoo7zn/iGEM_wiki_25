import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Meta tags for performance */}
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          <meta
            name="description"
            content="iGEM Team 2025 - Synthetic Biology Innovation and Research"
          />

          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
            as="style"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
            media="print"
            onLoad="this.media='all'"
          />

          {/* Preload Pacifico font separately (less critical) */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
            as="style"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
            media="print"
            onLoad="this.media='all'"
          />

          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* DNS prefetch */}
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

          {/* Inline critical CSS */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            body {
              margin: 0;
              padding: 0;
              font-family: 'Lato', sans-serif;
            }
            
            * {
              box-sizing: border-box;
            }
          `,
            }}
          />

          {/* FontAwesome preloading */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Add font fallback */}
          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Pacifico&display=swap"
            />
            <link rel="stylesheet" href="/assets/css/font-awesome.min.css" />
          </noscript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
