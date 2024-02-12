import { DeleteBlogProps } from "@/db/user/mutations/delete-blog";
import { DeleteCategoryProps } from "@/db/user/mutations/delete-category";
import { DeleteMessageProps } from "@/db/user/mutations/delete-message";

type DeleteActionProps =
  | DeleteCategoryProps
  | DeleteBlogProps
  | DeleteMessageProps;
