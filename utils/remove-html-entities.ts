export const removeHtmlEntities = (input: string) => {
  // Regex to match HTML entities
  const regex = /(<([^>]+)>)/gi;

  return input.replace(regex, " ");
};
