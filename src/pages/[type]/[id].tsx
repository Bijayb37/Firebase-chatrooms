import { Avatar, Flex, Text } from "@chakra-ui/react";
import { auth, db } from "../../../firebaseConfig";
import { collection, doc, getDoc, query, setDoc, where } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatMessages from "../../components/ChatMessages";
import Chatbox from "../../components/Chatbox";
import Sidebar from "../../components/Sidebar";
import { Container } from "../../components/Container";
import { useRouter } from "next/router";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import Header from "../../components/singleChats/SingleChatHeader";
import RoomsHeader from "../../components/rooms/roomsHeader";
import SingleChatHeader from "../../components/singleChats/SingleChatHeader";


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
