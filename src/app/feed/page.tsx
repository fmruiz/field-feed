"use client";

import Post from "@/components/post";
import Header from "@/components/header";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_FEED_DATA } from "@/mocks/feed";
import { GlobalContext } from "@/providers/globalProvider";
import { IFeedPost } from "@/types/feed";
import { SquarePen } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function FeedPage() {
  const [postText, setPostText] = useState<string>("");
  const [emptyPost, setEmptyPost] = useState<boolean>(false);
  const [postArr, setPostArr] = useState<IFeedPost[]>([...MOCK_FEED_DATA]);

  const randomUUID = uuidv4();

  const { username } = useContext(GlobalContext);

  const createPostFeed = () => {
    const postPayload = {
      id: randomUUID,
      user: {
        name: username,
        image: "mock-avatar",
      },
      date: "Today",
      text: "",
    };

    if (postText !== "") {
      postPayload.text = postText;
      setPostArr([postPayload, ...postArr]);
    } else {
      setEmptyPost(true);
    }

    setPostText("");
  };

  const deletePostFeed = (id: string | number) => {
    const filteredPostArr = postArr.filter((post) => post.id !== id);
    setPostArr(filteredPostArr);
  };

  return (
    <div className="flex flex-col items-center justify-center px-[17px] pb-[17px]">
      <Header />

      <div className="flex py-[34px] justify-center items-center h-full w-full flex-col gap-[15px] bg-ff-layout rounded-md">
        {username !== "" && (
          <>
            <p className="text-xl">
              Hello, <span className="font-bold">{username}! </span>🚀
            </p>

            <div className="flex flex-col items-center justify-center  gap-2 mb-8">
              <label className="sr-only" htmlFor="post-message">
                Your Post
              </label>
              <div className="flex flex-col">
                <Textarea
                  value={postText}
                  rows={5}
                  id="post-message"
                  placeholder="Type your message here..."
                  className="bg-white resize-none w-[270px] sm:w-[450px] md:w-[480px] lg:w-[555px] xl:w-[667px]"
                  onChange={(e) => setPostText(e.target.value)}
                />
                {emptyPost && (
                  <span className="italic text-sm font-semibold text-red-600">
                    Post content is required to share.
                  </span>
                )}
              </div>

              <Button
                className="w-[270px] sm:w-[450px] md:w-[480px] lg:w-[555px] xl:w-[667px]"
                onClick={createPostFeed}
              >
                <SquarePen />
              </Button>
            </div>
          </>
        )}

        {postArr.length > 0 &&
          postArr.map((feed) => (
            <Post
              key={feed.id}
              id={feed.id}
              date={feed.date}
              text={feed.text}
              user={feed.user}
              onDelete={deletePostFeed}
            />
          ))}
      </div>
    </div>
  );
}
