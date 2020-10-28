import React from 'react'

import PageLayout from 'themes/dindim/foundations/PageLayout/PageLayout'
import { H1, Button } from 'themes/crystallize/ui'
import { useT } from 'lib/i18n'

import { LoginStyle, Outer, Fields } from './LoginTemplate.styles'

export default function LoginTemplate({ auth, handleSubmit, userData, setUserData }) {
  const t = useT()

  return (
    <PageLayout title={t('Login')}>
      <Outer>
        {auth.isLoggedIn ? (
          <div>
            <H1>{t('You are logged in')}</H1>
          </div>
        ) : (
          <LoginStyle>
            <H1>{t('Login')}</H1>

            <form onSubmit={handleSubmit} action="/api/loging" method="post">
              <h4>{t('Enter your email address and we’ll send a magic login link to your inbox.')}</h4>
              <Fields>
                <input
                  type="email"
                  name="email"
                  placeholder={t('Email')}
                  required
                  onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                />
                <Button state={userData.loading ? 'loading' : null} type="submit" value="Submit">
                  {t('Send me a magic link')}
                </Button>
              </Fields>
            </form>
            {userData.message ? <p>{userData.message}</p> : ''}
            {userData.error ? <p>{t('Please enter a valid email address')}</p> : ''}
          </LoginStyle>
        )}
      </Outer>
    </PageLayout>
  )
}
