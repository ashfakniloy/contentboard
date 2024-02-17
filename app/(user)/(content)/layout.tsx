import Link from "next/link";
import { getAuthSession } from "@/lib/next-auth";
import UserSidebar from "./_layout/sidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  const logoUrl = session?.user.logoUrl;
  const username = session?.user.username;
  const isGuestUser = session?.user.role === "GUEST_USER";

  return (
    <div className="lg:flex">
      <UserSidebar logoUrl={logoUrl} />

      <div className="lg:flex-1 relative overflow-x-auto">
        <div className="fixed lg:hidden w-full bg-white dark:bg-custom-gray4 shadow-md px-2 py-4 text-end border-b z-20">
          <p className="text-xl font-bold text-primary">{username}</p>
        </div>
        <div className="hidden lg:block lg:absolute lg:top-10 lg:right-7 lg:text-end">
          <p className="text-xl font-bold text-primary">{username}</p>
          {isGuestUser && (
            <div className="leading-3">
              <p className="text-xs font-medium">
                {`Signed in as guest. Limited access (view only)`}
              </p>
              <Link
                href="https://igniteweb.vercel.app"
                target="_blank"
                className="text-sm text-blue-500 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Visit website
              </Link>
            </div>
          )}
        </div>

        <main className="min-h-[91.45vh] my-20 lg:my-10 mx-2 lg:mx-7">
          {children}
        </main>
      </div>
    </div>
  );
}
