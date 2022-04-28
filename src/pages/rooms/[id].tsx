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
import RoomsHeader from "../../components/rooms/RoomsHeader";


export default function Chatroom() {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const [user] = useAuthState(auth)
  const router = useRouter()
  const { id } = router.query
  console.log(router.query)
  const lastMessage = useRef(null)
  // for header I want other users name and details
  const [values] = useDocumentData(
    doc(db, "rooms", id.toString())
  )

  return (
    <Container>
      {!isMobile && <Sidebar />}
      <Flex
        direction="column"
        grow="1"
        height="100vh"
      >
        <Flex height="71px">
          {values && <RoomsHeader chatData={values} user={user} />}
        </Flex>
        <ChatMessages scrollRef={lastMessage} chatType="rooms" id={id.toString()} />
        <Chatbox scrollRef={lastMessage} id={id.toString()} chatType="rooms" />

      </Flex>
    </Container>
  )
}
