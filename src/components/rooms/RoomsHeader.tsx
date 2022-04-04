import { Avatar, AvatarGroup, Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../firebaseConfig";

export default function Header({ chatData, user }) {
  const { colorMode } = useColorMode()
  const otherUsers = chatData.users?.filter(singleUser => user.email !== singleUser)
  const userAvatars = otherUsers?.map(singleUser => <Avatar key={Math.random()} name={singleUser} />)
  const timeAgo = chatData ? formatDistanceToNowStrict(new Date(chatData?.lastSent.toDate())) : "Not available"
  return (
    <Flex
      align="center"
      width="100%"
      p="10px"
      borderBottom="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      direction="row"
    >

      <AvatarGroup mr={4} size='md' max={4}>
        {userAvatars}
      </AvatarGroup>
      <Box>
        <Heading>{chatData.roomName}</Heading>
        <Text>Last Active: {timeAgo}</Text>
      </Box>
    </Flex>
  )
}
