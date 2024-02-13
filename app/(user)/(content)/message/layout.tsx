import React from "react";
import UserHeader from "../_layout/header";

export default function LayoutMessages({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader heading="Messages" />

      {children}
    </>
  );
}
