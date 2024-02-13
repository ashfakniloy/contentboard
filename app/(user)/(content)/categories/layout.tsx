import UserHeader from "../_layout/header";

export default function LayoutCategories({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader heading="Categories" />

      {children}
    </>
  );
}
