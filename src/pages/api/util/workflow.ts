import { FieldValue, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import Joi from "joi"
import { NextApiRequest, NextApiResponse } from "next"
import { userColsRef, workFlowColRef } from "~/lib/firebase";
import { UserDocType } from "~/lib/firebase_doctypes";
import { fromFirebaseTimeStamp } from "~/lib/util";

interface Payload {
  user_id: string;
  session_id: string;
}

const schema =  Joi.object<Payload>({
  user_id: Joi.string(),
  session_id: Joi.string().length(26)
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {

    if(req.method !== 'POST') {
      res.status(405).send('not allowed')
      return;
    }

    const body: Payload  = JSON.parse(req.body)

    if(!schema.validate(body)) {
      res.status(402).send({  message: 'Invalid Payload'  })
      return;
    }

    const usersSnapShot = await getDocs(query(userColsRef, where('uid', '==', body.user_id)));
    if(usersSnapShot.docs.length === 0) throw new Error('Invalid User')
    const user = usersSnapShot.docs.map((doc)=> doc.data())[0] as UserDocType

    const isAdmin = user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL; 
    const quotaDoc = await initWorkFlowDoc()
    
    if(!isAdmin) {
      const { valid, message } = await canTriggerWorkFlow(quotaDoc,user);
      if(!valid) {
        res.status(405).send({ message })
        return;
      }
    }
    
    await triggerWorkFlow(user.uid, body.session_id)

    res.status(200).send({
      message: '🎉 Thank you for your contribution. WorkFlow has been Triggered.',
      succeed: true
    })
  } catch(err) {
    console.log(err);
    res.status(500).send({
      message: 'Something went Wrong'
    })
  }
}

interface WorkFlowQuotaType {
  users: {
    idx: string;
    uid: string;
  }[]
  last_updated: Date | FieldValue | string,
  participants: string [] 
}

async function initWorkFlowDoc() {
  const quotaDocRef = doc(workFlowColRef, new Date().toDateString()); 
  let quotaSnapShot = await getDoc(quotaDocRef);

  if(!quotaSnapShot.exists()) {
    const initialData: WorkFlowQuotaType = {
      last_updated: serverTimestamp(),
      users: [],
      participants: []
    }
    await setDoc(quotaDocRef, initialData, { merge: true });
    return initialData;
  }

  return quotaSnapShot.data() as WorkFlowQuotaType
}

async function triggerWorkFlow(uid: string, session_id: string,) {
  const quotaDocRef = doc(workFlowColRef, new Date().toDateString()); 
  const auxDoc = doc(workFlowColRef);

  const GITHUB_URL = 'https://api.github.com/repos/Zain-ul-din/lgu-crawler/actions/workflows/89946576/dispatches'
  const hook = process.env.RE_DEPLOYMENT_HOOK || 'https://www.google.com'
  
  await fetch(GITHUB_URL, {
    method: 'POST',
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${process.env.GITHUB_USER_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      ref: "master",
      inputs: { session_id, hook }
    })
  })
  
  await updateDoc(quotaDocRef, {
    last_updated: serverTimestamp(),
    users: arrayUnion({
      uid,
      idx: auxDoc.id
    }),
    participants: arrayUnion(uid)
  })
}

/**
 * Determines how many work flow can trigger per day
*/
const MAX_WORK_FLOW_PER_DAY = 5;

/**
 * Cool Down between each trigger
*/
const ONE_HOUR_IN_MS = 1000 * 60 * 60;
const COOL_DOWN_TIME = ONE_HOUR_IN_MS * 1;
const PRO_COOL_DOWN_TIME = ONE_HOUR_IN_MS * 0.25;

/**
 * Determine how many req a user can send per day
 */
const MAX_REQ_PER_USER = 2;
const MAX_REQ_PER_PRO_USER = 4;


async function canTriggerWorkFlow(quota: WorkFlowQuotaType,user: UserDocType) {
  const { last_updated, users } = quota

  if(users.length === MAX_WORK_FLOW_PER_DAY) {
    return { 
      message: 'Daily WorkFlow Trigger Quota Exceed',
      valid: false,
    }
  }

  const { coolDownTime, maxReqLimit } = {
    coolDownTime: user.pro ? PRO_COOL_DOWN_TIME : COOL_DOWN_TIME,
    maxReqLimit: user.pro ? MAX_REQ_PER_PRO_USER : MAX_REQ_PER_USER
  }

  const timeSpanSinceLastUpdate = new Date().getTime() - fromFirebaseTimeStamp(last_updated).getTime() 
  const alreadyReqMade = users.filter(u => u.uid === user.uid).length;
  
  if(alreadyReqMade >= maxReqLimit) {
    return {
      valid: false,
      message: `Your Personal Quota of ${maxReqLimit} request has been exceed`
    }
  }

  if(timeSpanSinceLastUpdate < coolDownTime) {
    const remainingCoolDownTime = (((coolDownTime - timeSpanSinceLastUpdate) / ONE_HOUR_IN_MS) * 60) | 0;
    return { 
      message: `Someone already triggered a workflow. Please try again after ${remainingCoolDownTime} min(s).`,
      valid: false,
    };
  }

  return {
    message: '',
    valid: true
  }
}
