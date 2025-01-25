"use client";

import Post from "@/components/post";
import Header from "@/components/header";
import { useContext, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_FEED_DATA } from "@/mocks/feed";
import { GlobalContext } from "@/providers/globalProvider";
import { IFeedPost } from "@/types/feed";
import { SquarePen } from "lucide-react";

export default function FeedPage() {
  const [postText, setPostText] = useState<string>("");
  const [postArr, setPostArr] = useState<IFeedPost[]>([...MOCK_FEED_DATA]);

  const randomId = useId();

  const { username } = useContext(GlobalContext);

  const createPostFeed = () => {
    const postPayload = {
      id: randomId,
      user: {
        name: username,
        image: "avatar",
      },
      date: "today",
      text: "",
    };

    if (postText !== "") {
      postPayload.text = postText;

      setPostArr([postPayload, ...MOCK_FEED_DATA]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-[17px] pb-[17px]">
      <Header />
      <div className="flex py-[34px] justify-center items-center h-full w-full flex-col gap-[15px] bg-ff-layout rounded-md">
        <p className="text-xl">
          Hello, <span className="font-bold">{username}! </span>🚀
        </p>

        <div className="flex items-start gap-2 mb-8">
          <label className="sr-only" htmlFor="post-message">
            Your Post
          </label>
          <Textarea
            cols={70}
            rows={5}
            id="post-message"
            placeholder="Type your message here..."
            className="bg-white"
            onChange={(e) => setPostText(e.target.value)}
          />
          <Button onClick={createPostFeed}>
            <SquarePen />
          </Button>
        </div>

        {postArr.map((feed) => (
          <Post
            key={feed.id}
            id={feed.id}
            date={feed.date}
            text={feed.text}
            user={feed.user}
          />
        ))}
      </div>
    </div>
  );
}
