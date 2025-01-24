import Post from "@/components/post";
import { MOCK_FEED_DATA } from "@/mocks/feed";

export default function FeedPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex justify-center h-full flex-col gap-8 row-start-2 items-center sm:items-start bg-slate-400">
        <div className="flex flex-col gap-[15px]">
          {MOCK_FEED_DATA.map((feed) => (
            <Post
              key={feed.id}
              id={feed.id}
              date={feed.date}
              text={feed.text}
              user={feed.user}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
