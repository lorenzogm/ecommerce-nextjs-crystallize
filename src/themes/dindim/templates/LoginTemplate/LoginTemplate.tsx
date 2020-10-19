import React from 'react'

import PageLayout from 'themes/dindim/foundations/PageLayout/PageLayout'
import { H1, Button } from 'themes/crystallize/ui'
import { useT } from 'lib/i18n'

import { LoginStyle, Outer, Fields } from './LoginTemplate.styles'

export default function LoginTemplate({ auth, handleSubmit, userData, setUserData }) {
  const t = useT()

  return (
    <PageLayout title={t('customer.login.title')}>
      <Outer>
        {auth.isLoggedIn ? (
          <div>
            <H1>{t('customer.login.loggedIn')}</H1>
          </div>
        ) : (
          <LoginStyle>
            <H1>{t('customer.login.title')}</H1>

            <form onSubmit={handleSubmit} action="/api/loging" method="post">
              <h4>{t('customer.login.instructions')}</h4>
              <Fields>
                <input
                  type="email"
                  name="email"
                  placeholder={t('customer.email')}
                  required
                  onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                />
                <Button state={userData.loading ? 'loading' : null} type="submit" value="Submit">
                  {t('customer.login.sendMagicLink')}
                </Button>
              </Fields>
            </form>
            {userData.message ? <p>{userData.message}</p> : ''}
            {userData.error ? <p>{t('customer.login.emailAddressInvalid')}</p> : ''}
          </LoginStyle>
        )}
      </Outer>
    </PageLayout>
  )
}
