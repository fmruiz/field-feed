import React, { useContext, useState } from "react";
import { IFeedPost } from "@/types/feed";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Circle, SquarePen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { GlobalContext } from "@/providers/globalProvider";
import { formatNameToSlug, initials } from "@/lib/post";
import { Textarea } from "./ui/textarea";
import useFeed from "@/hooks/useFeed";

interface IPost extends IFeedPost {
  onDelete: (name: string, id: string | number) => void;
}

const Post = ({ user, date, text, id, onDelete, owner }: IPost) => {
  const { username } = useContext(GlobalContext);

  const [newEditPost, setNewEditPost] = useState<string>(text);
  const [editPost, setEditPost] = useState<boolean>(false);

  const { editPostFeed } = useFeed();

  const handleEditPost = () => {
    editPostFeed(id, newEditPost);
    setEditPost(false);
  };

  return (
    <li className="p-5 w-[270px] sm:w-[450px] md:w-[500px] lg:w-[600px] xl:w-[667px] rounded-md bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Avatar className="bg-ff-blue-avatar">
            <AvatarImage
              src={
                user.image === "mock-avatar"
                  ? "https://github.com/shadcn.png"
                  : user.image
              }
              alt={user.name}
            />
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
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

        {formatNameToSlug(username) === owner && (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setEditPost(true)}
              className="bg-white shadow-none rounded-full w-[30px] h-[30px] hover:bg-slate-200"
            >
              <SquarePen className="text-ff-caption" width={13} />
            </Button>
            <Button
              onClick={() => onDelete(user.name, id)}
              className="bg-white shadow-none rounded-full w-[30px] h-[30px] hover:bg-slate-200"
            >
              <Trash2 className="text-ff-caption" width={13} />
            </Button>
          </div>
        )}
      </div>

      {editPost ? (
        <div className="flex flex-col">
          <Textarea
            value={newEditPost}
            onChange={(e) => setNewEditPost(e.target.value)}
          />
          <div className="flex items-center gap-2 mt-3">
            <Button onClick={handleEditPost}>Edit</Button>
          </div>
        </div>
      ) : (
        <p className="text-[14] leading-5 text-ff-secondary">{newEditPost}</p>
      )}
    </li>
  );
};

export default Post;
