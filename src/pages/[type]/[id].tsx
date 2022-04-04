import { Flex } from "@chakra-ui/react";
import { auth, db } from "../../../firebaseConfig";
import { doc } from "firebase/firestore";
import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatMessages from "../../components/ChatMessages";
import Chatbox from "../../components/Chatbox";
import Sidebar from "../../components/Sidebar";
import { Container } from "../../components/Container";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import SingleChatHeader from "../../components/singleChats/SingleChatHeader";
import RoomsHeader from "../../components/rooms/RoomsHeader";


export default function Chatroom() {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const { id, type } = router.query
  const lastMessage = useRef(null)
  // for header I want other users name and details
  const [values] = useDocumentData(
    doc(db, `${type}`, id.toString())
  )
  console.log(type)
  const Comp = () => {
    if (type === "chats") {
      return <SingleChatHeader chatData={values} user={user} />
    } else {
      return <RoomsHeader chatData={values} user={user} />
    }
  }
  return (
    <Container>
      <Sidebar />
      <Flex
        direction="column"
        grow="1"
        height="100vh"
      >
        <Flex height="71px">
          {values && Comp()}
        </Flex>
        <ChatMessages scrollRef={lastMessage} id={id} />
        <Chatbox scrollRef={lastMessage} id={id} />
      </Flex>
    </Container>
  )
}
