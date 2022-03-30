import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Input,
  Flex
} from '@chakra-ui/react'
import { signOut } from "firebase/auth"
import { addDoc, collection, query, serverTimestamp, where } from "firebase/firestore"
import { SyntheticEvent, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import { auth, db } from "../../firebaseConfig"
import ChatModal from './ChatModal'
import ChatRooms from './ChatRooms'
import { DarkModeSwitch } from "./DarkModeSwitch"

const Sidebar = (props) => {
  const handleClick = () => {
    signOut(auth)
  }
  const [user] = useAuthState(auth)
  const [chatValues] = useCollection(
    query(collection(db, "chats"), where('users', 'array-contains', user.email))
  )
  //Map over all the chat rooms to create sidebar Links for chatrooms
  const chats = chatValues?.docs.map(chat =>
    <ChatRooms key={chat.id} id={chat.id} users={chat.data().users} />
  )
  return (
    <Flex
      height="100vh"
      width="20vw"
      border
      direction="column"
      {...props}
    >
      <Flex>
        <Button onClick={handleClick} colorScheme='blue'>Logout</Button>
        <DarkModeSwitch />
        <ChatModal room />
      </Flex>
      <Flex direction="column">
        {chats}
      </Flex>
    </Flex>
  )
}
export default Sidebar