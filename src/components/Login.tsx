import { Button, Divider, Flex, FormControl, Heading, Icon, Input, Stack, Text, useColorMode, useMediaQuery } from '@chakra-ui/react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { auth, provider } from '../../firebaseConfig'
import { DarkModeSwitch } from './DarkModeSwitch'
import { Image } from '@chakra-ui/react'
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react'

export const Login = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [signup, setSignup] = useState(false)
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.100', dark: 'gray.800' }
  const bgLogin = { light: 'white', dark: 'gray.700' }

  const signIn = () => {
    isMobile
      ? signInWithRedirect(auth, provider).catch(alert)
      : signInWithPopup(auth, provider).catch(alert)
  }

  const guestSign = () => {
    signInWithEmailAndPassword(auth, "guest@gmail.com", "123456")
      .catch(error => {
        console.log(error.message)
      })
  }

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const signInEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else {
      setPass(e.target.value)
    }
  }
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg={bgColor[colorMode]}
    >
      <Flex shadow={colorMode === 'light' ? "lg" : "dark-lg"} minHeight="400px" h={isMobile ? "100vh" : "70vh"} w="auto" direction={isMobile ? "column" : "row"} bg="grey">
        <Image src='/login.jpg' alt='Plant In Vase' />
        <Flex
          direction="column"
          paddingY="20px"
          paddingX="40px"
          bg={bgLogin[colorMode]}
          justify="center"
          align="center"
          w="100%"
          h="100%"
        >
          <Heading
            position="relative"
            bottom={isMobile ? "7%" : "14%"}
            size='lg'
            textAlign="center"
          >
            F.R.I.E.N.D.S Chat
          </Heading>
          <Input name="email" onChange={handleChange} size={isMobile ? "md" : "lg"} placeholder="Username Or Email" variant="flushed" height="2rem" mb="10px" />
          <Input name="pass" onChange={handleChange} size={isMobile ? "md" : "lg"} placeholder="Password" variant="flushed" height="2rem" mb="10px" />

          <>
            <Flex w="100%" mt="10px" mb="10px" justify={signup ? "center" : "space-between"}>
              {
                signup ?
                  <Button onClick={createUser} borderRadius='20px' w="70%" size="md" >Sign up</Button>
                  :
                  <>
                    <Button mx="10px" onClick={signInEmail} borderRadius='20px' w="50%" size="sm" >Login</Button>
                    <Button onClick={guestSign} borderRadius='20px' w="50%" size="sm" >Guest Login</Button>
                  </>
              }
            </Flex>
            <Stack mt="15px" mb="15px" direction='row' w="75%" align="center">
              <Divider color="white" />
              <Text>Or</Text>
              <Divider />
            </Stack>
            <Flex
              p="5px"
              borderRadius="10px"
              alignItems="center"
              onClick={signIn}
              borderBottom="20px"
              _hover={{ transform: "translate(0, -5px)", shadow: "5px 5px 3px -1px rgb(0 0 0 / 20%), -3px -3px 3px -1px rgb(0 0 0 / 20%)" }}
              cursor="pointer"
              boxSizing="border-box"
            >
              <Icon mr="5px" w="25px" h="25px" as={FcGoogle} />
              <Text fontSize="sm">Sign In With Google</Text>
            </Flex>
            <Flex mt="15px">
              <Text fontSize="sm">{signup ? "Have An Account?" : "New Friend?"} </Text>
              <Text
                onClick={() => setSignup(!signup)}
                cursor="pointer"
                _hover={{ transform: "translate(0, -2px)", color: "orange" }}
                decoration="underline"
                fontSize="sm"
                ml="5px"
              >
                {signup ? "Login" : "Create Account"}
              </Text>
            </Flex>
          </>
        </Flex>
      </Flex>
      <DarkModeSwitch />
    </Flex>
  )
}
