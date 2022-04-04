import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react'
import { validate } from "email-validator"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { SyntheticEvent, useState } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'
export default function ChatModal({ room = false, title }: { room?: boolean, title: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [chatName, setChatName] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [user] = useAuthState(auth)
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setChatName(e.currentTarget.value)
  }

  //if chat exits then dont create a new one
  //prompt for email address and also for room name
  const createChat = async () => {
    const { email } = user
    if (validate(chatName)) {
      await addDoc(collection(db, "chats"), {
        users: [email, chatName],
        lastSent: serverTimestamp(),
      })
    } else {
      setIsValid(false)
    }
  }
  const createRoom = async () => {
    const { email } = user
    if (chatName !== "") {
      await addDoc(collection(db, "rooms"), {
        roomName: chatName,
        users: [email],
        lastSent: serverTimestamp(),
      })
    } else {
      setIsValid(false)
    }
  }
  const header = room ? "Create New Room" : "Add Person To Chat"
  const placeHolder = room ? "Room Name" : "Email"

  return (
    <>
      <Button onClick={onOpen}>{title}</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!isValid}>
              <Input placeholder={placeHolder} value={chatName} onChange={handleChange} />
              <FormErrorMessage>{room ? "Cannot be empty" : "Email is required"}.</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={room ? createRoom : createChat} variant='ghost'>{room ? "Create Room" : "Create Chat"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}