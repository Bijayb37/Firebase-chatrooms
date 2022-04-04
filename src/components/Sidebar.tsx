import {
  Flex,
  Stack,
  StackDivider,
  Avatar,
  IconButton,
  Icon,
  useColorMode
} from '@chakra-ui/react'
import { IoLogOut, IoSunny, IoMoon } from 'react-icons/io5'
import { signOut } from "firebase/auth"
import { addDoc, collection, query, serverTimestamp, where } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from "../../firebaseConfig"
import ChatModal from './ChatModal'
import SingleChat from './singleChats/SingleChat'
import ChatRooms from './rooms/ChatRooms'

const Sidebar = (props) => {
  const handleClick = () => {
    signOut(auth)
  }
  const { colorMode, toggleColorMode } = useColorMode()
  const [user] = useAuthState(auth)
  const [chatValues] = useCollection(
    query(collection(db, "chats"), where('users', 'array-contains', user.email))
  )
  const [roomValues] = useCollection(
    query(collection(db, "rooms"), where('users', 'array-contains', user.email))
  )
  //Map over all the chat rooms to create sidebar Links for chatrooms
  const chats = chatValues?.docs.map(chat =>
    <SingleChat key={chat.id} id={chat.id} users={chat.data().users} />
  )
  const rooms = roomValues?.docs.map(room =>
    <ChatRooms key={room.id} id={room.id} data={room.data()} />
  )
  return (
    <Flex
      height="100vh"
      max-width="30vw"
      direction="column"
      borderRight="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      {...props}
    >
      <Flex flexWrap="wrap" direction="column">
        <Flex
          justify="space-between"
          height="71px"
          align="center"
          p="10px"

        >
          <Avatar src={user.photoURL} />
          <Stack maxWidth="30vw" direction="row" align="center">
            <IconButton
              // colorScheme='blue'
              aria-label='Search database'
              icon={<Icon as={IoLogOut} />}
              onClick={handleClick}
              isRound
            />
            <IconButton
              // colorScheme='blue'
              aria-label='Search database'
              icon={colorMode === "light" ? <Icon as={IoMoon} /> : <Icon as={IoSunny} />}
              onClick={toggleColorMode}
              isRound
            />
          </Stack>
        </Flex>

      </Flex>
      <Stack maxWidth="30vw" direction="row" align="center" p="10px">
        <ChatModal room title="Create New Room" />
        <ChatModal title="add Chat" />
      </Stack>
      <Stack
        direction="column"
      >
        {rooms}
        {chats}
      </Stack>
    </Flex >
  )
}
export default Sidebar