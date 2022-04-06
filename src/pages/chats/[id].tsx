import { Flex, useMediaQuery } from "@chakra-ui/react";
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

export default function Chatroom() {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const [user] = useAuthState(auth)
  const router = useRouter()
  const { id } = router.query
  const lastMessage = useRef(null)
  // for header I want other users name and details
  const [values] = useDocumentData(
    doc(db, "chats", id.toString())
  )

  return (
    <Container>
      {!isMobile && <Sidebar />}
      <Flex
        direction="column"
        grow="1"
        height="100vh"
        maxWidth="100%"
      >
        {values && <SingleChatHeader chatData={values} user={user} />}
        <ChatMessages scrollRef={lastMessage} chatType="chats" id={id} />
        <Chatbox scrollRef={lastMessage} id={id} chatType="chats" />
      </Flex>
    </Container>
  )
}
