import React from "react";
import UserHeader from "../_layout/header";

export default function LayoutMedia({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader heading="All Media" />

      {children}
    </>
  );
}
