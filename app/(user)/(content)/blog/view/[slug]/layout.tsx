import UserHeader from "../../../_layout/header";

export default function LayoutBlogView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader heading="Blog View" />

      {children}
    </>
  );
}
