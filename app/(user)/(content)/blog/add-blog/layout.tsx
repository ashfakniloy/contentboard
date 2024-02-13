import UserHeader from "../../_layout/header";

export default function LayoutAddBlog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader heading="Add Blog" />

      {children}
    </>
  );
}
