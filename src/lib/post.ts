export const initials = (username: string): string => {
  return username
    ? username
        .split(" ")
        .map((word: string) => word[0]?.toUpperCase())
        .join("")
        .slice(0, 2)
    : "??";
};

export const formatNameToSlug = (username: string): string => {
  return username.toLowerCase().split(" ").join("-");
};
