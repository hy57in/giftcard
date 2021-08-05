/* eslint-disable react/no-danger */
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export const canonicalUrl = 'https://giftcard1.vercel.app'

// 최대 10개
const keywords = '디저트킵,DessertKeep,디킵,디저트,상품권,픽업,예약'

export default class DessertFitDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href={canonicalUrl} />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <meta name="author" content="sindy" />
          <meta name="keywords" content={keywords} />
          <meta name="application-name" content="디저트킵" />
          <meta name="theme-color" content="#26326d" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="디저트킵" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="디저트 상품권을 사고 팔 수 있는 곳" />
          <meta property="og:title" content="디저트킵" />
          <meta property="og:description" content="디저트 상품권을 사고 팔 수 있는 곳" />
          <meta property="og:image" content="/favicon.ico" />
          <meta property="og:url" content={`${canonicalUrl}`} />
          <meta property="og:site_name" content="디저트킵 (Dessert Keep)" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image:alt" content="Dessert Keep Logo" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
