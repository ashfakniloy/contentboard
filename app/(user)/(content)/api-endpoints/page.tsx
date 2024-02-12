import { Metadata } from "next";
import UserHeader from "../_layout/header";
import EndPoints from "./endpoints";

export const metadata: Metadata = {
  title: "API endpoints",
};

export default function ApiUrlsPage() {
  return (
    <>
      <UserHeader heading="API Endpoints" />

      <EndPoints />
    </>
  );
}
