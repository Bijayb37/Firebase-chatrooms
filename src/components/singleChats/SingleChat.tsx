import { Avatar, Flex, Text, useColorMode } from "@chakra-ui/react";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../../firebaseConfig";

export default function ChatRooms({ users, id }) {
  const [user] = useAuthState(auth)
  const { colorMode } = useColorMode()
  const router = useRouter()
  const filtered = users?.filter(singleUser => singleUser !== user.email)[0]
  const [foundUser] = useCollectionData(
    query(collection(db, "users"), where('email', '==', filtered))
  )
  const handleClick = () => {
    router.push(`/chats/${id}`)
  }

  return (
    <Flex
      align="center"
      p={4}
      cursor="pointer"
      _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.700' }}
      onClick={handleClick}
    >
      {
        foundUser?.length > 0 ? (
          <Avatar mr={4} name={foundUser?.[0].displayName} src={foundUser?.[0].photoURL} />
        ) : (
          <Avatar
            mr={4}
            name={filtered}
            bg={colorMode === 'light' ? 'teal.600' : 'teal.500'}
          />
        )
      }
      <Text>{filtered}</Text>
    </Flex>
  )
}