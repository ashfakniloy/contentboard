import UserHeader from "../_layout/header";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader heading="Dashboard" />

      {children}
    </>
  );
}
