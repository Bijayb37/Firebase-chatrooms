import { Flex, Heading } from '@chakra-ui/react'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebaseConfig';


export const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert); ``
  };
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
    >
      <Heading onClick={signIn}>Click Me</Heading>
    </Flex>
  )
}
