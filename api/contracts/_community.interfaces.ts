export interface ICommunity {
  name: string;
  tier: string;
  post_content: string;
  likes: number;
  comment: string;
  no_of_tagged: number;
}

export type NewCreatedCommPost = Omit<ICommunity, 'likes' | 'comment' | 'no_of_tagged'>