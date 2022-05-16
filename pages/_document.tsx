import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <script defer src="/ripple.js"></script>
        {/* <script defer async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqLfqHgU-hMDHhorIB_t7xPleMpT9scqo" ></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
    </Html>
  )
}