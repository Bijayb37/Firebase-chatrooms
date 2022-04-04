import { Box, Flex, VStack } from "@chakra-ui/react";
import { collection, limit, orderBy, query, doc } from "firebase/firestore";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";
import Message from "./Message";

export default function ChatMessages({ scrollRef, id }) {
  const [values, loading, error] = useCollectionData(
    collection(db, "chats", id, "messages")
  )

  const messages = values?.map(msg => (
    <Message key={Math.random()} id={msg.uid} message={msg.Message} photoURL={msg.photoURL} />
  ))

  return (
    <Flex
      grow="1"
      align="start"
      direction="column"
      overflowY="scroll"
      p="10px"
    >
      {messages}
      <div ref={scrollRef}></div>
    </Flex>
  )

}