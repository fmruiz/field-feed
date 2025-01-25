import React from "react";
import { IFeedPost } from "@/types/feed";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Circle, SquarePen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface IPost extends IFeedPost {
  onDelete: (id: string | number) => void;
}

const Post = ({ user, date, text, id, onDelete }: IPost) => {
  return (
    <div className="p-5 w-[667px] rounded-md bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <span className="font-medium text-base text-ff-heading leading-[18px]">
              {user.name}
            </span>
            <Circle width={5} className="text-ff-gray-1" />
            <span className="font-medium text-ff-secondary text-[10px] leading-4">
              {date}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button className="bg-white shadow-none rounded-full w-[30px] h-[30px] hover:bg-slate-200">
            <SquarePen className="text-ff-caption" width={13} />
          </Button>
          <Button
            onClick={() => onDelete(id)}
            className="bg-white shadow-none rounded-full w-[30px] h-[30px] hover:bg-slate-200"
          >
            <Trash2 className="text-ff-caption" width={13} />
          </Button>
        </div>
      </div>
      <p className="text-[14] leading-5 text-ff-secondary">{text}</p>
    </div>
  );
};

export default Post;
