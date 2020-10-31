import React, { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import CrystallizeLayout from '@crystallize/react-layout'

import { Spinner } from 'components/crystallize/ui'
import GlobalStyle from 'components/crystallize/ui/global'

import Aside from './aside'
import Header from './header'
import Footer from './footer'
import { Main, LoadingWrapper, SpinnerWrapper, LoadingTextWrapper } from './PageLayout.styles'

type PageLayoutProps = {
  children: ReactNode
  title: string
  description?: string
  imageUrl?: string
  simple?: boolean
  loading?: boolean
  preview?: boolean
}

export default function PageLayout({
  children,
  title,
  description,
  imageUrl,
  simple,
  loading,
  preview,
}: PageLayoutProps) {
  const name = 'Dindim'
  const titleFinal = title ? `${title} | ${name}` : `${name} | We make goods for a better future`
  const descriptionFinal = description || 'Tu tienda online de comercio justo para comprar ropa sostenible.'
  const imageFinal = imageUrl || '/static/logo-square.png'
  const url = 'https://dindim.es/'

  return (
    <>
      <Head>
        <title key="title">{titleFinal}</title>
        <meta key="description" name="description" content={descriptionFinal} />
        {/* <link rel="canonical" href="https://twothirds.com/" /> */}

        <link rel="shortcut icon" href="/stripe-logo.png" type="image/png" />

        <meta property="og:site_name" content={name} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={titleFinal} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={descriptionFinal} />

        <meta property="og:image" content={imageFinal} />
        <meta property="og:image:secure_url" content={imageFinal} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={titleFinal} />
        <meta name="twitter:description" content={descriptionFinal} />
      </Head>
      <GlobalStyle />

      {simple ? (
        <>
          <Header simple={simple} preview={preview} />
          <Main>{loading ? <Loader /> : children}</Main>
          <Footer />
        </>
      ) : (
        <CrystallizeLayout right={Aside}>
          <Header simple={simple} preview={preview} />
          <Main>{loading ? <Loader /> : children}</Main>
          <Footer />
        </CrystallizeLayout>
      )}
    </>
  )
}

type LoaderProps = {
  children?: ReactElement
}

function Loader({ children }: LoaderProps) {
  return (
    <LoadingWrapper>
      <div>
        <SpinnerWrapper>
          <Spinner size="40" />
        </SpinnerWrapper>
        <LoadingTextWrapper>{children || 'Please wait...'}</LoadingTextWrapper>
      </div>
    </LoadingWrapper>
  )
}
