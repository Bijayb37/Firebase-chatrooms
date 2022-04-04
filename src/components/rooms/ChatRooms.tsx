import { Avatar, Flex, useColorMode, Text, AvatarGroup } from "@chakra-ui/react"
import { query, collection, where } from "firebase/firestore"
import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { auth, db } from "../../../firebaseConfig"

export default function ChatRooms({ data, id }) {
  const [user] = useAuthState(auth)
  const { colorMode } = useColorMode()
  const router = useRouter()
  const otherUsers = data.users?.filter(singleUser => user.email !== singleUser)
  const userAvatars = otherUsers?.map(singleUser => <Avatar key={Math.random()} name={singleUser}/>)
  const handleClick = () => {
    router.push(`/rooms/${id}`)
  }

  return (
    <Flex
      align="center"
      p={4}
      cursor="pointer"
      _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.700' }}
      onClick={handleClick}
    >
      <AvatarGroup mr={4} size='md' max={2}>
        {userAvatars}
      </AvatarGroup>
      <Text>{data.roomName}</Text>
    </Flex>
  )
}
