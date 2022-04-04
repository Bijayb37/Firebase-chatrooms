import { Avatar, Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebaseConfig";

export default function ChatRooms({ users, id, room }) {
  const [user] = useAuthState(auth)
  const { colorMode } = useColorMode()
  const router = useRouter()
  const handleClick = () => {
    router.push(`/${id}`)
  }
  function SingleChatRoom() {
    const filtered = users?.filter(singleUser => singleUser !== user.email)[0]
    const [foundUser] = useCollectionData(
      query(collection(db, "users"), where('email', '==', filtered))
    )
    return (
      <>
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
      </>
    )
  }

  return (
    <Flex
      align="center"
      p={4}
      cursor="pointer"
      _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.700' }}
      onClick={handleClick}
    >
      {!room && <SingleChatRoom />}
    </Flex>
  )
}