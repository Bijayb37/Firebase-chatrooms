import {
  Flex,
  Stack,
  Avatar,
  IconButton,
  Icon,
  useColorMode
} from '@chakra-ui/react'
import { IoLogOut, IoSunny, IoMoon } from 'react-icons/io5'
import { signOut } from "firebase/auth"
import { collection, query, where } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from "../../firebaseConfig"
import ChatModal from './ChatModal'
import SingleChat from './singleChats/SingleChat'
import ChatRooms from './rooms/ChatRooms'

const Sidebar = ({ fullWidth }: { fullWidth?: boolean }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [user] = useAuthState(auth)
  //get Collection Data for both chats & rooms
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
  //Button to log users out and push to index page
  const handleLogOut = () => {
    signOut(auth)
  }

  return (
    <Flex
      height="100vh"
      maxWidth={fullWidth ? "100vw" : "30vw"}
      width={fullWidth ? "100vw" : ""}
      direction="column"
      borderRight="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
    >
      <Flex flexWrap="wrap" direction="column" position="sticky" top="0">
        <Flex
          justify="space-between"
          height="71px"
          align="center"
          p="10px"
        >
          <Avatar src={user.photoURL} />
          <Stack maxWidth="30vw" direction="row" align="center">
            <IconButton
              aria-label='Sign Out'
              icon={<Icon as={IoLogOut} />}
              onClick={handleLogOut}
              isRound
            />
            <IconButton
              aria-label='Toggle Dark Mode'
              icon={colorMode === "light" ? <Icon as={IoMoon} /> : <Icon as={IoSunny} />}
              onClick={toggleColorMode}
              isRound
            />
          </Stack>
        </Flex>
        <Stack direction="row" align="center" p="10px">
          <ChatModal type="room" title="Create New Room" />
          <ChatModal type="chat" title="Add Chat" />
        </Stack>
      </Flex>
      <Stack
        direction="column"
        overflow="scroll"
      >
        {rooms}
        {chats}
      </Stack>
    </Flex >
  )
}
export default Sidebar