import type { Metadata } from "next";
import { getAuthSession } from "@/lib/next-auth";
import { getUserInfo } from "@/db/user/queries/get-user-info";
import { notFound } from "next/navigation";
import LogoChange from "./logo-change";
import UsernameChange from "./username-change";
import EmailChange from "./email-change";
import PasswordChange from "./password-change";
import AccountDelete from "./account-delete";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const session = await getAuthSession();

  if (!session) return;
  const userId = session.user.id;

  const { user } = await getUserInfo({ userId });

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-7">
      <div className="p-3 lg:p-7 space-y-4 rounded-lg bg-custom-gray3 dark:bg-custom-gray4">
        <LogoChange logoUrl={user.logoUrl} />
        <div className="w-full border border-border" />
        <UsernameChange username={user.username} />
      </div>

      <div className="p-3 lg:p-7 space-y-4 rounded-lg bg-custom-gray3 dark:bg-custom-gray4">
        <EmailChange email={user.email} />
        <div className="w-full border border-border" />
        <PasswordChange />
        <div className="w-full border border-border" />
        <AccountDelete />
      </div>
    </div>
  );
}
