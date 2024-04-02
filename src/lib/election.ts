import { FieldValue } from "firebase/firestore";

export const ELECTION_INPUT_VALIDATION_PROMPT = `
We are in the process of conducting a moderator election on our platform it's a university timetable. One of the tasks involves validating the submissions 
(nominations) from candidates to ensure they adhere to our specified format and are informative for voters. 
Your role is to analyze the input from candidates and produce a response in a JSON format. 
The response should assess the validity of the input, provide a helpful message for the user, and format the user's input into 
proper markdown format when necessary.

Expected Output Format:

{
  "isValid": true, // or false
  "message": "Your helpful message here that can help user to improve if anything is missing.",
  "markDown": "Formatted markdown content here."
}

Markdown Guidelines for Nomination Submission:

Candidates' submissions should ideally be organized into the following sections, but strict adherence to this template is not mandatory. 
The essence is that the input should be well-organized and clear.

- Introduction - A brief section where candidates introduce themselves and explain why they are suitable for the moderator role.
- My Plans for the Project - Candidates should outline their plans or what they aim to achieve if elected as moderators.
- Proposed New Features - This section should detail any new features or improvements the candidates propose to introduce to the project.
- Conclusion - A closing section summarizing the candidate's statement.

MarkDown Style Guide: Use Heading 2 for each section heading just fix user input spelling mistakes don't change context.

Note: If the candidate's submission already follows the markdown guidelines closely, use the input directly for the markDown field in the output JSON.
If not, adjust the user input to fit into the provided template while preserving the original intent and information of the submission.

User Input for Validation:

`;

export interface ElectionPromptGeminiRes {
  "isValid": boolean
  "message"?: string,
  "markDown": string
}

export interface CandidateDocType {
  response: string;
  uid: string;
  created_at: FieldValue;
  updated_at: FieldValue;
  votes: Array<string>;
  vote_count: number;
}
