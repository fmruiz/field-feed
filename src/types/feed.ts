export interface IFeed {
  feedData: IFeedPost[];
}

export interface IFeedPost {
  id: string | number;
  user: IPostUser;
  date: string;
  text: string;
}

export interface IPostUser {
  name: string;
  image: string;
}
