import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="icon" href="/static/favicon.svg" />
          <link rel="mask-icon" href="/static/mask-icon.svg" color="#5bbad5" />
          <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
          <link rel="manifest" href="/static/manifest.json" />

          {/* {this.props.styleTags} */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
