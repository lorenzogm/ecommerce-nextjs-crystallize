import React, { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import CrystallizeLayout from '@crystallize/react-layout'
import { useRouter } from 'next/router'

import { Spinner } from 'components/crystallize/ui'
import GlobalStyle from 'components/crystallize/ui/global'
import { SITE_URL, SITE_NAME } from 'config/constants'

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
  const router = useRouter()

  const titleFinal = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Ropa de comercio justo y ecológica`
  const descriptionFinal = description || 'Ropa de comercio justo hecha en España con algogón 100% Orgánico'
  const imageFinal = imageUrl || '/static/logo-square.png'
  const url = `${SITE_URL}/${router.asPath}`

  return (
    <>
      <Head>
        <title key="title">{titleFinal}</title>
        <meta key="description" name="description" content={descriptionFinal} />
        <link rel="canonical" href={url} />

        <link rel="shortcut icon" href="/stripe-logo.png" type="image/png" />

        <meta property="og:site_name" content={SITE_NAME} />
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
