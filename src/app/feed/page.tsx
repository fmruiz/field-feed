"use client";

import Post from "@/components/post";
import Header from "@/components/header";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GlobalContext } from "@/providers/globalProvider";
import { ArrowLeft, ArrowRight, SquarePen } from "lucide-react";
import useFeed from "@/hooks/useFeed";

export default function FeedPage() {
  const { username } = useContext(GlobalContext);
  const {
    postArr,
    postText,
    setPostText,
    createPostFeed,
    currentPosts,
    deletePostFeed,
    emptyPost,
    goToPage,
    handleNextPage,
    handlePreviousPage,
    currentPage,
    totalPages,
  } = useFeed();

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
