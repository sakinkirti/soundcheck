export const truncateText = (text, length) => {
  if (!length  || text?.length <= length || !text) {
    return text;
  }
  return text.substring(0, length) + "...";
};
