import Header from '../elements/header'
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
        <Component {...pageProps} />
    </>
  )
}

export default MyApp
