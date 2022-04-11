import { Center, ChakraProvider, Spinner } from '@chakra-ui/react'
import theme from '../theme'
import { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'
import { useEffect } from 'react'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Login } from '../components/Login'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth)
  useEffect(() => {
    if (user) {
      setDoc(doc(db, "users", user.uid),
        {
          email: user.email,
          lastActive: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      )
    }
  }, [user])

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
  }
  if (!user) {
    return (
      <ChakraProvider resetCSS theme={theme}>
        <Login />
      </ChakraProvider>
    )
  }
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
