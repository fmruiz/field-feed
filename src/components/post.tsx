import React from "react";
import { IFeedPost } from "@/types/feed";
import { Avatar } from "./ui/avatar";

const Post = ({ user, date, text }: IFeedPost) => {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <Avatar />
        <div className="flex items-center gap-2">
          <span>{user.name}</span>
          <span>{date}</span>
        </div>
      </div>
      <p className="text-[14] leading-5">{text}</p>
    </div>
  );
};

export default Post;
