import { Flex, FormControl, Heading, Icon, Input, Text, useColorMode, useMediaQuery } from '@chakra-ui/react'
import { signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { auth, provider } from '../../firebaseConfig'
import { DarkModeSwitch } from './DarkModeSwitch'
import { Image } from '@chakra-ui/react'
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.100', dark: 'gray.900' }
  const bgLogin = { light: 'white', dark: 'gray.700' }
  const signIn = () => {
    isMobile
      ? signInWithRedirect(auth, provider).catch(alert)
      : signInWithPopup(auth, provider).catch(alert)
  }
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg={bgColor[colorMode]}
    >
      <Flex h="80vh" w="80vw" direction={isMobile ? "column" : "row"} bg="grey">
        <Image src='/login.jpg' alt='Dan Abramov' />
        <Flex
          direction="column"
          padding="20px"
          bg={bgLogin[colorMode]}
          justify="center"
          align="center"
          w="100%"
          h="100%"
        >
          <Heading
            position="relative"
            bottom={isMobile ? "12%" : "24%"}
            size='lg'
            textAlign="center"
          >F.R.I.E.N.D.S Chat</Heading>
          <Input size={isMobile ? "md" : "lg"} placeholder="Username Or Email" variant="flushed" height="2rem" mb="10px" />
          <Input size={isMobile ? "md" : "lg"} placeholder="Password" variant="flushed" height="2rem" mb="10px" />
          <Flex
            mt="10px"
            alignItems="center"
            onClick={signIn}
            _hover={{ transform: "translateY(-5px)", borderBottom: "1px" }}
            cursor="pointer"
          >
            <Icon mr="5px" w="25px" h="25px" size="md" as={FcGoogle} />
            <Text fontSize="sm">Sign In With Google</Text>
          </Flex>
        </Flex>
      </Flex>
      <DarkModeSwitch />
    </Flex>
  )
}
