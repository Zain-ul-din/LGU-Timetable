import { User } from "firebase/auth";
import { FieldValue } from "firebase/firestore";

export interface PastPaperDocType {
  uid: string;
  photo_url: string;
  subject_name: string;
  
  upload_at: FieldValue;
  deleted?: boolean;
  
  // true if, marked as a spam by moderator 
  spam?: boolean;
  
  // list of people uid's those post vote 
  up_votes?: Array<string>;
  down_votes?: Array<string>;
  // votes can be in +ve and -ve
  votes_count: number;
  
  // embedded user inside in the document to prevent joins
  uploader: Pick<User, "uid" | "displayName" | "photoURL">
  uploader_uid: string;

}

