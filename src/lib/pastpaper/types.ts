import { User } from 'firebase/auth';
import { FieldValue } from 'firebase/firestore';

export interface PastPaperDocType {
  uid: string;
  photo_url: string;
  subject_name: string;

  exam_type: string;

  // if false user don't want to show it's profile pic
  visibility: boolean;

  upload_at: FieldValue;

  // is deleted by user
  // not set this field to true if going to mark this field as spam
  deleted: boolean;

  // true if, marked as a spam by moderator
  spam: boolean;

  // list of people uid's those post vote
  up_votes?: Array<string>;
  down_votes?: Array<string>;

  // votes can be in +ve and -ve
  votes_count: number;

  // embedded user inside in the document to prevent joins
  uploader: Pick<User, 'uid' | 'displayName' | 'photoURL'>;
  uploader_uid: string;

  // how much confidence AI has that image is correct
  confidence: number;

  // if locked user will not able to make changes to post anymore
  // will be locked by moderator |
  // automatically lock if up votes are up to 5 and percentage of down votes are less then 50%
  isLocked: boolean;
}
