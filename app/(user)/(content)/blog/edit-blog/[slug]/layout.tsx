import UserHeader from "../../../_layout/header";

export default function LayoutEditBlog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader heading="Edit Blog" />

      {children}
    </>
  );
}
