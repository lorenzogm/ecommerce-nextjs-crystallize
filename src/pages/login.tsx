import { sendMagicLink } from 'lib/rest-api'
import { useAuth } from 'contexts/auth-context'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const LoginTemplate = dynamic(
  () => import(`themes/${process.env.NEXT_PUBLIC_THEME || 'crystallize'}/templates/LoginTemplate/LoginTemplate`),
)

export default function LoginPage() {
  const auth = useAuth()
  const [userData, setUserData] = useState({
    loading: false,
    email: '',
    message: '',
    error: '',
  })

  async function handleSubmit(event) {
    event.preventDefault()

    setUserData({ ...userData, loading: true, error: '' })
    const { email } = userData

    try {
      const { error, message } = await sendMagicLink(email)

      if (error) {
        console.error('Login failed')
        throw error
      }

      setUserData({ ...userData, loading: false, message })
    } catch (error) {
      console.error('You have an error in your code or there are Network issues.', error)

      const { response } = error
      setUserData({
        ...userData,
        loading: false,
        error: response ? response.statusText : error.message,
      })
    }
  }

  return <LoginTemplate auth={auth} handleSubmit={handleSubmit} userData={userData} setUserData={setUserData} />
}
