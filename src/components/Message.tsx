import { Box, Text, useColorMode } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";

export default function Message({ message, photoURL, id }) {
  const { colorMode } = useColorMode()
  const [user] = useAuthState(auth)
  const { uid } = user
  const bgColor = { light: "gray.300", dark: "gray.600"}
  const textColor = { light: "black", dark: "white"}
  return (
    <Box
      bg={uid == id ? "blue.500" : bgColor[colorMode]}
      w="fit-content"
      py={1}
      px={3}
      rounded="xl"
      margin={2}
      ml={uid == id ? "auto" : "0"}
      maxW="80%"
      position="relative"
      textAlign={uid == id ? "right" : "left"}
      wordBreak="break-word"
      color={uid == id ? "white" : textColor[colorMode]}
      >
      <Text>{message}</Text>
    </Box>
  )
}