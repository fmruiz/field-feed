import { useContext, useState } from "react";
import { formatNameToSlug } from "@/lib/post";
import { MOCK_FEED_DATA } from "@/mocks/feed";
import { GlobalContext } from "@/providers/globalProvider";
import { IFeedPost } from "@/types/feed";
import { v4 as uuidv4 } from "uuid";

const ITEMS_PER_PAGE = 10;

const useFeed = () => {
  const [postText, setPostText] = useState<string>("");
  const [emptyPost, setEmptyPost] = useState<boolean>(false);
  const [postArr, setPostArr] = useState<IFeedPost[]>([...MOCK_FEED_DATA]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = postArr.slice(startIndex, endIndex);
  const totalPages = Math.ceil(postArr.length / ITEMS_PER_PAGE);

  const { username } = useContext(GlobalContext);

  const createPostFeed = () => {
    const randomUUID = uuidv4();

    const postPayload: IFeedPost = {
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
      setPostArr((prevPost) => [postPayload, ...prevPost]);
      MOCK_FEED_DATA.unshift(postPayload);
    } else {
      setEmptyPost(true);
    }

    setPostText("");
  };

  const editPostFeed = (id: string | number, newPostText: string) => {
    setPostArr((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, text: newPostText } : post
      )
    );
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

  return {
    postArr,
    postText,
    setPostText,
    emptyPost,
    currentPosts,
    createPostFeed,
    deletePostFeed,
    handleNextPage,
    handlePreviousPage,
    goToPage,
    currentPage,
    totalPages,
    editPostFeed,
  };
};

export default useFeed;
