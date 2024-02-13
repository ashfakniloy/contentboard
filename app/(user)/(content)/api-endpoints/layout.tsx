import UserHeader from "../_layout/header";

export default function LayoutApiEndpoints({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader heading="API Endpoints" />

      {children}
    </>
  );
}
