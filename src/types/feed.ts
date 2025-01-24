export interface IFeed {
  feedData: IFeedPost[];
}

export interface IFeedPost {
  user: IPostUser;
  date: string;
  text: string;
}

export interface IPostUser {
  name: string;
  image: string;
}
