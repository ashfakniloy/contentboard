import UserHeader from "../../_layout/header";

export default function LayoutAllBlogs({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader heading="All Blogs" />

      {children}
    </>
  );
}
