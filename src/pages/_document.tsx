import { ColorModeScript } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';
import { FavIcons } from '~/components/seo/Seo';

import { themeConfig } from '~/styles/Style';

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <FavIcons />

            {/* google verification */}
            <meta
               name="google-site-verification"
               content="Xrm9_dgaRQZ06N__yc74HURKEfMXPjcD8qYWCDwbs-M"
            />

            
            {/* ads */}
            <script
               async
               src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9921497734267177"
               crossOrigin="anonymous"
            ></script>

            <link
               href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300&family=Roboto:wght@300&display=swap"
               rel="stylesheet"
            />
         </Head>
         <body>
            <ColorModeScript
               initialColorMode={themeConfig.initialColorMode}
               storageKey="jj92k02j"
               type="localStorage"
            />
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}
