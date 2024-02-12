export const getFormattedDate = (date: Date) => {
  const inputDate = new Date(date);

  const formattedDate = inputDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};
