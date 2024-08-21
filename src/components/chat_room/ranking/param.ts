/*
    influence weight params
*/
export const InfluenceWeightParams = {
  member: 0.01,
  collaborator: 0.05,
  premium: 0.1,
  moderator: 0.2
};

/* 
    Discussion Weights
*/
export const DiscussionWeightParams = {
  on_created: 0.1,
  on_commented: 0.1,
  on_react: 0.05,
  onShared: 0.08,
  up_vote_threshold: 0.1,
  down_vote_threshold: -0.1
};

/* 
    user interaction limit
*/
export const UserInteractionLimit = {
  edit_comment: 10,
  edit_discussionContent: 10,
  edit_discussionTitle: 5
};

/*
    user input limit | defined in characters
*/
export const UserInputLimit = {
  comment_min: 10,
  comment_max: 2000,
  discussion_min: 40,
  discussion_max: 10000,
  discussion_title_min: 2,
  discussion_title_max: 200
};
