import { UserInfo } from "firebase/auth"
import { DocumentData } from "firebase/firestore"

export type chatProps = {
  id: string ,
  chatType: string,
  scrollRef?: any,
}

export type chatModalProps = {
  type: "room" | "chat" | "addPeople",
  title: string
}

export type messageProps = {
  message: string,
  photoURL?: string,
  id: string
}

export type chatHeadertypes = {
  chatData: DocumentData,
  user: UserInfo
}

export type chatRoomProps = {
  data: DocumentData,
  id: string
}

export type singleChatProps = {
  users: string[],
  id: string
}