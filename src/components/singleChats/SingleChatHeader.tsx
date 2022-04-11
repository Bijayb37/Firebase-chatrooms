import { ArrowBackIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, Heading, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../firebaseConfig";

export default function SingleChatHeader({ chatData, user }) {
  const { colorMode } = useColorMode()
  const router = useRouter()
  const filtered = chatData?.users?.filter(singleUser => singleUser !== user.email)[0]
  const [foundUser] = useCollectionData(
    query(collection(db, "users"), where('email', '==', filtered))
  )
  console.log(foundUser)
  const headingName = foundUser?.length ? foundUser?.[0]?.email : filtered
  const timeAgo = foundUser?.length ? formatDistanceToNowStrict(new Date(foundUser?.[0].lastActive.toDate())) : "Not available"

  return (
    <Flex
      align="center"
      width="100%"
      height="71px"
      p="10px"
      overflow="hidden"
      borderBottom="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      maxWidth="100%"
    >
      <IconButton
        // colorScheme='blue'
        aria-label='Go Back'
        icon={<ArrowBackIcon />}
        mr="10px"
        size="md"
        onClick={() => router.push("/")}
        isRound
      />
      {
        foundUser?.length ? (
          <Avatar mr={4} name={foundUser?.[0].displayName} src={foundUser?.[0].photoURL} />
        ) : (
          <Avatar
            mr={4}
            name={filtered}
            bg={colorMode === 'light' ? 'teal.600' : 'teal.500'}
          />
        )
      }
      <Box maxWidth="70%" >
        <Heading size="md" isTruncated>{headingName}</Heading>
        <Text >Last Active: {timeAgo}</Text>
      </Box>
    </Flex>
  )
}
