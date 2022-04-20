import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebaseConfig";

export default function Chatbox({ scrollRef, id, chatType }) {
  const [user] = useAuthState(auth)
  const messageRef = collection(db, `${chatType}`, id, "messages")
  const [chat, setChat] = useState('')
  const handleChange = e => {
    setChat(e.target.value)
  }
  /*get uid and phoroURL from current User then send message 
  and set chat state to "", then scroll to latst message
  */
  const sendMessage = async (e) => {
    const { uid, photoURL } = user
    e.preventDefault()
    if (chat !== '')
      await addDoc(messageRef, {
        Message: chat,
        createdAt: serverTimestamp(),
        uid,
        photoURL
      })
    setChat("")
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <Flex
      direction="row"
      position="sticky"
      bottom={0}
    >
      <FormControl p={2} zIndex={3} as="form" display="flex" alignItems="center">
        <Input size="lg" value={chat} onChange={handleChange} placeholder='Type Message' />
        <Button size="lg" type="submit" onClick={sendMessage}>
          Send
        </Button>
      </FormControl>
    </Flex>
  )
}