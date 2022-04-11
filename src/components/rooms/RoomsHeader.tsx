import { ArrowBackIcon } from "@chakra-ui/icons";
import { Avatar, AvatarGroup, Box, Flex, Heading, IconButton, Text, useColorMode, useMediaQuery } from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import ChatModal from "../ChatModal";

export default function RoomsHeader({ chatData, user }) {
  const [isMobile] = useMediaQuery('(max-width: 680px)')
  const router = useRouter()
  const { colorMode } = useColorMode()
  const otherUsers = chatData.users?.filter(singleUser => user.email !== singleUser)
  const userAvatars = otherUsers?.map(singleUser => <Avatar key={Math.random()} name={singleUser} />)
  const timeAgo = chatData.lastSent ? formatDistanceToNowStrict(new Date(chatData?.lastSent.toDate())) : "Not available"

  return (
    <Flex
      align="center"
      justify="space-between"
      width="100%"
      p="10px"
      borderBottom="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      direction="row"
    >
      <Flex align="center">
        <IconButton
          // colorScheme='blue'
          aria-label='Go Back'
          icon={<ArrowBackIcon />}
          mr="10px"
          size="md"
          onClick={() => router.push("/")}
          isRound
        />
        <AvatarGroup size="md" max={isMobile ? 1 : 4}>
          {userAvatars}
        </AvatarGroup>
      </Flex>
      <Box maxWidth="70%">
        <Heading size={isMobile ? "md" : "lg"} isTruncated>{chatData.roomName}</Heading>
        {!isMobile && <Text>Last Active: {timeAgo}</Text>}
      </Box>
      <ChatModal type="addPeople" title="Add People" />
    </Flex>
  )
}
