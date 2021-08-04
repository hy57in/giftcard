import { AppProps } from 'next/app'
import '../styles/globals.css'
import NavigationBar from 'src/components/NavigationBar/NavigationBar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NavigationBar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
