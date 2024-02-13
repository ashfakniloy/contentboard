import React from "react";
import UsernameChange from "./username-change";
import { getAuthSession } from "@/lib/next-auth";
import { getUserInfo } from "@/db/user/queries/get-user-info";
import { notFound } from "next/navigation";
import LogoChange from "./logo-change";
import EmailChange from "./email-change";
import PasswordChange from "./password-change";
import AccountDelete from "./account-delete";

export default async function Settings() {
  const session = await getAuthSession();

  if (!session) return;

  const userId = session.user.id;

  const { user } = await getUserInfo({ userId });

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-7">
      <div className="p-7 space-y-4 rounded-lg bg-custom-gray5 dark:bg-custom-gray6">
        <LogoChange logoUrl={user.logoUrl} />
        <div className="w-full border border-border" />
        <UsernameChange username={user.username} />
      </div>

      <div className="p-7 space-y-4 rounded-lg bg-custom-gray5 dark:bg-custom-gray6">
        <EmailChange email={user.email} />
        <div className="w-full border border-border" />
        <PasswordChange />
        <div className="w-full border border-border" />
        <AccountDelete />
      </div>
    </div>
  );
}