import { doc, getDoc } from "firebase/firestore";
// import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";

export default function Testing(id) {
  // const [bell] = useState("bell")
  const docRef = doc(db, "chats", id.toString());
  const [values, loading] = useDocumentData(
    doc(db, "chats", id.toString())
  )
  if (!loading) return values 
}