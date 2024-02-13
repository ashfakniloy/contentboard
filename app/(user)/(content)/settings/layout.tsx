import UserHeader from "../_layout/header";

export default function LayoutSettings({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader heading="Settings" />

      {children}
    </>
  );
}
