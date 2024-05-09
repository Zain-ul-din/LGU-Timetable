import { UserDocType } from "../firebase_doctypes";
import { pastPapersCol, uploadBlobToFirestore } from "../firebase";
import { fileToBlob } from "../util";
import { PastPaperDocType } from "./types";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

interface UploadProps {
  file: File | null
  currUser: UserDocType,
  subject_name: string;
}

export default async function upload(
  { file, subject_name, currUser }: UploadProps
) {
  if(!file) return;
  
  // todo: validate file input via gemini OR may be try some free otpion

  try {
    const photo_url = await uploadBlobToFirestore(fileToBlob(file))
    
    const docRef = doc(pastPapersCol);
    const docData: PastPaperDocType = {
      photo_url,
      uid: docRef.id,
      subject_name,
      upload_at: serverTimestamp(),
      uploader: {
        displayName: currUser.displayName,
        photoURL: currUser.photoURL,
        uid: currUser.uid
      },
      votes_count: 0,
      uploader_uid: currUser.uid
    } 

    await setDoc(docRef, docData)
    
  } catch(err) {
    return false;
  }

  return true
} 
