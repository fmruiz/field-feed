"use client";

import Post from "@/components/post";
import Header from "@/components/header";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_FEED_DATA } from "@/mocks/feed";
import { GlobalContext } from "@/providers/globalProvider";
import { IFeedPost } from "@/types/feed";
import { ArrowLeft, ArrowRight, SquarePen } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { formatNameToSlug } from "@/lib/post";

export default function FeedPage() {
  const [postText, setPostText] = useState<string>("");
  const [emptyPost, setEmptyPost] = useState<boolean>(false);
  const [postArr, setPostArr] = useState<IFeedPost[]>([...MOCK_FEED_DATA]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(postArr.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = postArr.slice(startIndex, endIndex);

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
      owner: formatNameToSlug(username),
    };

    if (postText !== "") {
      postPayload.text = postText;
      setPostArr([postPayload, ...postArr]);
    } else {
      setEmptyPost(true);
    }

    setPostText("");
  };

  const deletePostFeed = (name: string, id: string | number) => {
    if (name === username) {
      const filteredPostArr = postArr.filter((post) => post.id !== id);
      setPostArr(filteredPostArr);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
          currentPosts.map((feed) => (
            <Post
              key={feed.id}
              id={feed.id}
              date={feed.date}
              text={feed.text}
              user={feed.user}
              onDelete={deletePostFeed}
              owner={feed.owner}
            />
          ))}

        <div className="mt-5 flex items-center gap-1">
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ArrowLeft />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                onClick={() => goToPage(index + 1)}
                style={{
                  fontWeight: currentPage === index + 1 ? "bold" : "normal",
                }}
                className={`rounded-full h-9 w-9 ${
                  currentPage === index + 1 && "bg-ff-blue-avatar"
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
