import { Avatar, Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";

export default function Header({ hi: users, user }) {
  const { colorMode } = useColorMode()
  const filtered = users?.filter(singleUser => singleUser !== user.email)[0]
  const [foundUser] = useCollectionData(
    query(collection(db, "users"), where('email', '==', filtered))
  )
  const headingName = foundUser?.length ? foundUser?.[0]?.email : filtered
  const timeAgo = foundUser?.length ? formatDistanceToNowStrict(new Date(foundUser?.[0].lastActive.toDate())) : "Not available"
  return (
    <Flex align="center">
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
      <Box>
        <Heading>{headingName}</Heading>
        <Text>Last Active: {timeAgo}</Text>
      </Box>
    </Flex>
  )
}
