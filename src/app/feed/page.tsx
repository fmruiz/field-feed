"use client";

import Post from "@/components/post";
import { useContext, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_FEED_DATA } from "@/mocks/feed";
import { GlobalContext } from "@/providers/globalProvider";
import { IFeedPost } from "@/types/feed";

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
      date: String(Date.now()),
      text: "",
    };

    if (postText !== "") {
      postPayload.text = postText;

      setPostArr([postPayload, ...MOCK_FEED_DATA]);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex justify-center h-full flex-col gap-8 row-start-2 items-center sm:items-start bg-slate-400">
        <div className="flex flex-col gap-[15px]">
          {postArr.map((feed) => (
            <Post
              key={feed.id}
              id={feed.id}
              date={feed.date}
              text={feed.text}
              user={feed.user}
            />
          ))}

          <div>
            <Textarea onChange={(e) => setPostText(e.target.value)} />
            <Button onClick={createPostFeed}>Submit</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
