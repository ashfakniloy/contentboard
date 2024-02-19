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
        <div className="fixed lg:hidden w-full bg-white dark:bg-custom-gray4 shadow-md px-2 h-[70px] flex flex-col justify-center text-end leading-none border-b z-20">
          <div className="">
            <p className="text-xl font-bold text-primary">{username}</p>
            {isGuestUser && (
              <div className="">
                <Link
                  href="https://igniteweb.vercel.app"
                  target="_blank"
                  className=" text-sm text-blue-500 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Visit website
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:flex flex-col justify-center lg:absolute lg:h-[108px] lg:right-7 lg:text-end">
          <div className="leading-none">
            <p className="text-xl font-bold text-primary">{username}</p>
            {isGuestUser && (
              <div className="">
                <Link
                  href="https://igniteweb.vercel.app"
                  target="_blank"
                  className="text-sm text-blue-500 hover:text-blue-900 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Visit website
                </Link>
                <p className="text-xs font-medium">
                  {`Demo mode. Limited access (view only)`}
                </p>
              </div>
            )}
          </div>
        </div>

        <main className="min-h-[91.45vh] mt-24 mb-10 lg:my-10 mx-2 lg:mx-7">
          {children}
        </main>
      </div>
    </div>
  );
}
