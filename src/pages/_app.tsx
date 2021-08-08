import { AppProps } from 'next/app'
import '../styles/globals.css'
import NavigationBar from 'src/components/NavigationBar/NavigationBar'
import ReactGA from 'react-ga'

ReactGA.initialize('282134203')
ReactGA.pageview(window.location.pathname + window.location.search)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NavigationBar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
