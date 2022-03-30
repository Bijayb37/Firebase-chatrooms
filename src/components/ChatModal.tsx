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
} from '@chakra-ui/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { SyntheticEvent, useState } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebaseConfig'
export default function ChatModal({ room = false}: { room: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [user] = useAuthState(auth)
  const [chatName, setChatName] = useState("")
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setChatName(e.currentTarget.value)
  }

  //if chat exits then dont create a new one
  //prompt for email address and also for room name
  const createChat = async () => {
    const { email } = user
    await addDoc(collection(db, "chats"), {
      users: [email, chatName],
      lastSent: serverTimestamp(),
      
    })
  }
  const header = room ? "Create New Room" : "Add Person To Chat"
  const placeHolder = room ? "Room Name" : "Email"
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder={placeHolder} value={chatName} onChange={handleChange} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={createChat} variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}